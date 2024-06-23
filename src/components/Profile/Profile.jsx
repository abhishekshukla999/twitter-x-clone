import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileService, profileMediaService } from "../../appwrite";
import { addProfileData, removeProfileData } from "../../features/profile/profileSlice";

function Profile() {
    const profileData = useSelector((state) => state.profile.profileData);

    return (
        <>
            <div className="bg-emerald-300 h-screen text-center">
                <h1>Profile</h1>
                <p>{`userId: ${profileData?.$id}`}</p>
                <p>{`username: ${profileData?.username}`}</p>
                <p>{`name: ${profileData?.name}`}</p>
                <p>{`email: ${profileData?.email}`}</p>
            </div>
        </>
    );
}

export default Profile;
