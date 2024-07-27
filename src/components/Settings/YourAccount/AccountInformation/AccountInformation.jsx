import { NavLink, useNavigate } from "react-router-dom";

function AccountInformation() {
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
                    <div className="font-bold text-xl py-3">
                        Account information
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div className="border-b">
                        <NavLink
                            to="/settings/screen_name"
                            className="flex py-3 px-2 justify-between w-full hover:bg-gray-100"
                        >
                            <div className="leading-5">
                                <div className="text-[15px]">Username</div>
                                <div className="text-[13px] text-gray-500">
                                    @username
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
                        </NavLink>
                        <NavLink
                            to="/settings/phone"
                            className="flex py-3 px-2 justify-between w-full hover:bg-gray-100"
                        >
                            <div className="leading-5 mr-6">
                                <div className="text-[15px]">Phone</div>
                                <div className="text-[13px] text-gray-500">
                                    +123456789
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
                        </NavLink>
                        <NavLink
                            to="/settings/email"
                            className="flex py-3 px-2 justify-between w-full hover:bg-gray-100"
                        >
                            <div className="leading-5 mr-6">
                                <div className="text-[15px]">Email</div>
                                <div className="text-[13px] text-gray-500">
                                    abcd@gmail.com
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
                        </NavLink>
                        <div className="py-3 px-2 leading-5 mr-6 w-full">
                            <div className="text-[15px]">Verified</div>
                            <div className="text-[13px] text-gray-500">
                                No.{" "}
                                <span className="text-twitter-blue hover:underline cursor-pointer">
                                    Learn more
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="border-b">
                        <div className="py-3 px-2 leading-5 mr-6 w-full">
                            <div className="text-[15px]">Account creation</div>
                            <div className="text-[13px] text-gray-500">
                                Aug 3, 2022, 6:29:02 PM
                            </div>
                        </div>
                    </div>
                    <div className="border-b">
                        <NavLink
                            to="/settings/country"
                            className="flex py-3 px-2 justify-between w-full hover:bg-gray-100"
                        >
                            <div className="leading-5 mr-6">
                                <div className="text-[15px]">Country</div>
                                <div className="text-[13px] text-gray-500">
                                    India
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
                        </NavLink>
                        <NavLink
                            to="/settings/your_twitter_data/gender"
                            className="flex py-3 px-2 justify-between w-full hover:bg-gray-100"
                        >
                            <div className="leading-5 mr-6">
                                <div className="text-[15px]">Gender</div>
                                <div className="text-[13px] text-gray-500">
                                    Male
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
                        </NavLink>
                        <div className="py-3 px-2 leading-5 mr-6 w-full">
                            <div className="text-[15px]">Birth date</div>
                            <div className="text-[13px] text-gray-500">
                                Jan 1, 1999
                            </div>
                        </div>
                    </div>
                    <div>
                        <NavLink
                            to="/settings/your_twitter_data/age"
                            className="flex py-3 px-2 justify-between w-full hover:bg-gray-100"
                        >
                            <div className="leading-5 mr-6">
                                <div className="text-[15px]">Age</div>
                                <div className="text-[13px] text-gray-500">
                                    99
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
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountInformation;
