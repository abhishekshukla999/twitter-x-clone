import { useSelector } from "react-redux";
import { Aside, Feed } from "../components";
import { Profile as UserProfile } from "../components";
import { useParams } from "react-router-dom";

function Profile() {
    const { username } = useParams();
    const profileData = useSelector((state) => state.profile);
    document.title = `${profileData.name} (@${profileData.username}) / X`;

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
