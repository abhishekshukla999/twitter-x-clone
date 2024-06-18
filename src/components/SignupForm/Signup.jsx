import React from "react";
import authService from "../../appwrite/auth/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";

function Signup({}) {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const createUser = async (data) => {
        try {
            console.log(data);
            const userData = await authService.createAccount(data);
            if (userData) {
                dispatch(login(userData));
            }
        } catch (error) {
            console.log("Error in sign up", error);
        }
    };
    return (
        <div>
            <p>Signup</p>
            <form onSubmit={handleSubmit(createUser)}>
                <input type="text" placeholder="Name" {...register("name")} />
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                />
                <button className="bg-blue-600" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Signup;
