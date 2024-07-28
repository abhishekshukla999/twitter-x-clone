import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { profileService } from "../../../../appwrite";
import { addProfileData } from "../../../../features/profile/profileSlice";

function Gender() {
    const profileData = useSelector((state) => state.profile);
    const authData = useSelector((state) => state.auth.userData);
    const { register, handleSubmit } = useForm({
        defaultValues: { gender: profileData?.gender || "" },
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeGender = async (data) => {
        if (authData) {
            try {
                const updatedProfileData = await profileService.updateProfile(
                    profileData?.$id,
                    {
                        gender: data?.gender || "",
                    }
                );

                if (updatedProfileData) {
                    dispatch(addProfileData(updatedProfileData));
                }
            } catch (error) {
                console.log("Error updating gender :: ", error);
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
                    <div className="font-bold text-xl py-3">Gender</div>
                </div>
            </div>
            <form onSubmit={handleSubmit(changeGender)}>
                <div className="border-b py-4 px-3 text-gray-500 text-[15px]">
                    If you haven&apos;t already specified a gender, this is the
                    one associated with your account based on your profile and
                    activity. This information won&apos;t be displayed publicly.
                </div>
                <div className="px-2 py-3 border-b">
                    <div className="flex justify-between my-1">
                        <label htmlFor="female">Female</label>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            className="w-5"
                            value="Female"
                            {...register("gender", { required: true })}
                        />
                    </div>
                    <div className="flex justify-between my-1">
                        <label htmlFor="male">Male</label>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            className="w-5"
                            value="Male"
                            {...register("gender", { required: true })}
                        />
                    </div>
                    <div className="flex justify-between my-1">
                        <label htmlFor="third">Other</label>
                        <input
                            type="radio"
                            id="other"
                            name="gender"
                            className="w-5"
                            value="Other"
                            {...register("gender", { required: true })}
                        />
                    </div>
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

export default Gender;
