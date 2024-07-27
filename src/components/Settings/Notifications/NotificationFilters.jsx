import { NavLink, useNavigate } from "react-router-dom";

function NotificationFilters() {
    const navigate = useNavigate();

    return (
        <div className="xl:flex-[0_0_43%] border-r h-full sticky top-0 overflow-y-auto">
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <NavLink
                        className="m-0.5 my-auto p-2 hover:bg-gray-200 rounded-full"
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
                    <div className="font-bold text-xl py-3">Filters</div>
                </div>
            </div>

            <div>
                <div className="py-3 px-2 text-[13px] text-gray-500">
                    Choose the notifications you&apos;d like to see — and those
                    you don&apos;t.
                </div>

                <div className="leading-5 py-3 px-2 w-full">
                    <div className="text-[15px] flex justify-between">
                        <p>Quality filter</p>
                        <input type="checkbox" className="w-6 cursor-pointer" />
                    </div>
                    <div className="text-[13px] text-gray-500">
                        Choose to filter out content such as duplicate or
                        automated posts. This doesn&apos;t apply to
                        notifications from accounts you follow or have
                        interacted with recently. Learn more
                    </div>
                </div>

                <NavLink
                    to="/settings/notifications/advanced_filters"
                    className="flex py-3 px-2 justify-between w-full hover:bg-gray-100"
                >
                    <div className="text-[15px]">Muted notifications</div>

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
        </div>
    );
}

export default NotificationFilters;
