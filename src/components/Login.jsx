import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth/auth";
import { login as authLogin } from "../features/auth/authSlice";

function Login() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const login = async (data) => {
        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin({ userData }));
                }
            }
        } catch (error) {
            console.log("Error in login", error);
        }
    };

    return (
        <div>
            <p>Login</p>
            <form onSubmit={handleSubmit(login)}>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;
