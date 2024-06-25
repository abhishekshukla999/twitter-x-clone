import { useSelector } from "react-redux";

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
