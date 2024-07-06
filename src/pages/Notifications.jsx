import React from "react";
import { Feed, Aside, Notifications as UserNotifications } from "../components";

function Notifications() {
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
