import React from "react";

function AvatarForm({ register, onClose }) {
    return (
        <div>
            <div className="text-[26px] font-bold my-3 mx-7 text-white">
                Upload Profile Picture
            </div>
            <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                <input
                    className="bg-black border border-gray-500 p-4 rounded-lg text-white w-full"
                    type="file"
                    placeholder="profile"
                    {...register("avatar")}
                />
            </div>

            <div className="mx-7 my-5  text-black font-bold  sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                <button
                    className="bg-gray-100 rounded-full p-4 w-full"
                    onClick={onClose}
                >
                    Skip for now
                </button>
            </div>
        </div>
    );
}

export default AvatarForm;

// profile pic
