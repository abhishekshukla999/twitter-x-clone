import { Input, LoadingModal } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { profileService } from "../../../../appwrite";
import { addProfileData } from "../../../../features/profile/profileSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Query } from "appwrite";
import { SettingItemsContainer, BackButton } from "../../../";

function UsernameChange() {
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
    const [loading, setLoading] = useState(false);
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
        setLoading(true);

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
                toast.error("Error changing username !!");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <SettingItemsContainer>
                <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                    <div className="flex gap-5">
                        <BackButton />
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
                                <small className="text-green-500">
                                    @{currentUsername} is available
                                </small>
                            ) : (
                                <small className="text-red-500">
                                    @{currentUsername} is already taken
                                </small>
                            )
                        ) : (
                            !isValid && (
                                <small className="text-red-500">
                                    Please write username
                                </small>
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
            </SettingItemsContainer>

            <LoadingModal isOpen={loading} />
        </>
    );
}

export default UsernameChange;
