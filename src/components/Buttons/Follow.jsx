import { useEffect, useState } from "react";
import { followService, profileService } from "../../appwrite";
import { Query } from "appwrite";

function Follow({ followerId, followingId }) {
    const [isFollowing, setIsFollowing] = useState(null);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const myFollow = await followService.getFollows([
                    Query.and([
                        Query.equal("followingId", [followingId]),
                        Query.equal("followerId", followerId),
                    ]),
                ]);

                if (myFollow.documents.length !== 0) {
                    setIsFollowing(myFollow.documents["0"]);
                }
            } catch (error) {
                console.log("Error fetching follow :: ", error);
            }
        };

        fetchFollowing();
    }, [followerId, followingId]);

    const handleFollow = async () => {
        if (isFollowing) {
            try {
                const deleted = await followService.deleteFollow(
                    isFollowing?.$id
                );

                if (deleted) {
                    setIsFollowing(null);

                    const followingData = await profileService.getProfile(
                        followingId
                    );

                    await profileService.updateProfile(followingId, {
                        followers: Math.max(
                            (followingData.followers ?? 0) - 1,
                            0
                        ),
                    });

                    const followerData = await profileService.getProfile(
                        followerId
                    );

                    await profileService.updateProfile(followerId, {
                        following: Math.max(
                            (followerData.following ?? 0) - 1,
                            0
                        ),
                    });
                }
            } catch (error) {
                console.log("Error deleting follow :: ", error);
            }
        } else {
            try {
                const myFollow = await followService.createFollow({
                    followerId,
                    followingId,
                });

                if (myFollow) {
                    setIsFollowing(myFollow);

                    const followingData = await profileService.getProfile(
                        followingId
                    );

                    await profileService.updateProfile(followingId, {
                        followers: (followingData.followers ?? 0) + 1,
                    });

                    const followerData = await profileService.getProfile(
                        followerId
                    );

                    await profileService.updateProfile(followerId, {
                        following: (followerData.following ?? 0) + 1,
                    });
                }
            } catch (error) {
                console.log("Error creating follow :: ", error);
            }
        }
    };

    return isFollowing ? (
        <button
            className={`p-1.5 px-4 font-bold text-[15px] border ${
                hover
                    ? "text-red-600 bg-red-100 border-red-300"
                    : "text-black bg-white border-gray-300 "
            } rounded-full`}
            onClick={handleFollow}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            {hover ? "Unfollow" : "Following"}
        </button>
    ) : (
        <button
            className="p-1.5 px-4 font-bold text-[15px] border text-white bg-black border-zinc-300 rounded-full"
            onClick={handleFollow}
        >
            Follow
        </button>
    );
}

export default Follow;
