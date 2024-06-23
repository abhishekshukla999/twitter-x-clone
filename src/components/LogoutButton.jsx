import React from "react";
import { authService } from "../appwrite";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { removeProfileData } from "../features/profile/profileSlice";

function LogoutButton() {
    const dispatch = useDispatch();

    const authLogout = () => {
        authService.logout().then(() => {
            dispatch(logout());
            dispatch(removeProfileData());
        });
    };

    return (
        <div>
            <button onClick={authLogout}>Logout</button>
        </div>
    );
}

export default LogoutButton;
