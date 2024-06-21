import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileService, profileMediaService } from "../../appwrite";
import { login } from "../../features/auth/authSlice";

function Profile() {
    const userData = useSelector((state) => state.auth.profileData);
    const dispatch = useDispatch();

    useEffect(() => {
        profileService
            .getProfile(userData?.$id)
            .then((profileData) => dispatch(login({ profileData })));
    }, []);

    return (
        <>
            <div className="bg-emerald-300 h-screen text-center">
                <h1>Profile</h1>
                <p>{`userId: ${userData?.$id}`}</p>
                <p>{`username: ${userData?.username}`}</p>
                <p>{`name: ${userData?.name}`}</p>
                <p>{`email: ${userData?.email}`}</p>
            </div>
        </>
    );
}

export default Profile;
