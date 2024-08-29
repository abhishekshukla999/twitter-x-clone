import { createPortal } from "react-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { authService, profileMediaService } from "../../appwrite";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";

function NavigationMobile({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.profile);
    const [avatarURL, setAvatarURL] = useState("");
    const navigate = useNavigate();
    const listStyle = "flex text-xl font-bold rounded-full w-fit";

    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    useEffect(() => {
        let unsubscribe = false;

        function fetchAvatarUrl() {
            if (profileData.avatar && !unsubscribe) {
                setAvatarURL(
                    profileMediaService.getCustomFilePreview(
                        profileData.avatar,
                        50,
                        50
                    )
                );
            } else {
                setAvatarURL("/defaultAvatar.png");
            }
        }

        fetchAvatarUrl();

        return () => {
            unsubscribe = true;
        };
    }, [profileData.avatar]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="close-outer fixed top-0 left-0 right-0 bottom-0 z-[1000] bg-zinc-900 bg-opacity-50 flex"
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
        >
            <div className="bg-white opacity-100 p-2 z-50 shadow-lg relative min-w-[57%] text-black dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg dark:text-white dim:text-white">
                <div className="m-2">
                    <button
                        className="rounded-lg absolute top-2.5 right-2.5 bg-none border-none text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-7 dark:fill-white dim:fill-white fill-black r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <br />

                <div>
                    {/* profile */}
                    <div
                        className="mx-3"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/${profileData.username}`);
                        }}
                    >
                        <div className="min-w-[40px] max-w-[43px]">
                            <img
                                className="w-full rounded-full"
                                src={avatarURL}
                                alt="navigation menu"
                                loading="lazy"
                            />
                        </div>
                        <div className="font-bold mt-0.5 text-[17px] flex">
                            <span>{profileData.name}</span>
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
                        </div>
                        <div className="font-light text-gray-500 text-[15px]">
                            @{profileData.username}
                        </div>
                    </div>

                    {/* followers */}
                    <div className="flex gap-4 text-sm mx-3 my-3 text-gray-700 dark:text-gray-400 dim:text-gray-400">
                        <span
                            className="hover:underline"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/${profileData.username}/following`);
                            }}
                        >
                            <strong className="dark:text-white dim:text-white">
                                {profileData.following}
                            </strong>{" "}
                            Following
                        </span>
                        <span
                            className="hover:underline"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/${profileData.username}/followers`);
                            }}
                        >
                            <strong className="dark:text-white dim:text-white">
                                {profileData.followers}
                            </strong>{" "}
                            Followers
                        </span>
                    </div>

                    {/* nav items */}
                    <div className="">
                        <div className="p-1 my-6">
                            <NavLink
                                to={`/${profileData?.username}` || "#"}
                                className={`${listStyle}`}
                                title="Profile"
                            >
                                <span className="mx-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-7 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                                    >
                                        <g>
                                            <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="px-4">Profile</span>
                            </NavLink>
                        </div>
                        <div className="p-1 my-6">
                            <NavLink
                                to="/premium"
                                className={`${listStyle}`}
                                title="Premium"
                            >
                                <span className="mx-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-7 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                                    >
                                        <g>
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="px-4">Premium</span>
                            </NavLink>
                        </div>
                        <div className="p-1 my-6">
                            <NavLink
                                to="/bookmarks"
                                className={`${listStyle}`}
                                title="Bookmarks"
                            >
                                <span className="mx-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-7 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                                    >
                                        <g>
                                            <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="px-4">Bookmarks</span>
                            </NavLink>
                        </div>
                        <div className="p-1 my-6">
                            <NavLink
                                to="/settings"
                                className={`${listStyle}`}
                                title="Settings"
                            >
                                <span className="mx-1 my-auto">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-7 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-1q142lx r-1kihuf0 r-1472mwg r-di8nfa r-lrsllp"
                                        data-testid="icon"
                                    >
                                        <g>
                                            <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="px-4">
                                    Settings and privacy
                                </span>
                            </NavLink>
                        </div>
                        <div className="p-1 my-6">
                            <NavLink
                                className={`${listStyle}`}
                                title="Logout"
                                onClick={handleLogout}
                            >
                                <span className="mx-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-7 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-1q142lx r-1kihuf0 r-1472mwg r-di8nfa r-lrsllp"
                                        data-testid="icon"
                                    >
                                        <g>
                                            <path d="M4 4.5C4 3.12 5.12 2 6.5 2h11C18.88 2 20 3.12 20 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-11C5.12 22 4 20.88 4 19.5V16h2v3.5c0 .28.22.5.5.5h11c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-11c-.28 0-.5.22-.5.5V8H4V4.5zm6.95 3.04L15.42 12l-4.47 4.46-1.41-1.42L11.58 13H2v-2h9.58L9.54 8.96l1.41-1.42z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="px-4">Logout</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default NavigationMobile;
