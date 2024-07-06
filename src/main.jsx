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

const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/explore",
                element: <Explore />,
            },
            {
                path: "/notifications",
                element: <Notifications />,
            },
            {
                path: "/messages",
                element: <Messages />,
            },
            {
                path: "/grok",
                element: <Grok />,
            },
            {
                path: "/lists",
                element: <Lists />,
            },
            {
                path: "/bookmarks",
                element: <Bookmarks />,
            },
            {
                path: "/communities",
                element: <Communities />,
            },
            {
                path: "/premium",
                element: <Premium />,
            },
            {
                path: "/verified-orgs",
                element: <VerifiedOrgs />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
        ],
    },

    {
        path: "/signup",
        element: <SignUp />,
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
