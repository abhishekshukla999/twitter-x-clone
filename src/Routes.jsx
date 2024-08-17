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
    PostPage,
    Premium,
    Profile,
    Settings,
    VerifiedOrgs,
} from "./pages";
import {
    Accessibilities,
    Accessibility,
    AccountInformation,
    Age,
    ChangePassword,
    CountryChange,
    DeactivateAccount,
    Display,
    EmailChange,
    EmailNotifications,
    Error,
    Followers,
    Following,
    Gender,
    Likes,
    Media,
    MutedNotifications,
    NotificationFilters,
    NotificationPreferences,
    NotificationSetting,
    Payment,
    PhoneChange,
    Posts,
    Protected,
    PushNotifications,
    Replies,
    UsernameChange,
    WelcomeUser,
    YourAccount,
} from "./components";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <WelcomeUser />,
                errorElement: <Error />,
            },
            {
                path: "home",
                element: (
                    <Protected authentication={false}>
                        <Home />
                    </Protected>
                ),
                errorElement: <Error />,
            },
            {
                path: ":username",
                element: (
                    <Protected authentication={false}>
                        <Profile />
                    </Protected>
                ),
                errorElement: <Error />,
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
                path: ":username/following",
                element: <Following />,
                errorElement: <Error />,
            },
            {
                path: ":username/followers",
                element: <Followers />,
                errorElement: <Error />,
            },
            {
                path: "explore",
                element: (
                    <Protected authentication={false}>
                        <Explore />
                    </Protected>
                ),
                errorElement: <Error />,
            },
            {
                path: "notifications",
                element: (
                    <Protected authentication={false}>
                        <Notifications />
                    </Protected>
                ),
                errorElement: <Error />,
            },
            {
                path: "messages",
                element: (
                    <Protected authentication={false}>
                        <Messages />
                    </Protected>
                ),
                errorElement: <Error />,
            },
            {
                path: "grok",
                element: (
                    <Protected authentication={false}>
                        <Grok />
                    </Protected>
                ),
                errorElement: <Error />,
            },
            {
                path: "lists",
                element: (
                    <Protected authentication={false}>
                        <Lists />
                    </Protected>
                ),
                errorElement: <Error />,
            },
            {
                path: "bookmarks",
                element: (
                    <Protected authentication={false}>
                        <Bookmarks />
                    </Protected>
                ),
                errorElement: <Error />,
            },
            {
                path: "communities",
                element: (
                    <Protected authentication={false}>
                        <Communities />
                    </Protected>
                ),
                errorElement: <Error />,
            },
            {
                path: "premium",
                element: (
                    <Protected authentication={false}>
                        <Premium />
                    </Protected>
                ),
                errorElement: <Error />,
            },
            {
                path: "/checkout",
                element: (
                    <Protected authentication={false}>
                        <Payment />
                    </Protected>
                ),
                errorElement: <Error />,
            },
            {
                path: "verified-orgs",
                element: (
                    <Protected authentication={false}>
                        <VerifiedOrgs />
                    </Protected>
                ),
                errorElement: <Error />,
            },
            {
                path: "settings",
                element: (
                    <Protected authentication={false}>
                        <Settings />
                    </Protected>
                ),
                children: [
                    {
                        path: "account",
                        element: <YourAccount />,
                    },
                    {
                        path: "your_twitter_data/account",
                        element: <AccountInformation />,
                    },
                    {
                        path: "screen_name",
                        element: <UsernameChange />,
                    },
                    {
                        path: "phone",
                        element: <PhoneChange />,
                    },
                    {
                        path: "email",
                        element: <EmailChange />,
                    },
                    {
                        path: "country",
                        element: <CountryChange />,
                    },
                    {
                        path: "your_twitter_data/gender",
                        element: <Gender />,
                    },
                    {
                        path: "your_twitter_data/age",
                        element: <Age />,
                    },
                    {
                        path: "password",
                        element: <ChangePassword />,
                    },
                    {
                        path: "deactivate",
                        element: <DeactivateAccount />,
                    },
                    {
                        path: "notifications",
                        element: <NotificationSetting />,
                    },
                    {
                        path: "notifications/filters",
                        element: <NotificationFilters />,
                    },
                    {
                        path: "notifications/advanced_filters",
                        element: <MutedNotifications />,
                    },
                    {
                        path: "notifications/preferences",
                        element: <NotificationPreferences />,
                    },
                    {
                        path: "push_notifications",
                        element: <PushNotifications />,
                    },
                    {
                        path: "email_notifications",
                        element: <EmailNotifications />,
                    },
                    {
                        path: "accessibility_display_and_languages",
                        element: <Accessibilities />,
                    },
                    {
                        path: "accessibility",
                        element: <Accessibility />,
                    },
                    {
                        path: "display",
                        element: <Display />,
                    },
                ],
                errorElement: <Error />,
            },
            {
                path: ":username/status/:tweetId",
                element: (
                    <Protected authentication={false}>
                        <PostPage />
                    </Protected>
                ),
                errorElement: <Error />,
            },
        ],
    },
]);

export default router;
