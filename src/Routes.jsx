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
    PushNotifications,
    Replies,
    UsernameChange,
    WelcomeUser,
    YourAccount,
} from "./components";
import Protected from "./components/Protected.jsx";
import PostPage from "./pages/PostPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <WelcomeUser />,
            },
            {
                path: "home",
                element: (
                    <Protected authentication={false}>
                        <Home />
                    </Protected>
                ),
            },
            {
                path: ":username",
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
                path: ":username/following",
                element: <Following />,
            },
            {
                path: ":username/followers",
                element: <Followers />,
            },
            {
                path: "explore",
                element: (
                    <Protected authentication={false}>
                        <Explore />
                    </Protected>
                ),
            },
            {
                path: "notifications",
                element: (
                    <Protected authentication={false}>
                        <Notifications />
                    </Protected>
                ),
            },
            {
                path: "messages",
                element: (
                    <Protected authentication={false}>
                        <Messages />
                    </Protected>
                ),
            },
            {
                path: "grok",
                element: (
                    <Protected authentication={false}>
                        <Grok />
                    </Protected>
                ),
            },
            {
                path: "lists",
                element: (
                    <Protected authentication={false}>
                        <Lists />
                    </Protected>
                ),
            },
            {
                path: "bookmarks",
                element: (
                    <Protected authentication={false}>
                        <Bookmarks />
                    </Protected>
                ),
            },
            {
                path: "communities",
                element: (
                    <Protected authentication={false}>
                        <Communities />
                    </Protected>
                ),
            },
            {
                path: "premium",
                element: (
                    <Protected authentication={false}>
                        <Premium />
                    </Protected>
                ),
            },
            {
                path: "/checkout",
                element: (
                    <Protected authentication={false}>
                        <Payment />
                    </Protected>
                ),
            },
            {
                path: "verified-orgs",
                element: (
                    <Protected authentication={false}>
                        <VerifiedOrgs />
                    </Protected>
                ),
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
            },
            {
                path: ":username/status/:tweetId",
                element: (
                    <Protected authentication={false}>
                        <PostPage />
                    </Protected>
                ),
            },
        ],
    },
]);

export default router;
