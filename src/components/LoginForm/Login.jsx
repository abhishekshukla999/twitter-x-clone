import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authService, profileService } from "../../appwrite";
import { login as authLogin } from "../../features/auth/authSlice";
import { NavLink } from "react-router-dom";
import { addProfileData } from "../../features/profile/profileSlice";

function Login() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const login = async (data) => {
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
                        dispatch(addProfileData({ profileData }));
                    }
                }
            }
        } catch (error) {
            console.log("Error in login", error);
        }
    };

    return (
        <div>
            <div className="text-[26px] font-bold my-3 mx-7 text-white">
                Sign in to X
            </div>

            <div>
                <form
                    className="flex flex-col justify-center items-center"
                    onSubmit={handleSubmit(login)}
                >
                    <div className="mx-7 my-2 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                        <NavLink className="flex justify-center bg-white text-black font-[400] my-2 p-2 rounded-full w-full">
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                className="w-5 mx-2 LgbsSe-Bz112c"
                            >
                                <g>
                                    <path
                                        fill="#EA4335"
                                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                    ></path>
                                    <path
                                        fill="#4285F4"
                                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                    ></path>
                                    <path
                                        fill="#FBBC05"
                                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                    ></path>
                                    <path
                                        fill="#34A853"
                                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                    ></path>
                                    <path fill="none" d="M0 0h48v48H0z"></path>
                                </g>
                            </svg>
                            <span>Sign up with Google</span>
                        </NavLink>
                    </div>
                    <div className="mx-7 my-2 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                        <NavLink className="flex justify-center bg-white text-black font-[500] my-2 p-2 rounded-full">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-5 mx-2 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1gs4q39 r-z80fyv r-19wmn03"
                            >
                                <g>
                                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
                                </g>
                            </svg>
                            <span>Sign up with Apple</span>
                        </NavLink>
                    </div>
                    <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                        <input
                            className="bg-black border border-gray-500 p-4 rounded-lg text-white w-full"
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                        />
                    </div>
                    <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                        <input
                            className="bg-black border border-gray-500 p-4 rounded-lg text-white w-full"
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                        />
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
    );
}

export default Login;
