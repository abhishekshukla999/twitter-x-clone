import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import { addProfileData } from "./features/profile/profileSlice";
import { authService, profileService } from "./appwrite";
import { useEffect } from "react";
import { Entry, LogoutButton } from "./components";
import { Link, Outlet } from "react-router-dom";

function App() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.auth.status);

    useEffect(() => {
        authService.getCurrentUser().then((userData) => {
            if (userData) {
                dispatch(login({ userData }));

                profileService
                    .getProfile(userData.$id)
                    .then((profileData) => dispatch(addProfileData({ profileData })));
            } else {
                dispatch(logout());
            }
        });
    }, []);

    return (
        <>
            <div className="bg-gray-400 h-screen text-center">
                <h1>Twitter App</h1>

                <Entry />
                {status && <LogoutButton />}

                <Link to="/profile">Profile</Link>
                <Link to="/">Home</Link>
                <Outlet />
            </div>
        </>
    );
}

export default App;
