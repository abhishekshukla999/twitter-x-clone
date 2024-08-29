import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authService, profileMediaService } from "../../appwrite";
import { logout } from "../../features/auth/authSlice";
import { LogoutModal } from "../index";

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
                className="my-2 mr-2 p-0.5 text-base rounded-full hover:bg-zinc-200 dark:hover:bg-slate-800 dim:hover:bg-slate-700 cursor-pointer"
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                <div className="flex justify-center items-center max-w-xl">
                    <div className="profile m-2 min-w-[40px] max-w-[43px]">
                        <img
                            className="w-full rounded-full"
                            src={imageUrl()}
                            alt="avatar"
                            loading="lazy"
                        />
                    </div>
                    <div className="flex-[0_0_60%] flex-nowrap hidden xl:block">
                        <p className="font-bold flex">
                            <span>{profileData?.name}</span>
                            {profileData?.premiumMember && (
                                <span>
                                    <svg
                                        viewBox="0 0 22 22"
                                        aria-label="Verified account"
                                        role="img"
                                        className="w-5 fill-blue-500 m-1 r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1"
                                        data-testid="icon-verified"
                                    >
                                        <g>
                                            <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                                        </g>
                                    </svg>
                                </span>
                            )}
                        </p>
                        <p className="text-gray-500">
                            @{profileData?.username}
                        </p>
                    </div>
                    <div className="m-3 hidden xl:block">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-[20px] fill-gray-500 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2"
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
                    className="w-full hover:bg-gray-200 dark:hover:bg-slate-800 dim:hover:bg-slate-700 border-2 dark:border-gray-500 dim:border-gray-500 p-2 cursor-pointer font-bold rounded-lg "
                    onClick={authLogout}
                >
                    Logout @{profileData?.username}
                </div>
            </LogoutModal>
        </>
    );
}

export default LogoutButton;
