import { createPortal } from "react-dom";

function Modal({ children, isOpen, onClose }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 flex justify-center items-center">
            <div className=" bg-white p-5 rounded-lg shadow-lg relative w-1/3  text-black">
                <div>
                    <button
                        className="bg-blue-500 rounded-lg absolute top-2.5 right-2.5 bg-none border-none text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default Modal;
