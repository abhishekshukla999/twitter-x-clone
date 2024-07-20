import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import {
    addProfileData,
    removeProfileData,
} from "./features/profile/profileSlice";
import { authService, profileService } from "./appwrite";
import { useEffect } from "react";
import { Root, Header } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import { removeTweets } from "./features/tweet/tweetSlice";
import { removeOtherProfile } from "./features/profile/otherProfileSlice";
import { removeBookmarks } from "./features/bookmark/bookmarkSlice";
import { removeLikes } from "./features/like/likeSlice";
import { removeTweetPageData } from "./features/tweet/tweetPageSlice";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector((state) => state.auth.status);

    useEffect(() => {
        authService.getCurrentUser().then((userData) => {
            if (userData) {
                dispatch(login({ userData }));

                profileService.getProfile(userData.$id).then((profileData) => {
                    if (profileData) {
                        dispatch(addProfileData({ profileData }));
                    }
                    // navigate("/home")
                });
            } else {
                dispatch(logout());
                dispatch(removeProfileData());
                dispatch(removeTweets());
                dispatch(removeOtherProfile());
                dispatch(removeBookmarks());
                dispatch(removeLikes());
                dispatch(removeTweetPageData());
            }
        });
    }, [navigate, dispatch]);

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
