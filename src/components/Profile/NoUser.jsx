import { NavLink, useNavigate } from "react-router-dom";

function NoUser({ username }) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="top flex items-center px-2 sticky top-0 backdrop-blur-[400px] opacity-[100%] border-b-0">
                <NavLink
                    className="left my-auto p-3 hover:bg-gray-200 rounded-full"
                    onClick={() => navigate(-1)}
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-5 m-auto r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                    >
                        <g>
                            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                        </g>
                    </svg>
                </NavLink>

                <div className="right ml-4 px-1.5 py-3">
                    <p className="font-bold text-xl">Profile</p>
                </div>
            </div>

            <div>
                <div className="">
                    {/* cover */}
                    <div>
                        <div className="h-[200px] w-full bg-gray-300"></div>
                    </div>

                    <div className="flex justify-between relative">
                        {/* Avatar */}
                        <div className="p-4 absolute -top-20">
                            <img
                                className="rounded-full h-[133.5px] w-[133.5px] p-1 bg-white"
                                src="/defaultAvatar.png"
                                alt="Avatar Image"
                            />
                        </div>
                    </div>

                    <div className="mt-20 ml-4 py-3">
                        <p className="text-xl font-bold">@{username}</p>
                    </div>

                    <div className="social flex gap-2 flex-wrap mx-[99px] my-8 py-10 px-5">
                        <p className="text-[31px] leading-9 font-bold mb-2">This account doesn&apos;t exist</p>
                        <p className="text-gray-500 text-[15px] mb-7">Try searching for another.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoUser;
