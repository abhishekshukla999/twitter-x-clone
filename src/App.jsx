import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import {
    addProfileData,
    removeProfileData,
} from "./features/profile/profileSlice";
import { authService, profileService } from "./appwrite";
import { useEffect, useState } from "react";
import { Root, Header } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import { removeTweets } from "./features/tweet/tweetSlice";
import { removeOtherProfile } from "./features/profile/otherProfileSlice";
import { removeBookmarks } from "./features/bookmark/bookmarkSlice";
import { removeLikes } from "./features/like/likeSlice";
import { removeTweetPageData } from "./features/tweet/tweetPageSlice";
import { removeFollowData } from "./features/follow/follow";
import { Toaster } from "sonner";
import { removeMedia } from "./features/media/mediaSlice";
import { removeReplies } from "./features/replies/replySlice";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector((state) => state.auth.status);
    const [currentColor, setCurrentColor] = useState(
        localStorage.getItem("color") || "default"
    );
    const [currentTheme, setCurrentTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));

                    profileService
                        .getProfile(userData.$id)
                        .then((profileData) => {
                            if (profileData) {
                                dispatch(addProfileData({ ...profileData }));
                            }
                        })
                        .catch((error) => {
                            console.log(
                                "Error fetching profile data :: ",
                                error
                            );
                        });
                } else {
                    dispatch(logout());
                    dispatch(removeProfileData());
                    dispatch(removeTweets());
                    dispatch(removeOtherProfile());
                    dispatch(removeBookmarks());
                    dispatch(removeLikes());
                    dispatch(removeTweetPageData());
                    dispatch(removeFollowData());
                    dispatch(removeMedia());
                    dispatch(removeReplies());
                }
            })
            .catch((error) => {
                console.log("Error fetching authentication data :: ", error);
            });
    }, [navigate, dispatch, status]);

    useEffect(() => {
        const html = document.querySelector("html");

        // theme
        html.classList.remove("light", "dim", "dark");

        if (currentTheme) {
            html.classList.add(currentTheme);
            localStorage.setItem("theme", currentTheme);
        } else {
            const defaultTheme = "light";
            html.classList.add(defaultTheme);
            setCurrentTheme(defaultTheme);
            localStorage("theme", defaultTheme);
        }

        // color
        html.classList.remove(
            "default",
            "yellow",
            "crimson",
            "purple",
            "orange",
            "green"
        );

        if (currentColor) {
            html.classList.add(currentColor);
            localStorage.setItem("color", currentColor);
        } else {
            const defaultColor = "default";
            html.classList.add(defaultColor);
            setCurrentColor(defaultColor);
            localStorage.setItem("color", defaultColor);
        }
    }, [currentColor, currentTheme]);

    if (!status) return <Root />;

    return (
        <>
            <div className="flex w-screen h-screen m-0 p-0 font-sans">
                <Header />

                <main className="flex gap-8 w-full mx-auto overflow-y-auto">
                    <Outlet />

                    <Toaster
                        position="bottom-center"
                        closeButton={true}
                        richColors
                    />
                </main>
            </div>
        </>
    );
}

export default App;
