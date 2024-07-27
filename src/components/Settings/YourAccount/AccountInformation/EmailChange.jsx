import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "../../../index";

function EmailChange() {
    const navigate = useNavigate();
    const emailRef = useRef();

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
                    <div className="font-bold text-xl py-3">Change email</div>
                </div>
            </div>
            <form>
                <div className="border-b py-4 px-3">
                    <Input label="Current" type="text" ref={emailRef} />
                </div>
                <div className="my-1 box-border">
                    <button
                        type="submit"
                        className="py-3 px-4 text-center w-full text-twitter-blue hover:bg-blue-100"
                    >
                        Update email address
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EmailChange;
