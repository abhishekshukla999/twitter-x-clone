import { useState } from "react";
import { UserInfo, NoUser } from "../index";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile({ username }) {
    const [status, setStatus] = useState("user");
    const otherProfileData = useSelector((state) => state.otherProfile);
    const navigate = useNavigate();

    if (status === "nouser") return <NoUser username={username} />;

    return (
        <div>
            <div className="top flex px-2 sticky z-30 top-0 backdrop-blur-[400px] opacity-[100%]">
                <NavLink
                    className="left my-auto p-3 hover:bg-gray-200 dark:hover:bg-slate-800 dim:hover:bg-slate-700 rounded-full"
                    onClick={() => navigate(-2)}
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-5 dark:fill-white dim:fill-white m-auto r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                    >
                        <g>
                            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                        </g>
                    </svg>
                </NavLink>

                <div className="right ml-4">
                    <p className="font-bold text-xl">
                        {otherProfileData?.name || ""}
                    </p>
                    <p className="text-[13px] my-0.5 font-light text-gray-500 dark:text-gray-400 dim:text-gray-400">
                        {otherProfileData?.tweets || "0"} posts
                    </p>
                </div>
            </div>
            <UserInfo username={username} setStatus={setStatus} />

            <Outlet />
        </div>
    );
}

export default Profile;
