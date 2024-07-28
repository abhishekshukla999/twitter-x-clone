import { NavLink, useNavigate } from "react-router-dom";

function Accessibility() {
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
                    <div className="font-bold text-xl py-3">Accessibility</div>
                </div>
            </div>

            <div>
                <div className="py-3 px-2 text-[13px] text-gray-500">
                    Manage aspects of your X experience such as limiting color
                    contrast and motion. These settings affect all the X
                    accounts on this browser.
                </div>

                <div className="px-2 py-3 text-xl font-bold">Vision</div>

                <div className="leading-5 py-3 px-2 w-full">
                    <div className="text-[15px] flex justify-between">
                        <p>Increase color contrast</p>
                        <input type="checkbox" className="w-6 cursor-pointer" />
                    </div>
                    <div className="text-[13px] text-gray-500">
                        Improves legibility by increasing the contrast between
                        text and background colors.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Accessibility;
