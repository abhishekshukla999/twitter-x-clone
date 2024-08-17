import { NavLink } from "react-router-dom";
import { SettingItemsContainer, MobileBackButton } from "../../index";

function Accessibilities() {
    document.title = "Accessibility and display / X";

    return (
        <SettingItemsContainer>
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <MobileBackButton />
                    <div className="font-bold text-xl py-3">
                        Accessibility and display
                    </div>
                </div>
            </div>
            <div>
                <div className="py-3 mx-2 text-[13px] text-gray-500">
                    Manage how X content is displayed to you.
                </div>
                <div>
                    <NavLink
                        to="/settings/accessibility"
                        className="flex py-3 hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800"
                    >
                        <div className="my-auto py-2 px-4 mr-4">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv"
                            >
                                <g>
                                    <path d="M14.828 9.172c-1.315-1.315-3.326-1.522-4.86-.618L3.707 2.293 2.293 3.707l2.428 2.429c-2.478 2.421-3.606 5.376-3.658 5.513L.932 12l.131.351C1.196 12.704 4.394 21 12 21c2.063 0 3.989-.622 5.737-1.849l2.556 2.556 1.414-1.414-6.261-6.261c.904-1.534.698-3.545-.618-4.86zm-1.414 1.414c.522.522.695 1.264.518 1.932l-2.449-2.449c.669-.177 1.409-.005 1.931.517zM3.085 11.999c.107-.24.272-.588.497-1.002l7.993 7.992c-5.14-.279-7.85-5.563-8.489-6.989zm13.21 5.71c-.695.448-1.422.781-2.175.996L4.672 9.258c.412-.57.899-1.158 1.464-1.708l10.16 10.16h-.001zm6.772-5.71l-.131.352c-.062.164-.801 2.055-2.33 4.027l-1.438-1.438c.917-1.217 1.494-2.378 1.746-2.941-.658-1.467-3.5-7-8.915-7-.712 0-1.376.1-2 .27V3.223c.633-.131 1.291-.223 2-.223 7.605 0 10.804 8.296 10.937 8.648l.131.352z"></path>
                                </g>
                            </svg>
                        </div>
                        <div className="flex justify-between w-full">
                            <div className="leading-5">
                                <div className="text-[15px]">Accessibility</div>
                                <div className="text-[13px] text-gray-500">
                                    Manage aspects of your X experience such as
                                    limiting color contrast and motion.
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
                        to="/settings/display"
                        className="flex py-3 hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800"
                    >
                        <div className="my-auto py-2 px-4 mr-4">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv"
                            >
                                <g>
                                    <path d="M22.21 2.793c-1.22-1.217-3.18-1.26-4.45-.097l-10.17 9.32C5.02 12.223 3 14.376 3 17v5h5c2.62 0 4.78-2.022 4.98-4.593L22.3 7.239c1.17-1.269 1.12-3.229-.09-4.446zM8 20H5v-3c0-1.657 1.34-3 3-3s3 1.343 3 3-1.34 3-3 3zM20.83 5.888l-8.28 9.033c-.5-1.09-1.38-1.971-2.47-2.47l9.03-8.28c.48-.44 1.22-.424 1.68.036s.48 1.201.04 1.681z"></path>
                                </g>
                            </svg>
                        </div>

                        <div className="flex justify-between w-full">
                            <div className="leading-5 mr-6">
                                <div className="text-[15px]">Display</div>
                                <div className="text-[13px] text-gray-500">
                                    Manage your font size, color, and
                                    background. These settings affect all the X
                                    accounts on this browser.
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
        </SettingItemsContainer>
    );
}

export default Accessibilities;
