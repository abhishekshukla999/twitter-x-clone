import React from "react";

function Step1({ register, onNext }) {
    return (
        <div>
            <div className="text-[26px] font-bold my-3 mx-7 text-white">
                Create Your Account
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <input
                        className="bg-black border border-gray-500 p-4 rounded-lg text-white w-full"
                        type="text"
                        maxLength="50"
                        placeholder="Name"
                        {...register("name")}
                    />
                </div>
                <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <input
                        className="bg-black border border-gray-500 p-4 rounded-lg text-white w-full"
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                    />
                </div>
                <div className="mx-7 my-5 flex flex-col sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <label className="text-white my-2" htmlFor="dob">
                        Date of birth
                    </label>
                    <p className="mt-1 mb-3 text-sm text-gray-400 break-words">
                        This will not be shown publicly. Confirm your own age,
                        even if this account is for a business, a pet, or
                        something else.
                    </p>
                    <input
                        className="bg-transparent text-black border invert text-center border-gray-500 p-4 rounded-lg w-full"
                        type="date"
                        id="dob"
                        placeholder="DOB"
                        {...register("dob")}
                    />
                </div>

                <div className="mx-7 my-5  text-black font-bold  sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <button
                        className="bg-gray-100 rounded-full p-4 w-full"
                        onClick={onNext}
                    >
                        Next
                        
                    </button>
                </div>

                <br />
            </div>
        </div>
    );
}

export default Step1;

// name, email, DOB
