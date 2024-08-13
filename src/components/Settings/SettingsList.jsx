import { useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

function SettingsList() {
    const profileData = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col xl:flex-[0_0_35%] lg:flex-[0_0_37%] max-[1004px]:flex-[0_0_80%] max-[704px]:flex-[0_0_100%] border-b-0 border-t-0 border-l border-r h-screen">
            <div className="top flex justify-between p-3 sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="hidden max-[499px]:flex">
                    <NavLink
                        className="m-0.5 my-auto p-2 hover:bg-gray-200 rounded-full hidden max-[499px]:block"
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
                    <div className="px-1.5 font-bold text-xl">
                        <div>Settings</div>
                        <div className="text-sm font-light text-gray-600">
                            @{profileData?.username}
                        </div>
                    </div>
                </div>
                <div className="px-1.5 font-bold text-xl hidden min-[500px]:block">
                    Settings
                </div>
            </div>

            {/* setting items */}
            <div>
                <NavLink
                    to="/settings/account"
                    className={({ isActive }) =>
                        `flex justify-between p-3 hover:bg-gray-100 ${
                            isActive
                                ? "border-r-2 border-twitter-blue bg-gray-100"
                                : ""
                        }`
                    }
                >
                    <span>Your account</span>
                    <span>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
                        >
                            <g>
                                <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
                            </g>
                        </svg>
                    </span>
                </NavLink>
                <NavLink
                    to="/premium"
                    className={({ isActive }) =>
                        `flex justify-between p-3 hover:bg-gray-100 ${
                            isActive
                                ? "border-r-2 border-twitter-blue bg-gray-100"
                                : ""
                        }`
                    }
                >
                    <span>Premium</span>
                    <span>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
                        >
                            <g>
                                <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
                            </g>
                        </svg>
                    </span>
                </NavLink>
                <NavLink
                    to="/settings/notifications"
                    className={({ isActive }) =>
                        `flex justify-between p-3 hover:bg-gray-100 ${
                            isActive
                                ? "border-r-2 border-twitter-blue bg-gray-100"
                                : ""
                        }`
                    }
                >
                    <span>Notifications</span>
                    <span>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
                        >
                            <g>
                                <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
                            </g>
                        </svg>
                    </span>
                </NavLink>
                <NavLink
                    to="/settings/accessibility_display_and_languages"
                    className={({ isActive }) =>
                        `flex justify-between p-3 hover:bg-gray-100 ${
                            isActive
                                ? "border-r-2 border-twitter-blue bg-gray-100"
                                : ""
                        }`
                    }
                >
                    <span>Accessibility and display</span>
                    <span>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
                        >
                            <g>
                                <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
                            </g>
                        </svg>
                    </span>
                </NavLink>
            </div>
        </div>
    );
}

export default SettingsList;
