import { createPortal } from "react-dom";
import { Loader } from "../index";

function LoadingModal({ isOpen }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="close-outer fixed top-0 left-0 right-0 bottom-0 z-[1000] bg-gray-100 bg-opacity-50 flex justify-center items-center">
            <div className="overflow-y-auto opacity-100 p-5 rounded-xl relative z-50 w-fit text-black">
                <Loader />
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default LoadingModal;
