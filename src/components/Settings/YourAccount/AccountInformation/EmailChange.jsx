import {
    Input,
    LoadingModal,
    SettingItemsContainer,
    BackButton,
} from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { authService, profileService } from "../../../../appwrite";
import { addProfileData } from "../../../../features/profile/profileSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Query } from "appwrite";
import { login } from "../../../../features/auth/authSlice";

function EmailChange() {
    const profileData = useSelector((state) => state.profile);
    const authData = useSelector((state) => state.auth.userData);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: { email: authData?.email || "" },
    });
    const [isSave, setIsSave] = useState(true);
    const [emailAvailable, setEmailAvailable] = useState(true);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const currrentEmail = watch("email");

    document.title = "Change email / X";

    useEffect(() => {
        if (currrentEmail.length === 0 || currrentEmail === authData?.email) {
            setIsSave(false);
        } else {
            setIsSave(true);
        }
    }, [currrentEmail, authData?.email]);

    useEffect(() => {
        let unsubscribe = false;

        async function fetchUsername() {
            if (!unsubscribe) {
                try {
                    const profileDocs = await profileService.getProfiles([
                        Query.equal("email", [currrentEmail || ""]),
                    ]);

                    if (profileDocs.documents.length !== 0) {
                        setEmailAvailable(false);
                    } else {
                        setEmailAvailable(true);
                    }
                } catch (error) {
                    console.log(
                        "Error fetching profile in email change :: ",
                        error
                    );
                }
            }
        }

        fetchUsername();

        return () => {
            unsubscribe = true;
        };
    }, [currrentEmail, profileData?.email]);

    const changeEmail = async (data) => {
        setLoading(true);

        if (authData) {
            try {
                const updatedAuthData = await authService.updateEmail(
                    data.email,
                    data.password
                );

                if (updatedAuthData) {
                    dispatch(login({ userData: updatedAuthData }));
                } else {
                    throw new Error("Email update failed");
                }

                const updatedProfileData = await profileService.updateProfile(
                    profileData?.$id,
                    {
                        email: data?.email || "",
                    }
                );

                if (updatedProfileData) {
                    dispatch(addProfileData(updatedProfileData));
                }

                toast.success("Email changed successfully !!");
            } catch (error) {
                // console.log("Error updating email :: ", error);
                toast.error(`Error changing email !! ${error}`);
            } finally {
                setLoading(false);
                setValue("password", "");
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
                            Change email
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(changeEmail)}>
                    <div className="py-4 px-3">
                        <Input
                            label="Current"
                            type="email"
                            placeholder="Type email"
                            {...register("email", {
                                required: "Please enter email address",
                                validate: {
                                    matchPatern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                            value
                                        ) ||
                                        "Email address must be a valid address (example@example.com)",
                                },
                            })}
                        />

                        {profileData?.email !== currrentEmail &&
                        currrentEmail?.length !== 0 ? (
                            emailAvailable ? (
                                <small className="text-green-500 block">
                                    {currrentEmail} is available
                                </small>
                            ) : (
                                <small className="text-red-500 block">
                                    {currrentEmail} is already registered
                                </small>
                            )
                        ) : null}

                        {errors.email?.message && (
                            <small className="text-red-500 block">
                                {errors.email?.message}
                            </small>
                        )}
                    </div>
                    <div className="border-b dark:border-gray-800 dim:border-gray-800 py-4 px-3">
                        <Input
                            type="password"
                            label="Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters long",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Password must contain at least 1 uppercase letter, 1 number, and 1 special character",
                                },
                            })}
                        />

                        {errors.password?.message && (
                            <small className="text-red-500 p-1">
                                {errors.password?.message}
                            </small>
                        )}
                    </div>
                    <div className="my-1 box-border">
                        <button
                            type="submit"
                            className={`py-3 px-4 text-center w-full ${
                                isSave
                                    ? "text-twitter-blue hover:text-sky-600 yellow:text-twitter-yellow yellow:hover:text-yellow-600 crimson:text-twitter-crimson crimson:hover:text-rose-600 purple:text-twitter-purple purple:hover:text-purple-600 orange:text-twitter-orange orange:hover:text-orange-600 green:text-twitter-green green:hover:text-green-600 hover:bg-blue-100 yellow:hover:bg-yellow-100 crimson:hover:bg-rose-100 purple:hover:bg-purple-100 orange:hover:bg-orange-100 green:hover:bg-gray-100"
                                    : "text-blue-200 yellow:text-yellow-200 crimson:text-rose-200 purple:text-purple-200 orange:text-orange-200 green:text-green-200"
                            }`}
                            disabled={!isSave}
                        >
                            Update email address
                        </button>
                    </div>
                </form>
            </SettingItemsContainer>

            <LoadingModal isOpen={loading} />
        </>
    );
}

export default EmailChange;
