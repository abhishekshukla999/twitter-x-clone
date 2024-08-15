import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { profileService } from "../../../../appwrite";
import { addProfileData } from "../../../../features/profile/profileSlice";
import { useState } from "react";
import { LoadingModal } from "../../../";
import { toast } from "sonner";
import { SettingItemsContainer, BackButton } from "../../../";

function Gender() {
    const profileData = useSelector((state) => state.profile);
    const authData = useSelector((state) => state.auth.userData);
    const { register, handleSubmit } = useForm({
        defaultValues: { gender: profileData?.gender || "" },
    });
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    document.title = "Gender / X";

    const changeGender = async (data) => {
        setLoading(true);

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

                toast.success("Gender changed successfully !!");
            } catch (error) {
                // console.log("Error updating gender :: ", error);
                toast.error("Gender changing failed !!");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <SettingItemsContainer>
                <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                    <div className="flex gap-5">
                        <BackButton />
                        <div className="font-bold text-xl py-3">Gender</div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(changeGender)}>
                    <div className="border-b dark:border-gray-800 dim:border-gray-800 py-4 px-3 text-gray-500 text-[15px]">
                        If you haven&apos;t already specified a gender, this is
                        the one associated with your account based on your
                        profile and activity. This information won&apos;t be
                        displayed publicly.
                    </div>
                    <div className="px-2 py-3 border-b dark:border-gray-800 dim:border-gray-800">
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
                            className="py-1.5 px-4 text-white font-bold rounded-full bg-twitter-blue hover:bg-sky-600 yellow:bg-twitter-yellow yellow:hover:bg-yellow-600 crimson:bg-twitter-crimson crimson:hover:bg-rose-600 purple:bg-twitter-purple purple:hover:bg-purple-600 orange:bg-twitter-orange orange:hover:bg-orange-600 green:bg-twitter-green green:hover:bg-green-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </SettingItemsContainer>

            <LoadingModal isOpen={loading} />
        </>
    );
}

export default Gender;
