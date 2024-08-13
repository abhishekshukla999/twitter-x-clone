import { useNavigate, NavLink } from "react-router-dom";
import { Input, LoadingModal } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../../../../appwrite";
import { login } from "../../../../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

function ChangePassword() {
    const authData = useSelector((state) => state.auth.userData);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const password = watch(["newPassword", "confirmPassword"]);

    const changePassword = async (data) => {
        setLoading(true);

        if (authData && password["0"] === password["1"]) {
            try {
                const updatedAuthData = await authService.updatePassword({
                    newPassword: data?.confirmPassword,
                    currentPassword: data?.currentPassword,
                });

                dispatch(login({ userData: updatedAuthData }));
                navigate(-1);

                toast.success("Password updated successfully !!");
            } catch (error) {
                // console.log("Error updating password :: ", error);
                toast.error(`"Password updating failed ${error}`);
            } finally {
                reset();
                setLoading(false);
            }
        } else {
            console.log("Please enter same password");
        }
    };

    return (
        <>
            <div className="xl:flex-[0_0_43%] border-r h-full sticky top-0 overflow-y-auto">
                <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                    <div className="flex gap-5">
                        <NavLink
                            className="m-0.5 my-auto p-2 hover:bg-gray-200 rounded-full"
                            onClick={() => navigate(-1)}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-5 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                            >
                                <g>
                                    <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                                </g>
                            </svg>
                        </NavLink>
                        <div className="font-bold text-xl py-3">
                            Change your password
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(changePassword)}>
                    <div className="border-b py-4 px-3">
                        <Input
                            label="Current password"
                            type="password"
                            {...register("currentPassword", {
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
                        {errors.currentPassword?.message && (
                            <small className="block text-red-500">
                                {errors.currentPassword?.message}
                            </small>
                        )}
                        <button className="text-twitter-blue text-[13px] hover:underline">
                            Forgot password?
                        </button>
                    </div>
                    <div className="border-b">
                        <div className="py-4 px-3">
                            <Input
                                label="New password"
                                type="password"
                                {...register("newPassword", {
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
                            {errors.newPassword?.message && (
                                <small className="block text-red-500">
                                    {errors.newPassword?.message}
                                </small>
                            )}
                        </div>
                        <div className="py-4 px-3">
                            <Input
                                label="Confirm password"
                                type="password"
                                {...register("confirmPassword", {
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
                            {errors.confirmPassword?.message && (
                                <small className="block text-red-500">
                                    {errors.confirmPassword?.message}
                                </small>
                            )}
                        </div>

                        {password["0"] !== password["1"] && (
                            <small className="py-1 px-3 block text-red-500">
                                New password and Confirm password must be same
                            </small>
                        )}
                    </div>
                    <div className="border-b py-4 px-3 text-[15px] text-gray-500">
                        Changing your password will log you out of all your
                        active X sessions except the one you&apos;re using at
                        this time. The
                        <span className="text-twitter-blue hover:underline">
                            1 application{" "}
                        </span>
                        with access to your account won&apos;t be affected.{" "}
                        <span className="text-twitter-blue hover:underline">
                            Learn more
                        </span>
                    </div>
                    <div className="flex justify-end px-2 py-3">
                        <button
                            type="submit"
                            className="py-1.5 px-4 text-white font-bold bg-twitter-blue rounded-full hover:bg-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <LoadingModal isOpen={loading} />
        </>
    );
}

export default ChangePassword;
