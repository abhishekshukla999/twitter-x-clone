import { NavLink } from "react-router-dom";
import { SettingItemsContainer, BackButton } from "../../";

function NotificationPreferences() {
    return (
        <SettingItemsContainer>
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <BackButton />
                    <div className="font-bold text-xl py-3">Preferences</div>
                </div>
            </div>
            <div>
                <div className="py-3 px-2 text-[13px] text-gray-500">
                    Select your preferences by notification type.
                    <span className="text-twitter-blue hover:underline cursor-pointer">
                        {""} Learn more
                    </span>
                </div>
                <NavLink
                    to="/settings/push_notifications"
                    className="flex py-3 px-2 my-1 justify-between w-full hover:bg-gray-100"
                >
                    <div className="text-[15px]">Push notifications</div>

                    <div className="my-auto px-4">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
                        >
                            <g>
                                <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
                            </g>
                        </svg>
                    </div>
                </NavLink>
                <NavLink
                    to="/settings/email_notifications"
                    className="flex py-3 px-2 my-1 justify-between w-full hover:bg-gray-100"
                >
                    <div className="text-[15px]">Email notifications</div>

                    <div className="my-auto px-4">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
                        >
                            <g>
                                <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
                            </g>
                        </svg>
                    </div>
                </NavLink>
            </div>
        </SettingItemsContainer>
    );
}

export default NotificationPreferences;
