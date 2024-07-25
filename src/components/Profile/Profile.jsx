import { useState } from "react";
import UserInfo from "./UserInfo";
import { Outlet } from "react-router-dom";
import NoUser from "./NoUser";

function Profile({ username }) {
    const [status, setStatus] = useState("user");

    if (status === "nouser") return <NoUser username={username} />;

    return (
        <div>
            <UserInfo username={username} setStatus={setStatus} />

            <Outlet />
        </div>
    );
}

export default Profile;
