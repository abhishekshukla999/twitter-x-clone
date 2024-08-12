import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authService, profileMediaService } from "../../appwrite";
import { logout } from "../../features/auth/authSlice";
import LogoutModal from "../Modals/LogoutModal";

function LogoutButton() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.profile);

    const authLogout = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const imageUrl = () => {
        if (profileData?.avatar) {
            return profileMediaService.getFilePreview(profileData.avatar);
        } else {
            return "/defaultAvatar.png";
        }
    };

    return (
        <>
            <div
                className="m-2 p-0.5 text-base rounded-full hover:bg-zinc-200 cursor-pointer"
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                <div className="flex justify-center items-center max-w-xl">
                    <div className="profile m-2">
                        <img
                            className="w-[40px] rounded-full"
                            src={imageUrl()}
                            alt="avatar"
                        />
                    </div>
                    <div className="flex-[0_0_60%] flex-nowrap hidden xl:block">
                        <p className="font-bold">{profileData?.name}</p>
                        <p className="text-gray-500">
                            @{profileData?.username}
                        </p>
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
            <LogoutModal isOpen={isOpen} onClose={handleClose}>
                <div
                    className="w-full hover:bg-gray-200 p-2 cursor-pointer font-bold rounded-lg border-2"
                    onClick={authLogout}
                >
                    Logout @{profileData?.username}
                </div>
            </LogoutModal>
        </>
    );
}

export default LogoutButton;
