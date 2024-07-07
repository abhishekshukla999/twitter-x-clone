import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import { addProfileData } from "./features/profile/profileSlice";
import { authService, profileService } from "./appwrite";
import { useEffect } from "react";
import { Root, Header } from "./components";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector((state) => state.auth.status);

    useEffect(() => {
        authService.getCurrentUser().then((userData) => {
            if (userData) {
                dispatch(login({ userData }));

                profileService.getProfile(userData.$id).then((profileData) => {
                    dispatch(addProfileData({ profileData }));
                    navigate("/home")
                });
            } else {
                dispatch(logout());
            }
        });
    }, [navigate, dispatch, status]);

    if (!status) return <Root />;

    return (
        <>
            <div className="flex w-screen h-screen m-0 p-0 font-sans">
                <Header />

                <main className="flex gap-8 w-full mx-auto overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default App;
