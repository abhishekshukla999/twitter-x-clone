import { Input } from "../";
import { useEffect, useState } from "react";
import { profileService } from "../../appwrite";
import { Query } from "appwrite";

function Step2({ register, onBack, formState, watch }) {
    const { errors, isValid } = formState;
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const currentUsername = watch("username");

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
    }, [currentUsername]);

    useEffect(() => {
        if (!usernameAvailable) {
            setSubmitDisabled(true);
        } else {
            setSubmitDisabled(false);
        }
    }, [isValid, usernameAvailable]);

    return (
        <div>
            <div className="text-[26px] font-bold my-3 mx-7 text-white">
                Enter Your Password and Username
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <Input
                        className="bg-black text-white"
                        type="password"
                        label={
                            <>
                                Password <span className="text-red-500">*</span>
                            </>
                        }
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
                <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <Input
                        className="bg-black text-white"
                        label={
                            <>
                                Username <span className="text-red-500">*</span>
                            </>
                        }
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Username must be at least 3 characters long",
                            },
                            maxLength: {
                                value: 15,
                                message: "Username cannot exceed 15 characters",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9_]+$/,
                                message:
                                    "Username can only contain letters, numbers, and underscores",
                            },
                        })}
                    />

                    {errors.username ? (
                        <small className="text-red-500 p-1 block">
                            {errors.username.message}
                        </small>
                    ) : currentUsername && currentUsername?.length !== 0 ? (
                        usernameAvailable ? (
                            <small className="text-green-500 block">
                                @{currentUsername} is available
                            </small>
                        ) : (
                            <small className="text-red-500 block">
                                @{currentUsername} is already registered
                            </small>
                        )
                    ) : null}
                </div>

                <div className="mx-7 my-4  text-black font-bold  sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full w-full">
                    <button
                        className={`bg-gray-100 ${
                            submitDisabled
                                ? "text-gray-500 bg-gray-400 cursor-not-allowed"
                                : null
                        } mb-3 rounded-full p-4 w-full`}
                        type="submit"
                        disabled={submitDisabled}
                    >
                        Submit
                    </button>
                    <button
                        className="bg-gray-100 rounded-full p-4 w-full"
                        onClick={onBack}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Step2;
