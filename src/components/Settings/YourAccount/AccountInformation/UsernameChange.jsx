import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { profileService } from "../../../../appwrite";
import { addProfileData } from "../../../../features/profile/profileSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Query } from "appwrite";

function UsernameChange() {
    const navigate = useNavigate();
    const profileData = useSelector((state) => state.profile);
    const authData = useSelector((state) => state.auth.userData);
    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid },
    } = useForm({
        defaultValues: { username: profileData?.username || "" },
    });
    const [isSave, setIsSave] = useState(true);
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const dispatch = useDispatch();

    const currentUsername = watch("username");

    useEffect(() => {
        if (
            currentUsername.length === 0 ||
            currentUsername === profileData?.username
        ) {
            setIsSave(false);
        } else {
            setIsSave(true);
        }
    }, [currentUsername, profileData?.username]);

    useEffect(() => {
        async function fetchUsername() {
            const profileDocs = await profileService.getProfiles([
                Query.equal("username", [currentUsername]),
            ]);

            console.log(profileDocs.documents);

            if (profileDocs.documents.length !== 0) {
                setUsernameAvailable(false);
            } else {
                setUsernameAvailable(true);
            }
        }

        fetchUsername();
    }, [currentUsername, profileData?.username]);

    const changeUsername = async (data) => {
        if (authData) {
            try {
                const updatedProfileData = await profileService.updateProfile(
                    profileData?.$id,
                    {
                        username: data?.username || "",
                    }
                );

                if (updatedProfileData) {
                    dispatch(addProfileData(updatedProfileData));
                }

                toast.success("Username changed successfully !!");
            } catch (error) {
                // console.log("Error updating username :: ", error);
                toast.success("Error changing username !!");
            }
        }
    };

    return (
        <div className="xl:flex-[0_0_43%] border-r h-full sticky top-0 overflow-y-auto">
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <NavLink
                        className="m-0.5 my-auto p-2 hover:bg-gray-200 rounded-full"
                        onClick={() => navigate(-1)}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                            </g>
                        </svg>
                    </NavLink>
                    <div className="font-bold text-xl py-3">
                        Change username
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(changeUsername)}>
                <div className="border-b py-4 px-3">
                    <Input
                        label="Username"
                        type="text"
                        placeholder="Type username"
                        {...register("username", {
                            required: true,
                        })}
                    />
                    {profileData?.username !== currentUsername &&
                    currentUsername.length !== 0 ? (
                        usernameAvailable ? (
                            <p className="text-green-500">
                                @{currentUsername} is available
                            </p>
                        ) : (
                            <p className="text-red-500">
                                @{currentUsername} is already taken
                            </p>
                        )
                    ) : (
                        !isValid && (
                            <p className="text-red-500">
                                Please write username
                            </p>
                        )
                    )}
                </div>
                <div className="flex justify-end px-2 py-3">
                    <button
                        type="submit"
                        className={`py-1.5 px-4 text-white font-bold ${
                            isSave
                                ? "bg-twitter-blue hover:bg-blue-500"
                                : "bg-blue-300"
                        } rounded-full`}
                        disabled={!isSave}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UsernameChange;
