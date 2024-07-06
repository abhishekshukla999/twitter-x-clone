import React from "react";

function Step2({ register, onBack }) {
    return (
        <div>
            <div className="text-[26px] font-bold my-3 mx-7 text-white">
                Enter Your Password and Username
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <input
                        className="bg-black border border-gray-500 p-4 rounded-lg text-white w-full"
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                    />
                </div>
                <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <input
                        className="bg-black border border-gray-500 p-4 rounded-lg text-white w-full"
                        type="text"
                        placeholder="Username"
                        {...register("username")}
                    />
                </div>

                <div className="mx-7 my-4  text-black font-bold  sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full w-full">
                    <button
                        className="bg-gray-100 mb-3 rounded-full p-4 w-full"
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        className="bg-gray-100 rounded-full p-4 w-full"
                        onClick={onBack}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Step2;

// username & password
