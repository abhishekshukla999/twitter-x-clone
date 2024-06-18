import { Login, Signup } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import authService from "./appwrite/auth/auth";
import { useEffect, useState } from "react";
import { Entry, Modal } from "./components";

function App() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.auth.status);

    useEffect(() => {
        authService.getCurrentUser().then((userData) => {
            if (userData) {
                dispatch(login({ userData }));
            } else {
                dispatch(logout());
            }
        });
    }, []);

    const authLogout = () => {
        authService.logout().then(() => dispatch(logout()));
    };

    return (
        <>
            <div className="bg-gray-400 h-screen text-center">
                <h1>Twitter App</h1>

                <Entry />

                {status && <button onClick={authLogout}>Logout</button>}
                {}
            </div>
        </>
    );
}

export default App;
