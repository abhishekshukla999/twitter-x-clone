import { useState } from "react";
import { Login, SignUp1, SignUp2, LogSignModal } from "./index";
import { useForm } from "react-hook-form";
import { authService, profileService } from "../appwrite";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { addProfileData } from "../features/profile/profileSlice";
import { NavLink } from "react-router-dom";

function Entry() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenSignup, setIsOpenSignup] = useState(false);
    const [step, setStep] = useState(1);

    const handleBack = () => setStep(step - 1);

    const handleNext = () => setStep(step + 1);

    const submitForm = async (data) => {
        try {
            const { name, email, password, username, dob } = data;

            const userData = await authService.createAccount({
                name,
                email,
                password,
            });

            const [loginData, userId] = userData;

            if (loginData) {
                // has to dispatch in store user Profile data after profile document creation
                const profileData = await profileService.createProfile({
                    userId,
                    username,
                    email,
                    name,
                    dob,
                });

                dispatch(login({userData: loginData}));

                if (profileData) {
                    dispatch(addProfileData({ profileData }));
                }
            }
        } catch (error) {
            console.log("Error in singup from root: ", error);
        }
    };

    return (
        <div className="flex flex-col bg-black text-white min-h-screen">
            <div className="flex w-full min-h-svh max-lg:flex-col">
                <div className="logo flex flex-col items-center justify-center xl:flex-[0_0_45%] lg:flex-[0_0_30%] lg:ml-auto">
                    <div className="logo p-8">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="xl:w-96 lg:w-80 md:w-60 sm:w-40 w-20 invert r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr"
                        >
                            <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </g>
                        </svg>
                    </div>
                    <NavLink
                        to="https://github.com/ShuklaAbhishek99/twitter-x-clone"
                        target="_blank"
                        className="flex border rounded-full p-2 bg-gray-100 text-black text-base bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-9 h-9 mx-3"
                        >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="p-2 text-white font-bold">
                            View Code on Github
                        </span>
                    </NavLink>
                </div>
                <div className="lg:flex-[0_0_45%] p-4 lg:my-auto lg:mr-auto max-lg:mx-auto">
                    <div className="p-5">
                        <div>
                            <p className="text-[64px] font-bold my-12">
                                Happening now
                            </p>
                        </div>
                        <div className="w-fit">
                            <p className="text-[31px] font-bold mb-8">
                                Join today.
                            </p>

                            <NavLink className="flex justify-center bg-white text-black font-[400] my-2 p-2 rounded-full">
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
                                        <path
                                            fill="none"
                                            d="M0 0h48v48H0z"
                                        ></path>
                                    </g>
                                </svg>
                                <span>Sign up with Google</span>
                            </NavLink>
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

                            <div className="flex">
                                <hr className="w-full m-3 border-zinc-500" />
                                <span className="text-[15px]">or</span>
                                <hr className="w-full m-3 border-zinc-500" />
                            </div>

                            <div>
                                <button
                                    className="w-full bg-twitter-blue text-white font-[500] p-2 my-1 rounded-full"
                                    onClick={() => setIsOpenSignup(true)}
                                >
                                    Create Account
                                </button>
                                <LogSignModal
                                    isOpen={isOpenSignup}
                                    onClose={() => {
                                        setIsOpenSignup(false);
                                        setStep(1);
                                    }}
                                >
                                    <form onSubmit={handleSubmit(submitForm)}>
                                        {step === 1 && (
                                            <SignUp1
                                                register={register}
                                                onNext={handleNext}
                                            />
                                        )}

                                        {step === 2 && (
                                            <SignUp2
                                                register={register}
                                                onBack={handleBack}
                                            />
                                        )}
                                    </form>
                                </LogSignModal>
                            </div>
                            <p className="text-gray-400 text-[11px] mb-5 p-2">
                                By signing up, you agree to the
                                <span className="text-twitter-blue">
                                    Terms of Service
                                </span>{" "}
                                and{" "}
                                <span className="text-twitter-blue">
                                    Privacy Policy
                                </span>
                                . Including{" "}
                                <span className="text-twitter-blue">
                                    Cookie Use
                                </span>
                                .
                            </p>
                            <div className="border-blue-400 mt-10 p-2">
                                <div className="mb-4">
                                    <p className="text-[17px] font-bold">
                                        Already have Account?
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="w-full bg-black border border-gray-500 text-twitter-blue font-[500] p-2 rounded-full"
                                    onClick={() => setIsOpenLogin(true)}
                                >
                                    Sign in
                                </button>
                                <LogSignModal
                                    isOpen={isOpenLogin}
                                    onClose={() => setIsOpenLogin(false)}
                                >
                                    <Login />
                                </LogSignModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="mt-auto p-3">
                <ul className="flex flex-wrap text-gray-500 justify-center gap-5 text-[13px]">
                    <li className="hover:underline">About</li>
                    <li className="hover:underline">Download the X app</li>
                    <li className="hover:underline">Help Center</li>
                    <li className="hover:underline">Terms of Service</li>
                    <li className="hover:underline">Privacy Policy</li>
                    <li className="hover:underline">Cookie Policy</li>
                    <li className="hover:underline">Accessibility</li>
                    <li className="hover:underline">Ads Info</li>
                    <li className="hover:underline">Blog</li>
                    <li className="hover:underline">Careers</li>
                    <li className="hover:underline">Brand Resources</li>
                    <li className="hover:underline">Advertising</li>
                    <li className="hover:underline">Marketing</li>
                    <li className="hover:underline">X for Business</li>
                    <li className="hover:underline">Developers</li>
                    <li className="hover:underline">Directory</li>
                    <li className="hover:underline">Settings</li>
                    <li className="hover:underline">&copy; 2024 X Corp.</li>
                </ul>
            </footer>
        </div>
    );
}

export default Entry;
