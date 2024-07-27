import { NavLink, useNavigate } from "react-router-dom";

function MutedNotifications() {
    const navigate = useNavigate();

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
                        Muted notifications
                    </div>
                </div>
            </div>

            <div>
                <div className="p-3 text-xl font-bold">
                    Mute notifications from people:
                </div>

                <div className="leading-5 py-4 px-2 w-full text-[15px] flex justify-between">
                    <p>You don&apos;t follow</p>
                    <input type="checkbox" className="w-6 cursor-pointer" />
                </div>
                <div className="leading-5 py-4 px-2 w-full text-[15px] flex justify-between">
                    <p>Who don&apos;lt follow you</p>
                    <input type="checkbox" className="w-6 cursor-pointer" />
                </div>
                <div className="leading-5 py-4 px-2 w-full text-[15px] flex justify-between">
                    <p>With a new account</p>
                    <input type="checkbox" className="w-6 cursor-pointer" />
                </div>
                <div className="leading-5 py-4 px-2 w-full text-[15px] flex justify-between">
                    <p>Who have a default profile photo</p>
                    <input type="checkbox" className="w-6 cursor-pointer" />
                </div>
                <div className="leading-5 py-4 px-2 w-full text-[15px] flex justify-between">
                    <p>Who haven&apos;t confirmed their email</p>
                    <input type="checkbox" className="w-6 cursor-pointer" />
                </div>
                <div className="leading-5 py-4 px-2 w-full text-[15px] flex justify-between">
                    <p>Who haven&apos;t confirmed their phone number</p>
                    <input type="checkbox" className="w-6 cursor-pointer" />
                </div>
                <div className="py-3 px-2 w-full text-[13px] text-gray-500">
                    These filters won&apos;t affect notifications from people
                    you follow.
                    <span className="text-twitter-blue hover:underline">
                        {""} Learn more
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MutedNotifications;
