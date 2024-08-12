import { useState } from "react";
import { SignUp1, SignUp2 } from "../";
import { useForm } from "react-hook-form";
import { authService, profileService } from "../../appwrite";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { addProfileData } from "../../features/profile/profileSlice";
import { LoadingModal } from "../";

function SignupForm({ step, setStep }) {
    const { register, handleSubmit, formState } = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleBack = () => setStep(step - 1);

    const handleNext = () => setStep(step + 1);

    const submitForm = async (data) => {
        setLoading(true);

        try {
            const { name, email, password, username, dob } = data;

            const userData = await authService.createAccount({
                name,
                email,
                password,
            });

            const [loginData, userId] = userData;

            if (loginData) {
                dispatch(login({ userData: loginData }));

                const profileData = await profileService.createProfile({
                    userId,
                    username,
                    email,
                    name,
                    dob,
                });

                if (profileData) {
                    dispatch(addProfileData(profileData));
                }
            }
        } catch (error) {
            console.log("Error in singup :: ", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(submitForm)}>
                {step === 1 && (
                    <SignUp1
                        register={register}
                        onNext={handleNext}
                        formState={formState}
                    />
                )}

                {step === 2 && (
                    <SignUp2
                        register={register}
                        onBack={handleBack}
                        formState={formState}
                    />
                )}
            </form>
            <LoadingModal isOpen={loading} />
        </div>
    );
}

export default SignupForm;
