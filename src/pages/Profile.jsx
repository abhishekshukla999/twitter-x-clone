import React from "react";
import { Aside, Feed } from "../components";
import { Profile as UserProfile } from "../components";

function Profile() {
    return (
        <>
            <Feed>
                <UserProfile />
            </Feed>

            <Aside />
        </>
    );
}

export default Profile;
