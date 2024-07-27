import { NavLink } from "react-router-dom";

function NotificationSetting() {
    return (
        <div className="xl:flex-[0_0_43%] border-r h-full sticky top-0 overflow-y-auto">
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="font-bold text-xl py-3">Notifications</div>
            </div>
            <div>
                <div className="py-3 text-[13px] text-gray-500">
                    Select the kinds of notifications you get about your
                    activities, interests, and recommendations.
                </div>
                <div>
                    <NavLink
                        to="/settings/notifications/filters"
                        className="flex py-3 hover:bg-gray-100"
                    >
                        <div className="my-auto py-2 px-4 mr-4">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv"
                                data-testid="testIconFilter"
                            >
                                <g>
                                    <path d="M14 6V3h2v8h-2V8H3V6h11zm7 2h-3.5V6H21v2zM8 16v-3h2v8H8v-3H3v-2h5zm13 2h-9.5v-2H21v2z"></path>
                                </g>
                            </svg>
                        </div>
                        <div className="flex justify-between w-full">
                            <div className="leading-5">
                                <div className="text-[15px]">Filters</div>
                                <div className="text-[13px] text-gray-500">
                                    Choose the notifications you&apos;d like to
                                    see –– and those you don&apos;t.
                                </div>
                            </div>
                            <div className="my-auto py-2 px-4">
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
                        </div>
                    </NavLink>
                    <NavLink
                        to="/settings/notifications/preferences"
                        className="flex py-3 hover:bg-gray-100"
                    >
                        <div className="my-auto py-2 px-4 mr-4">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv"
                                data-testid="testIconDeviceNotification"
                            >
                                <g>
                                    <path d="M7 17h6v2H7v-2zm7.5-15C15.88 2 17 3.12 17 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-9C4.12 22 3 20.88 3 19.5v-15C3 3.12 4.12 2 5.5 2h9zM5 19.5c0 .28.22.5.5.5h9c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-9c-.28 0-.5.22-.5.5v15zm15.74-3.49l1.64 1.15C23.4 15.7 24 13.92 24 12s-.6-3.7-1.62-5.16l-1.64 1.15C21.53 9.13 22 10.51 22 12s-.47 2.87-1.26 4.01zm-.82-7.45l-1.64 1.15c.45.65.72 1.43.72 2.29 0 .85-.27 1.64-.72 2.29l1.64 1.15C20.6 14.47 21 13.28 21 12s-.4-2.47-1.08-3.44z"></path>
                                </g>
                            </svg>
                        </div>

                        <div className="flex justify-between w-full">
                            <div className="leading-5 mr-6">
                                <div className="text-[15px]">Preferences</div>
                                <div className="text-[13px] text-gray-500">
                                    Select your preferences by notification
                                    type.
                                </div>
                            </div>
                            <div className="my-auto py-2 px-4">
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
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default NotificationSetting;
