import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { authService } from "../../appwrite";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { removeProfileData } from "../../features/profile/profileSlice";
import { removeTweets } from "../../features/tweet/tweetSlice";
import { removeOtherProfile } from "../../features/profile/otherProfileSlice";
import { removeBookmarks } from "../../features/bookmark/bookmarkSlice";
import { removeLikes } from "../../features/like/likeSlice";

function NavigationMobile({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.profile.profileData);
    const listStyle = "flex text-xl hover:bg-zinc-200 rounded-full w-fit";

    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout());
            dispatch(removeProfileData());
            dispatch(removeTweets());
            dispatch(removeOtherProfile());
            dispatch(removeBookmarks());
            dispatch(removeLikes());
        });
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="close-outer fixed top-0 left-0 right-0 bottom-0 bg-zinc-900 bg-opacity-50 flex">
            <div className="bg-white opacity-100 p-2 shadow-lg relative w-[57%] text-black">
                <div className="m-2">
                    <button
                        className="rounded-lg absolute top-2.5 right-2.5 bg-none border-none text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-7 fill-black r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
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
                    <div className="mx-3">
                        <div className="">
                            <img
                                className="w-8 rounded-full"
                                src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
                                alt="navigation menu"
                            />
                        </div>
                        <div className="font-bold mt-0.5 text-[17px]">
                            Abhishek Shukla
                        </div>
                        <div className="font-light text-[15px]">@username</div>
                    </div>

                    {/* followers */}
                    <div className="flex gap-4 text-sm mx-3 my-3 text-gray-700">
                        <span className="">
                            <strong>48</strong> Following
                        </span>
                        <span className="">
                            <strong>90M</strong> Followers
                        </span>
                    </div>

                    {/* nav items */}
                    <div className="">
                        <div className="p-1 my-6">
                            <NavLink
                                to={`/${profileData?.username}` || "#"}
                                className={({ isActive }) =>
                                    `${listStyle} ${
                                        isActive ? "font-bold" : null
                                    }`
                                }
                                title="Profile"
                            >
                                <span className="mx-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
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
                                className={({ isActive }) =>
                                    `${listStyle} ${
                                        isActive ? "font-bold" : null
                                    }`
                                }
                                title="Premium"
                            >
                                <span className="mx-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
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
                                className={({ isActive }) =>
                                    `${listStyle} ${
                                        isActive ? "font-bold" : null
                                    }`
                                }
                                title="Bookmarks"
                            >
                                <span className="mx-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
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
                                className={({ isActive }) =>
                                    `${listStyle} ${
                                        isActive ? "font-bold" : null
                                    }`
                                }
                                title="Settings"
                            >
                                <span className="mx-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-1q142lx r-1kihuf0 r-1472mwg r-di8nfa r-lrsllp"
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
                                        className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-1q142lx r-1kihuf0 r-1472mwg r-di8nfa r-lrsllp"
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
