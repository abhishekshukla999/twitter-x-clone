import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store.js";
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
import Protected from "./components/Protected.jsx";

const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/home",
                element: (
                    <Protected authentication={false} url="home">
                        <Home />
                    </Protected>
                ),
            },
            {
                path: "/profile",
                element: (
                    <Protected authentication={false} url="profile">
                        <Profile />
                    </Protected>
                ),
            },
            {
                path: "/explore",
                element: (
                    <Protected authentication={false} url="explore">
                        <Explore />
                    </Protected>
                ),
            },
            {
                path: "/notifications",
                element: (
                    <Protected authentication={false} url="notifications">
                        <Notifications />
                    </Protected>
                ),
            },
            {
                path: "/messages",
                element: (
                    <Protected authentication={false} url="messages">
                        <Messages />
                    </Protected>
                ),
            },
            {
                path: "/grok",
                element: (
                    <Protected authentication={false} url="grok">
                        <Grok />
                    </Protected>
                ),
            },
            {
                path: "/lists",
                element: (
                    <Protected authentication={false} url="lists">
                        <Lists />
                    </Protected>
                ),
            },
            {
                path: "/bookmarks",
                element: (
                    <Protected authentication={false} url="bookmarks">
                        <Bookmarks />
                    </Protected>
                ),
            },
            {
                path: "/communities",
                element: (
                    <Protected authentication={false} url="communities">
                        <Communities />
                    </Protected>
                ),
            },
            {
                path: "/premium",
                element: (
                    <Protected authentication={false} url="premium">
                        <Premium />
                    </Protected>
                ),
            },
            {
                path: "/verified-orgs",
                element: (
                    <Protected authentication={false} url="verified-orgs">
                        <VerifiedOrgs />
                    </Protected>
                ),
            },
            {
                path: "/settings",
                element: (
                    <Protected authentication={false} url="settings">
                        <Settings />
                    </Protected>
                ),
            },
        ],
    },

    {
        path: "/signup",
        element: (
            <Protected authentication url="signup">
                <SignUp />
            </Protected>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
