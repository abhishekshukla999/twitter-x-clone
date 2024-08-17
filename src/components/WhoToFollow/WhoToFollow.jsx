import { ContentLoader, FollowCard } from "../index";
import { useEffect, useState } from "react";
import { profileService } from "../../appwrite";
import { Query } from "appwrite";

function WhoToFollow() {
    const [followUsersData, setFollowUsersData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe = false;

        if (!unsubscribe) {
            profileService
                .getProfiles([Query.limit(3), Query.orderDesc("$createdAt")])
                .then((res) => setFollowUsersData(res.documents))
                .catch((err) =>
                    console.log("Error fetching who to follow :: ", err)
                )
                .finally(() => setLoading(false));
        }

        return () => {
            unsubscribe = true;
        };
    }, []);
    return (
        <div className="mt-6 border border-zinc-200 dark:border-gray-800 dim:border-gray-800 rounded-xl">
            <h1 className="m-3 font-bold text-xl">Who to follow</h1>
            {loading ? (
                <ContentLoader />
            ) : (
                followUsersData.map((user) => (
                    <FollowCard
                        key={user.$id}
                        name={user.name}
                        username={user.username}
                        avatar={user.avatar}
                        userId={user.$id}
                    />
                ))
            )}
        </div>
    );
}

export default WhoToFollow;
