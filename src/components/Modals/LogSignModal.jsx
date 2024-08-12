import { createPortal } from "react-dom";

function LogSignModal({ children, isOpen, onClose }) {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="bg-black overflow-y-auto opacity-100 p-5 rounded-xl shadow-lg relative w-fit min-h-[70%] max-[702px]:h-screen max-[702px]:w-screen text-black"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="">
                    <button
                        className="rounded-lg m-3 absolute top-2.5 left-2.5 bg-none border-none text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                            </g>
                        </svg>
                    </button>

                    <div className="flex justify-center">
                        <svg
                            viewBox="0 0 24 24"
                            aria-label="X"
                            role="img"
                            className="w-9 invert r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-16y2uox r-lwhw9o"
                        >
                            <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default LogSignModal;
