import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authService, profileService } from "../../appwrite";
import { login as authLogin } from "../../features/auth/authSlice";
import { addProfileData } from "../../features/profile/profileSlice";
import { Input, LoadingModal } from "../";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setLoading(true);
        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin({ userData }));

                    const profileData = await profileService.getProfile(
                        userData.$id
                    );

                    if (profileData) {
                        dispatch(addProfileData(profileData));
                    }
                }
            }
        } catch (error) {
            console.log("Error in login", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <div className="text-[26px] font-bold my-3 mx-7 text-white">
                    Sign in to X
                </div>

                <div>
                    <form
                        className="flex flex-col justify-center items-center"
                        onSubmit={handleSubmit(login)}
                    >
                        <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                            <Input
                                className="bg-black text-white"
                                type="email"
                                label="Email"
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

                            {errors.email?.message && (
                                <small className="text-red-500 p-1">
                                    {errors.email?.message}
                                </small>
                            )}
                        </div>
                        <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                            <Input
                                className="bg-black text-white"
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

                        <div className="mx-7 my-4  text-black font-bold  sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full w-full">
                            <button
                                className="bg-gray-100 mb-3 rounded-full p-4 w-full"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <LoadingModal isOpen={loading} />
        </div>
    );
}

export default Login;
