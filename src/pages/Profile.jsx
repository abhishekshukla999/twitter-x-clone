import React from "react";
import { Aside, Feed } from "../components";
import { Profile as UserProfile } from "../components";
import { useParams } from "react-router-dom";

function Profile() {
    const { username } = useParams();

    return (
        <>
            <Feed>
                <UserProfile username={username} />
            </Feed>

            <Aside />
        </>
    );
}

export default Profile;
