import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import {
    Bookmarks,
    Communities,
    Explore,
    Grok,
    Home,
    Lists,
    Messages,
    Notifications,
    Premium,
    Profile,
    Settings,
    VerifiedOrgs,
    SignUp,
} from "./pages";
import {
    Followers,
    Following,
    Likes,
    Media,
    Posts,
    Replies,
} from "./components";
import Protected from "./components/Protected.jsx";
import PostPage from "./pages/PostPage.jsx";

const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/home",
                element: (
                    <Protected authentication={false}>
                        <Home />
                    </Protected>
                ),
            },
            {
                path: "/:username",
                element: (
                    <Protected authentication={false}>
                        <Profile />
                    </Protected>
                ),
                children: [
                    {
                        index: true,
                        element: <Posts />,
                    },
                    {
                        path: "with_replies",
                        element: <Replies />,
                    },
                    {
                        path: "media",
                        element: <Media />,
                    },
                    {
                        path: "likes",
                        element: <Likes />,
                    },
                ],
            },
            {
                path: "/:username/following",
                element: <Following />,
            },
            {
                path: "/:username/followers",
                element: <Followers />,
            },
            {
                path: "/explore",
                element: (
                    <Protected authentication={false}>
                        <Explore />
                    </Protected>
                ),
            },
            {
                path: "/notifications",
                element: (
                    <Protected authentication={false}>
                        <Notifications />
                    </Protected>
                ),
            },
            {
                path: "/messages",
                element: (
                    <Protected authentication={false}>
                        <Messages />
                    </Protected>
                ),
            },
            {
                path: "/grok",
                element: (
                    <Protected authentication={false}>
                        <Grok />
                    </Protected>
                ),
            },
            {
                path: "/lists",
                element: (
                    <Protected authentication={false}>
                        <Lists />
                    </Protected>
                ),
            },
            {
                path: "/bookmarks",
                element: (
                    <Protected authentication={false}>
                        <Bookmarks />
                    </Protected>
                ),
            },
            {
                path: "/communities",
                element: (
                    <Protected authentication={false}>
                        <Communities />
                    </Protected>
                ),
            },
            {
                path: "/premium",
                element: (
                    <Protected authentication={false}>
                        <Premium />
                    </Protected>
                ),
            },
            {
                path: "/verified-orgs",
                element: (
                    <Protected authentication={false}>
                        <VerifiedOrgs />
                    </Protected>
                ),
            },
            {
                path: "/settings",
                element: (
                    <Protected authentication={false}>
                        <Settings />
                    </Protected>
                ),
            },
            {
                path: "/:username/status/:tweetId",
                element: (
                    <Protected authentication={false}>
                        <PostPage />
                    </Protected>
                ),
            },
        ],
    },

    {
        path: "/signup",
        element: (
            <Protected authentication>
                <SignUp />
            </Protected>
        ),
    },
]);

export default router;
