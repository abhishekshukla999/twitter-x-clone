import { NavLink } from "react-router-dom";

function SettingsBox() {
    return (
        <div className="xl:flex-[0_0_43%] border-r h-full sticky top-0 overflow-y-auto">
            <div className="top flex p-3 sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-4">
                    <NavLink className="m-0.5">
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
                </div>

                <div className="px-1.5 font-bold text-[17px] flex">
                    <span>Settings Name</span>
                </div>
            </div>
        </div>
    );
}

export default SettingsBox;
