import React from "react";
import { authService } from "../appwrite";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function LogoutButton() {
    const dispatch = useDispatch();

    const authLogout = () => {
        authService.logout().then(() => dispatch(logout()));
    };

    return (
        <div>
            <button onClick={authLogout}>Logout</button>
        </div>
    );
}

export default LogoutButton;
