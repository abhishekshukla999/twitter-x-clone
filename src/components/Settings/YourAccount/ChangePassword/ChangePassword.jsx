import { useNavigate, NavLink } from "react-router-dom";
import { Input } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../../../../appwrite";
import { login } from "../../../../features/auth/authSlice";
import { useForm } from "react-hook-form";

function ChangePassword() {
    const authData = useSelector((state) => state.auth.userData);
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const password = watch(["newPassword", "confirmPassword"]);

    const changePassword = async (data) => {
        if (authData && password["0"] === password["1"]) {
            try {
                const updatedAuthData = await authService.updatePassword({
                    newPassword: data?.confirmPassword,
                    currentPassword: data?.currentPassword,
                });

                dispatch(login({ userData: updatedAuthData }));
                console.log("Password successfully updated!!");
                navigate(-1);
            } catch (error) {
                console.log("Error updating password :: ", error);
            }
        } else {
            console.log("Please enter same password");
        }
    };

    return (
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
                        type="text"
                        {...register("currentPassword", { required: true })}
                    />
                    <button className="text-twitter-blue text-[13px] hover:underline">
                        Forgot password?
                    </button>
                </div>
                <div className="border-b">
                    <div className="py-4 px-3">
                        <Input
                            label="New password"
                            type="text"
                            {...register("newPassword", { required: true })}
                        />
                    </div>
                    <div className="py-4 px-3">
                        <Input
                            label="Confirm password"
                            type="text"
                            {...register("confirmPassword", { required: true })}
                        />
                    </div>
                </div>
                <div className="border-b py-4 px-3 text-[15px] text-gray-500">
                    Changing your password will log you out of all your active X
                    sessions except the one you&apos;re using at this time. The
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
    );
}

export default ChangePassword;
