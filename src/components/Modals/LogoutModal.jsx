import { createPortal } from "react-dom";

function LogoutModal({ children, isOpen, onClose }) {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="close-outer fixed top-0 left-0 right-0 bottom-0 z-[1000] bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={() => onClose()}
        >
            <div
                className="bg-white overflow-y-auto opacity-100 dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg dark:text-white dim:text-white p-5 rounded-xl shadow-lg relative l- w-fit text-black"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="m-2">
                    <button
                        className="rounded-lg absolute top-2.5 left-2.5 bg-none border-none text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 fill-black dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <br />
                {/* logout button*/}
                <div>{children}</div>
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default LogoutModal;
