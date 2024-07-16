import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function SideMenuMD() {
    const listStyle = "flex p-3 text-xl hover:bg-zinc-200 rounded-full w-fit";

    const profileData = useSelector((state) => state.profile.profileData);

    return (
        <div className="sidebar-sm hidden min-[500px]:max-[1279px]:block">
            <ul className="">
                <li className="p-1">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `${listStyle} ${isActive ? "bg-gray-200" : null}`
                        }
                        title="Home"
                    >
                        <span className="mx-1">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                            >
                                <g>
                                    <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path>
                                </g>
                            </svg>
                        </span>
                    </NavLink>
                </li>
                <li className="p-1">
                    <NavLink
                        to="/explore"
                        className={({ isActive }) =>
                            `${listStyle} ${isActive ? "bg-gray-200" : null}`
                        }
                        title="Explore"
                    >
                        <span className="mx-1">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                            >
                                <g>
                                    <path d="M10.25 4.25c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.155-.67 4.243-1.757 1.087-1.088 1.757-2.586 1.757-4.243 0-3.314-2.686-6-6-6zm-9 6c0-4.971 4.029-9 9-9s9 4.029 9 9c0 1.943-.617 3.744-1.664 5.215l4.475 4.474-2.122 2.122-4.474-4.475c-1.471 1.047-3.272 1.664-5.215 1.664-4.971 0-9-4.029-9-9z"></path>
                                </g>
                            </svg>
                        </span>
                    </NavLink>
                </li>
                <li className="p-1">
                    <NavLink
                        to="/notifications"
                        className={({ isActive }) =>
                            `${listStyle} ${isActive ? "bg-gray-200" : null}`
                        }
                        title="Notifications"
                    >
                        <span className="mx-1">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                            >
                                <g>
                                    <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
                                </g>
                            </svg>
                        </span>
                    </NavLink>
                </li>
                <li className="p-1">
                    <NavLink
                        to="/messages"
                        className={({ isActive }) =>
                            `${listStyle} ${isActive ? "bg-gray-200" : null}`
                        }
                        title="Messages"
                    >
                        <span className="mx-1">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                            >
                                <g>
                                    <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                                </g>
                            </svg>
                        </span>
                    </NavLink>
                </li>
                <li className="p-1">
                    <NavLink
                        to="/grok"
                        className={({ isActive }) =>
                            `${listStyle} ${isActive ? "bg-gray-200" : null}`
                        }
                        title="Grok"
                    >
                        <span className="mx-1">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                            >
                                <g>
                                    <g
                                        clipPath="url(#10-clip0_2592_269)"
                                        clipRule="evenodd"
                                    >
                                        <path d="M18 4.1H6c-1.05 0-1.9.85-1.9 1.9v12c0 1.05.85 1.9 1.9 1.9h12c1.05 0 1.9-.85 1.9-1.9V6c0-1.05-.85-1.9-1.9-1.9zM6 2h12c2.21 0 4 1.79 4 4v12c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V6c0-2.21 1.79-4 4-4z"></path>
                                        <path d="M6.68 17.8l8.108-11.58h2.532L9.21 17.8H6.68z"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="10-clip0_2592_269">
                                            <rect
                                                height="20"
                                                rx="1"
                                                width="20"
                                                x="2"
                                                y="2"
                                            ></rect>
                                        </clipPath>
                                    </defs>
                                </g>
                            </svg>
                        </span>
                    </NavLink>
                </li>
                <li className="p-1">
                    <NavLink
                        to="/bookmarks"
                        className={({ isActive }) =>
                            `${listStyle} ${isActive ? "bg-gray-200" : null}`
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
                    </NavLink>
                </li>
                <li className="p-1">
                    <NavLink
                        to="/communities"
                        className={({ isActive }) =>
                            `${listStyle} ${isActive ? "bg-gray-200" : null}`
                        }
                        title="Communities"
                    >
                        <span className="mx-1">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                            >
                                <g>
                                    <path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"></path>
                                </g>
                            </svg>
                        </span>
                    </NavLink>
                </li>
                <li className="p-1">
                    <NavLink
                        to="/premium"
                        className={({ isActive }) =>
                            `${listStyle} ${isActive ? "bg-gray-200" : null}`
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
                    </NavLink>
                </li>
                <li className="p-1">
                    <NavLink
                        to="/verified-orgs"
                        className={({ isActive }) =>
                            `${listStyle} ${isActive ? "bg-gray-200" : null}`
                        }
                        title="Verified Orgs"
                    >
                        <span className="mx-1">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                            >
                                <g>
                                    <path d="M7.323 2h11.443l-3 5h6.648L6.586 22.83 7.847 14H2.523l4.8-12zm1.354 2l-3.2 8h4.676l-.739 5.17L17.586 9h-5.352l3-5H8.677z"></path>
                                </g>
                            </svg>
                        </span>
                    </NavLink>
                </li>
                <li className="p-1">
                    <NavLink
                        to={`/${profileData?.username}` || "#"}
                        className={({ isActive }) =>
                            `${listStyle} ${isActive ? "bg-gray-200" : null}`
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
                    </NavLink>
                </li>
                <li className="p-1">
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `${listStyle} ${isActive ? "bg-gray-200" : null}`
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
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default SideMenuMD;
