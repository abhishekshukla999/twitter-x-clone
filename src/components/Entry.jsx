import React, { useState } from "react";
import Modal from "./Modal";
import { Login, Step1, Step2 } from "./index";
import { useForm } from "react-hook-form";
import { authService, profileService, profileMediaService } from "../appwrite";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

function Entry() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenSignup, setIsOpenSignup] = useState(false);
    const [step, setStep] = useState(1);

    const handleBack = () => setStep(step - 1);

    const handleNext = () => setStep(step + 1);

    const submitForm = async (data) => {
        try {
            const { name, email, password, username, dob } = data;

            const userData = await authService.createAccount({
                name,
                email,
                password,
            });

            const [loginData, userId] = userData;

            const avatarFile = await profileMediaService.uploadFile(
                data.avatar[0]
            );

            if (loginData) {
                // has to dispatch in store user Profile data after profile document creation
                const avatar = avatarFile.$id;
                const profileData = await profileService.createProfile({
                    userId,
                    username,
                    email,
                    name,
                    dob,
                    avatar,
                });
                dispatch(login(loginData));
            }
        } catch (error) {
            console.log("Error inside Entry: ", error);
        }
    };

    return (
        <div>
            <p>X-Logo</p>
            <h1>Happening Now</h1>
            <h6>Join Today</h6>

            <p>google SSO</p>
            <p>Apple SSO</p>

            <hr />

            <div className="border-red-400">
                <button
                    className="bg-blue-600"
                    onClick={() => setIsOpenSignup(true)}
                >
                    Create Account
                </button>
                <Modal
                    isOpen={isOpenSignup}
                    onClose={() => {
                        setIsOpenSignup(false);
                        setStep(1);
                    }}
                >
                    <form onSubmit={handleSubmit(submitForm)}>
                        {step === 1 && (
                            <Step1 register={register} onNext={handleNext} />
                        )}

                        {step === 2 && (
                            <Step2 register={register} onBack={handleBack} />
                        )}
                    </form>
                </Modal>
            </div>
            <div className="border-blue-400">
                <p>Already have Account?</p>

                <button
                    className="bg-blue-600"
                    onClick={() => setIsOpenLogin(true)}
                >
                    Signin
                </button>
                <Modal
                    isOpen={isOpenLogin}
                    onClose={() => setIsOpenLogin(false)}
                >
                    <Login />
                </Modal>
            </div>
        </div>
    );
}

export default Entry;
