import { Input } from "../";

function Step2({ register, onBack, formState }) {
    const { errors } = formState;

    return (
        <div>
            <div className="text-[26px] font-bold my-3 mx-7 text-white">
                Enter Your Password and Username
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <Input
                        className="bg-black text-white"
                        type="password"
                        label="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters long",
                            },
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message:
                                    "Password must contain at least 1 uppercase letter, 1 number, and 1 special character",
                            },
                        })}
                    />

                    {errors.password?.message && (
                        <small className="text-red-500 p-1">
                            {errors.password?.message}
                        </small>
                    )}
                </div>
                <div className="mx-7 my-5 sm:w-[500px] max-[639px]:w-[350px] max-[350px]:w-full">
                    <Input
                        className="bg-black text-white"
                        label="Username"
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Username must be at least 3 characters long",
                            },
                            maxLength: {
                                value: 15,
                                message: "Username cannot exceed 15 characters",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9_]+$/,
                                message:
                                    "Username can only contain letters, numbers, and underscores",
                            },
                        })}
                    />
                    {errors.username?.message && (
                        <small className="text-red-500 p-1">
                            {errors.username?.message}
                        </small>
                    )}
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
