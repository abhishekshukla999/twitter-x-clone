import React from "react";
import { authService } from "../../appwrite";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { removeProfileData } from "../../features/profile/profileSlice";

function LogoutButton() {
    const dispatch = useDispatch();

    const authLogout = () => {
        authService.logout().then(() => {
            dispatch(logout());
            dispatch(removeProfileData());
        });
    };

    return (
        <div
            className="m-2 p-0.5 text-base rounded-full hover:bg-zinc-200"
            onClick={authLogout}
        >
            <div className="flex justify-center items-center max-w-xl">
                <div className="profile m-2">
                    <img
                        className="w-[40px] rounded-full"
                        src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
                        alt="avatar"
                    />
                </div>
                <div className="flex-[0_0_60%] flex-nowrap hidden xl:block">
                    <p className="font-bold">Abhishek Shuklaaa</p>
                    <p className="text-gray-500">@username</p>
                </div>
                <div className="m-3 hidden xl:block">
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-[20px] fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2"
                    >
                        <g>
                            <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default LogoutButton;
