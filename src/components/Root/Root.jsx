import { useState } from "react";
import { Login, LogSignModal, SignupForm } from "../index";
import { NavLink } from "react-router-dom";
import { Toaster } from "sonner";

function Entry() {
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenSignup, setIsOpenSignup] = useState(false);
    const [step, setStep] = useState(1);

    return (
        <>
            <div className="flex flex-col bg-black overflow-auto text-white min-h-screen">
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
                        <div>
                            <NavLink
                                to="https://github.com/abhishekshukla999/twitter-x-clone"
                                target="_blank"
                                className="flex border rounded-full p-2 bg-gray-100 text-black text-base bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                            >
                                <span className="my-auto">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="w-9 h-9 mx-3"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </span>
                                <span className="p-2 text-white font-bold">
                                    View Code on Github
                                </span>
                            </NavLink>
                        </div>
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
                                        <SignupForm
                                            step={step}
                                            setStep={setStep}
                                        />
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
            <Toaster position="bottom-center" closeButton={true} richColors />
        </>
    );
}

export default Entry;
