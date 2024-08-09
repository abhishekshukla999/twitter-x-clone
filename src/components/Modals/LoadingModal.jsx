import { createPortal } from "react-dom";
import { Loader } from "../";

function LoadingModal({ isOpen }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="close-outer fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="overflow-y-auto opacity-100 p-5 rounded-xl relative z-50 w-fit text-black">
                <Loader />
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default LoadingModal;