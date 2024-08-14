import { Input, LoadingModal } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { profileService } from "../../../../appwrite";
import { addProfileData } from "../../../../features/profile/profileSlice";
import { toast } from "sonner";
import { useState } from "react";
import { SettingItemsContainer, BackButton } from "../../../";

function PhoneChange() {
    const profileData = useSelector((state) => state.profile);
    const authData = useSelector((state) => state.auth.userData);
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
        getValues,
    } = useForm({
        defaultValues: { phone: profileData?.phone || "" },
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const changePhone = async (data, action) => {
        setLoading(true);

        if (data.phone === profileData?.phone && action === "update") return;

        if (authData) {
            try {
                if (action === "delete") {
                    data.phone = "";
                }

                const updatedProfileData = await profileService.updateProfile(
                    profileData?.$id,
                    {
                        phone: data?.phone || "",
                    }
                );

                if (updatedProfileData) {
                    dispatch(addProfileData(updatedProfileData));
                }

                toast.success("Phone number updated successfully !!");
            } catch (error) {
                toast.error("Phone number updating failed");
            } finally {
                reset({ phone: data?.phone });
                setLoading(false);
            }
        }
    };

    const handleUpdate = () => {
        changePhone(getValues(), "update");
    };

    const handleDelete = () => {
        changePhone(getValues(), "delete");
    };

    return (
        <>
            <SettingItemsContainer>
                <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                    <div className="flex gap-5">
                        <BackButton />
                        <div className="font-bold text-xl py-3">
                            Change phone
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(() => {})}>
                    <div className="border-b dark:border-gray-800 dim:border-gray-800 py-4 px-3">
                        <Input
                            label="Current"
                            type="text"
                            inputMode="numeric"
                            placeholder="Type phone number"
                            {...register("phone", {
                                required: true,
                                pattern: /^[0-9]*$/,
                            })}
                            onInput={(e) =>
                                (e.target.value = e.target.value.replace(
                                    /\D/g,
                                    ""
                                ))
                            }
                        />

                        {!isValid && (
                            <p className="text-red-500">
                                Please write a valid phone number
                            </p>
                        )}
                    </div>
                    <div className="my-1 box-border">
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="py-3 px-4 text-center w-full text-twitter-blue hover:text-sky-600 yellow:text-twitter-yellow yellow:hover:text-yellow-600 crimson:text-twitter-crimson crimson:hover:text-rose-600 purple:text-twitter-purple purple:hover:text-purple-600 orange:text-twitter-orange orange:hover:text-orange-600 green:text-twitter-green green:hover:text-green-600 hover:bg-blue-100 yellow:hover:bg-yellow-100 crimson:hover:bg-rose-100 purple:hover:bg-purple-100 orange:hover:bg-orange-100 green:hover:bg-gray-100"
                        >
                            Update phone number
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="py-3 px-4 text-center w-full text-red-500 hover:bg-red-100"
                        >
                            Delete phone number
                        </button>
                    </div>
                </form>
            </SettingItemsContainer>

            <LoadingModal isOpen={loading} />
        </>
    );
}

export default PhoneChange;
