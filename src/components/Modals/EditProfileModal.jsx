import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authService, profileMediaService, profileService } from "../../appwrite";
import { addProfileData } from "../../features/profile/profileSlice";
import { addOtherProfile } from "../../features/profile/otherProfileSlice";

function EditProfileModal({ isOpen, onClose }) {
    const profileData = useSelector((state) => state.profile);
    const otherProfile = useSelector((state) => state.otherProfile);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: profileData?.name || "",
            bio: profileData?.bio || "",
            location: profileData?.location || "",
            website: profileData?.website || "",
        },
    });
    const [isEditDob, setIsEditDob] = useState(false);
    // preview and upload states for profile
    const [prevProfileImage, setPrevProfileImage] = useState(
        profileMediaService.getFilePreview(profileData?.avatar) ||
            "/defaultAvatar.png"
    );
    const [uploadProfileImage, setUploadProfileImage] = useState(null);
    // preview and upload states foCover
    const [prevCoverImage, setPrevCoverImage] = useState(
        profileMediaService.getFilePreview(profileData?.profileCover) || ""
    );
    const [uploadCoverImage, setUploadCoverImage] = useState(null);

    const [dob, setDob] = useState(profileData?.dob);

    useEffect(() => {
        reset({
            name: profileData?.name || "",
            bio: profileData?.bio || "",
            location: profileData?.location || "",
            website: profileData?.website || "",
        });
    }, [
        reset,
        profileData.name,
        profileData.bio,
        profileData.location,
        profileData.website,
    ]);

    const toLocalDate = (date) => {
        const toLocal = new Date(date);
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const convertedDate = {
            date: toLocal.getDate(),
            month: months[toLocal.getMonth()],
            year: toLocal.getFullYear(),
        };
        return `${convertedDate.month} ${convertedDate.date}, ${convertedDate.year}`;
    };

    const saveProfile = async (data) => {
        try {
            if (uploadCoverImage) {
                const file = await profileMediaService.uploadFile(
                    uploadCoverImage
                );

                if (profileData?.profileCover) {
                    await profileMediaService.deleteFile(
                        profileData.profileCover
                    );
                }

                if (file) {
                    data.profileCover = file.$id || "";
                }
            }

            if (uploadProfileImage) {
                const file = await profileMediaService.uploadFile(
                    uploadProfileImage
                );

                if (profileData?.avatar) {
                    await profileMediaService.deleteFile(profileData.avatar);
                }

                if (file) {
                    data.avatar = file.$id || "";
                }
            }

            // const updateAuthData = await authService.

            const updatedProfileData = await profileService.updateProfile(
                profileData?.$id,
                {
                    ...data,
                }
            );

            if (updatedProfileData) {
                dispatch(addProfileData({ ...updatedProfileData }));

                if (otherProfile?.$id === profileData?.$id) {
                    dispatch(addOtherProfile({ ...updatedProfileData }));
                }
            }
        } catch (error) {
            console.log("Error updating user profile :: ", error);
        } finally {
            reset();
            onClose();
        }
    };

    const openAndReadProfile = (e) => {
        setPrevProfileImage(URL.createObjectURL(e.target.files[0]));
        setUploadProfileImage(e.target.files[0]);
        e.target.value = null;
    };

    const openAndReadCover = (e) => {
        setPrevCoverImage(URL.createObjectURL(e.target.files[0]));
        setUploadCoverImage(e.target.files[0]);
        e.target.value = null;
    };

    const removeCoverImage = () => {
        setPrevCoverImage(null);
        setUploadCoverImage(null);
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className="close-outer fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={onClose}
        >
            <form
                className="bg-white overflow-y-auto opacity-100 px-1 rounded-xl shadow-lg absolute xl:w-[30%] lg:w-[40%] md:w-[60%] h-[60vh] max-[765px]:h-screen max-[765px]:w-screen text-black"
                onSubmit={handleSubmit(saveProfile)}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex gap-5 py-1 sticky top-0 bg-white opacity-80">
                    <button
                        className="rounded-lg bg-none border-none text-2xl cursor-pointer my-auto px-3"
                        onClick={onClose}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 fill-black r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                            </g>
                        </svg>
                    </button>

                    <span className="text-xl font-bold my-auto grow">
                        Edit Profile
                    </span>
                    <button
                        className="justify-self-end p-2 px-4 my-auto font-bold text-base border text-white bg-black border-zinc-300 rounded-full"
                        type="submit"
                    >
                        Save
                    </button>
                </div>

                {/* avatar and cover */}
                <div>
                    <div className="">
                        <div
                            className="cover-image"
                            style={{
                                backgroundImage: `url(${prevCoverImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                height: "195px",
                            }}
                        >
                            <div className="flex justify-center gap-2 items-center h-full bg-[#494646] opacity-50">
                                <div className="p-2 rounded-full bg-gray-950">
                                    <label htmlFor="cover">
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-6 fill-white cursor-pointer r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18yzcnr r-yc9v9c"
                                        >
                                            <g>
                                                <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
                                            </g>
                                        </svg>
                                    </label>
                                    <input
                                        id="cover"
                                        type="file"
                                        accept=".jpg, .png"
                                        className="hidden"
                                        onChange={openAndReadCover}
                                    />
                                </div>
                                <div
                                    className="p-2 rounded-full bg-gray-950"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeCoverImage();
                                    }}
                                >
                                    <span>
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-6 fill-white cursor-pointer r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18yzcnr r-yc9v9c"
                                        >
                                            <g>
                                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="m-2 rounded-full h-[112px] w-[112px]"
                            style={{
                                backgroundImage: `url(${prevProfileImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="h-full w-full rounded-full flex justify-center items-center">
                                <label
                                    htmlFor="avatar"
                                    className="p-2 bg-gray-950 opacity-50 rounded-full"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-6 fill-white cursor-pointer r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18yzcnr r-yc9v9c"
                                    >
                                        <g>
                                            <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
                                        </g>
                                    </svg>
                                </label>
                                <input
                                    id="avatar"
                                    type="file"
                                    accept=".jpg, .png"
                                    className="hidden"
                                    onChange={openAndReadProfile}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* user info */}
                <div className="">
                    <div className="flex flex-col border p-2 my-5 mx-3 rounded-lg">
                        <label
                            htmlFor="name"
                            className="text-[13px] text-gray-500"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="focus:outline-none"
                            {...register("name", { required: true })}
                        />
                    </div>
                    <div className="flex flex-col border p-2 my-5 mx-3 rounded-lg">
                        <label
                            htmlFor="bio"
                            className="text-[13px] text-gray-500"
                        >
                            Bio
                        </label>
                        <textarea
                            name=""
                            id="bio"
                            rows="3"
                            className="focus:outline-none"
                            {...register("bio")}
                        ></textarea>
                    </div>
                    <div className="flex flex-col border p-2 my-5 mx-3 rounded-lg">
                        <label
                            htmlFor="location"
                            className="text-[13px] text-gray-500"
                        >
                            Location
                        </label>
                        <input
                            id="location"
                            type="text"
                            className="focus:outline-none"
                            {...register("location")}
                        />
                    </div>
                    <div className="flex flex-col border p-2 my-5 mx-3">
                        <label
                            htmlFor="website"
                            className="text-[13px] text-gray-500"
                        >
                            Website
                        </label>
                        <input
                            id="website"
                            type="text"
                            className="focus:outline-none"
                            {...register("website")}
                        />
                    </div>
                    <div className="flex flex-col p-2 my-5 mx-3">
                        <div className="text-gray-500 flex gap-1">
                            <div>Birth date</div>
                            <div
                                className="text-twitter-blue cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditDob((prev) => !prev);
                                }}
                            >
                                {isEditDob ? "Save" : "Edit"}
                            </div>
                        </div>
                        <div className="text-xl">{toLocalDate(dob)}</div>
                        {isEditDob && (
                            <div>
                                <input
                                    type="date"
                                    placeholder="DOB"
                                    className="focus:outline-none"
                                    {...register("dob", { required: true })}
                                    onChange={(e) => setDob(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>,
        document.getElementById("modal")
    );
}

export default EditProfileModal;
