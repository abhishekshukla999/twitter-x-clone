import { useEffect, useState } from "react";
import { Input } from "../index";
import { Query } from "appwrite";
import { profileService } from "../../appwrite";

function Step1({ register, onNext, formState, watch, trigger }) {
    const [emailAvailable, setEmailAvailable] = useState(true);
    const { isValid, errors } = formState;

    const currrentEmail = watch("email");

    useEffect(() => {
        async function fetchUsername() {
            const profileDocs = await profileService.getProfiles([
                Query.equal("email", [currrentEmail || ""]),
            ]);

            console.log(profileDocs.documents);

            if (profileDocs.documents.length !== 0) {
                setEmailAvailable(false);
            } else {
                setEmailAvailable(true);
            }
        }

        fetchUsername();
    }, [currrentEmail]);

    useEffect(() => {
        if (currrentEmail !== undefined) {
            trigger("email");
        }
    }, [currrentEmail, trigger]);

    return (
        <div>
            <div className="text-[26px] font-bold my-3 mx-7 text-white">
                Create Your Account
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <Input
                        className="bg-black text-white"
                        maxLength="50"
                        label={
                            <>
                                Name <span className="text-red-500">*</span>
                            </>
                        }
                        {...register("name", {
                            required: true,
                        })}
                    />
                </div>
                <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <Input
                        className="bg-black text-white"
                        type="email"
                        label={
                            <>
                                Email <span className="text-red-500">*</span>
                            </>
                        }
                        {...register("email", {
                            required: "Please enter email address",
                            validate: {
                                matchPatern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                        value
                                    ) ||
                                    "Email address must be a valid address (example@example.com)",
                            },
                        })}
                    />

                    <small className="text-gray-500 p-1 block">
                        ex - example@example.com
                    </small>

                    {errors.email ? (
                        <small className="text-red-500 p-1 block">
                            {errors.email.message}
                        </small>
                    ) : currrentEmail && currrentEmail?.length !== 0 ? (
                        emailAvailable ? (
                            <small className="text-green-500 block">
                                {currrentEmail} is available
                            </small>
                        ) : (
                            <small className="text-red-500 block">
                                {currrentEmail} is already registered
                            </small>
                        )
                    ) : null}
                </div>

                <div className="mx-7 my-5 flex flex-col sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <label className="text-white my-2" htmlFor="dob">
                        Date of birth{" "}
                        <span className="text-red-500">&#42;</span>
                    </label>
                    <p className="mt-1 mb-3 text-sm text-gray-400 break-words">
                        This will not be shown publicly. Confirm your own age,
                        even if this account is for a business, a pet, or
                        something else.
                    </p>
                    <input
                        className="bg-transparent text-black border invert text-center border-gray-500 p-4 rounded-sm w-full"
                        type="date"
                        id="dob"
                        placeholder="DOB"
                        {...register("dob", {
                            required: "Please add your birth date",
                        })}
                    />
                </div>

                <div className="mx-7 my-5 text-black font-bold sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <button
                        className={`bg-gray-100 ${
                            !isValid || !emailAvailable
                                ? "text-gray-500 bg-gray-400 cursor-not-allowed"
                                : null
                        } rounded-full p-4 w-full`}
                        onClick={onNext}
                        disabled={!isValid || !emailAvailable}
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
