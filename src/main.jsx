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

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
