import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MobileBackButton } from "../";

function SettingsList() {
    const profileData = useSelector((state) => state.profile);

    return (
        <div className="flex flex-col xl:flex-[0_0_35%] lg:flex-[0_0_37%] max-[1004px]:flex-[0_0_80%] max-[704px]:flex-[0_0_100%] border-l border-r dark:border-gray-800 dim:border-gray-800 h-screen">
            <div className="top flex justify-between p-3 sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="hidden max-[499px]:flex">
                    <MobileBackButton />
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
                        `flex justify-between p-3 hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800 ${
                            isActive
                                ? "border-r-2 border-twitter-blue yellow:border-twitter-yellow crimson:border-twitter-crimson purple:border-twitter-purple orange:border-twitter-orange green:border-twitter-green bg-gray-100 dark:bg-slate-800 dim:bg-slate-700"
                                : ""
                        }`
                    }
                >
                    <span>Your account</span>
                    <span>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
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
                        `flex justify-between p-3 hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800 ${
                            isActive
                                ? "border-r-2 border-twitter-blue yellow:border-twitter-yellow crimson:border-twitter-crimson purple:border-twitter-purple orange:border-twitter-orange green:border-twitter-green bg-gray-100 dark:bg-slate-800 dim:bg-slate-700"
                                : ""
                        }`
                    }
                >
                    <span>Premium</span>
                    <span>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
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
                        `flex justify-between p-3 hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800 ${
                            isActive
                                ? "border-r-2 border-twitter-blue yellow:border-twitter-yellow crimson:border-twitter-crimson purple:border-twitter-purple orange:border-twitter-orange green:border-twitter-green bg-gray-100 dark:bg-slate-800 dim:bg-slate-700"
                                : ""
                        }`
                    }
                >
                    <span>Notifications</span>
                    <span>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
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
                        `flex justify-between p-3 hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800 ${
                            isActive
                                ? "border-r-2 border-twitter-blue yellow:border-twitter-yellow crimson:border-twitter-crimson purple:border-twitter-purple orange:border-twitter-orange green:border-twitter-green bg-gray-100 dark:bg-slate-800 dim:bg-slate-700"
                                : ""
                        }`
                    }
                >
                    <span>Accessibility and display</span>
                    <span>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
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
