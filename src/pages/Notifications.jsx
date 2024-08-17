import { Feed, Aside, Notifications as UserNotifications } from "../components";

function Notifications() {
    document.title = "Notifications / X";

    return (
        <>
            <Feed>
                <UserNotifications />
            </Feed>

            <Aside />
        </>
    );
}

export default Notifications;
