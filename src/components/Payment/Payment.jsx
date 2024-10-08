import "./payment.css";
import { useForm } from "react-hook-form";
import { profileService } from "../../appwrite";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProfileData } from "../../features/profile/profileSlice";
import { toast } from "sonner";
import { useEffect } from "react";

function Payment() {
    const authStatus = useSelector((state) => state.auth.status);
    const profileData = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            name: "Elon musk",
            cardNumber: "1234567890123456",
            securityCode: "123",
        },
    });
    const { errors } = formState;

    useEffect(() => {
        if (profileData.premiumMember) {
            navigate(`/${profileData.username}`);
        }
    }, [navigate, profileData.premiumMember, profileData.username]);

    const checkout = async (data) => {
        if (authStatus) {
            try {
                const updatedProfileData = await profileService.updateProfile(
                    profileData.$id,
                    { premiumMember: true }
                );

                if (updatedProfileData) {
                    dispatch(addProfileData(updatedProfileData));
                }

                toast.success(
                    "Your X subscription has been added. Thank You!!"
                );
            } catch (error) {
                console.log("Error buying premium subscription :: ", error);
                toast.error("X subscription has failed");
            }
        }
    };

    return (
        <div className="w-full">
            <form
                className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16"
                onSubmit={handleSubmit(checkout)}
            >
                <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
                    <div className="w-full pt-1 pb-5">
                        <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                            <i className="mdi mdi-credit-card-outline text-3xl"></i>
                        </div>
                    </div>
                    <div className="mb-10">
                        <h1 className="text-center font-bold text-xl uppercase">
                            Secure payment info
                        </h1>
                    </div>
                    <div className="mb-3 flex -mx-2">
                        <div className="px-2">
                            <label
                                htmlFor="type1"
                                className="flex items-center cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-indigo-500"
                                    name="type"
                                    id="type1"
                                    checked
                                />
                                <img
                                    src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                                    className="h-8 ml-3"
                                    loading="lazy"
                                />
                            </label>
                        </div>
                        <div className="px-2">
                            <label
                                htmlFor="type2"
                                className="flex items-center cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-indigo-500"
                                    name="type"
                                    id="type2"
                                />
                                <img
                                    src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                                    className="h-8 ml-3"
                                    loading="lazy"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="font-bold text-sm mb-2 ml-1">
                            Name on card
                        </label>
                        <div>
                            <input
                                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="John Smith"
                                type="text"
                                {...register("name", {
                                    required: "This field can't be empty",
                                })}
                            />
                        </div>
                        {errors.name?.message && (
                            <div className="text-red-500">
                                {errors.name?.message}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="font-bold text-sm mb-2 ml-1">
                            Card number
                        </label>
                        <div>
                            <input
                                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="0000 0000 0000 0000"
                                type="text"
                                {...register("cardNumber", {
                                    required: "This field can't be empty",
                                })}
                            />
                        </div>
                        {errors.cardNumber?.message && (
                            <div className="text-red-500">
                                {errors.cardNumber?.message}
                            </div>
                        )}
                    </div>
                    <div className="mb-3 -mx-2 flex items-end">
                        <div className="px-2 w-1/2">
                            <label className="font-bold text-sm mb-2 ml-1">
                                Expiration date
                            </label>
                            <div>
                                <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                    <option value="01" selected>
                                        01 - January
                                    </option>
                                    <option value="02">02 - February</option>
                                    <option value="03">03 - March</option>
                                    <option value="04">04 - April</option>
                                    <option value="05">05 - May</option>
                                    <option value="06">06 - June</option>
                                    <option value="07">07 - July</option>
                                    <option value="08">08 - August</option>
                                    <option value="09">09 - September</option>
                                    <option value="10">10 - October</option>
                                    <option value="11">11 - November</option>
                                    <option value="12">12 - December</option>
                                </select>
                            </div>
                        </div>
                        <div className="px-2 w-1/2">
                            <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                <option value="2024" selected>
                                    2024
                                </option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2029">2030</option>
                                <option value="2029">2031</option>
                                <option value="2029">2032</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-10">
                        <label className="font-bold text-sm mb-2 ml-1">
                            Security code
                        </label>
                        <div>
                            <input
                                className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="000"
                                type="text"
                                {...register("securityCode", {
                                    required: "This field can't be empty",
                                })}
                            />
                        </div>
                        {errors.securityCode?.message && (
                            <div className="text-red-500">
                                {errors.securityCode?.message}
                            </div>
                        )}
                    </div>
                    <div className="py-2 text-red-500">
                        Note: This is dummy payment window and it doesn&apos;t
                        process real payments
                    </div>
                    <div>
                        <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                            <i className="mdi mdi-lock-outline mr-1"></i> PAY
                            NOW
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Payment;
