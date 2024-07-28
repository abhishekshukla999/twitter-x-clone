import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { profileService } from "../../../../appwrite";
import { addProfileData } from "../../../../features/profile/profileSlice";

function EmailChange() {
    const profileData = useSelector((state) => state.profile);
    const authData = useSelector((state) => state.auth.userData);
    const { register, handleSubmit } = useForm({
        defaultValues: { email: profileData?.email || "" },
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEmail = async (data) => {
        if (authData) {
            const updatedProfileData = await profileService.updateProfile(
                profileData?.$id,
                {
                    email: data?.email || "",
                }
            );

            if (updatedProfileData) {
                dispatch(addProfileData(updatedProfileData));
            }
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
                    <div className="font-bold text-xl py-3">Change email</div>
                </div>
            </div>
            <form onSubmit={handleSubmit(changeEmail)}>
                <div className="border-b py-4 px-3">
                    <Input
                        label="Current"
                        type="text"
                        placeholder="Type email"
                        {...register("email", { required: true })}
                    />
                </div>
                <div className="my-1 box-border">
                    <button
                        type="submit"
                        className="py-3 px-4 text-center w-full text-twitter-blue hover:bg-blue-100"
                    >
                        Update email address
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EmailChange;
