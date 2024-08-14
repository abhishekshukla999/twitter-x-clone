import { useEffect, useState } from "react";
import { followService, profileService } from "../../appwrite";
import { Query } from "appwrite";

function FollowTweet({ followerId, followingId, username }) {
    const [isFollowing, setIsFollowing] = useState(null);

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
            className="flex gap-2 mr-5 text-base font-bold px-5 py-1 hover:bg-gray-200 dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg dark:hover:bg-slate-800 dim:hover:bg-slate-700 w-full"
            onClick={(e) => {
                e.stopPropagation();
                handleFollow();
            }}
        >
            <span className="my-auto">
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-5 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-1q142lx"
                >
                    <g>
                        <path d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm12.586 3l-2.043-2.04 1.414-1.42L20 7.59l2.043-2.05 1.414 1.42L21.414 9l2.043 2.04-1.414 1.42L20 10.41l-2.043 2.05-1.414-1.42L18.586 9zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"></path>
                    </g>
                </svg>
            </span>
            <span>Unfollow @{username}</span>
        </button>
    ) : (
        <button
            className="flex gap-2 mr-5 text-base font-bold px-5 py-1 hover:bg-gray-200 dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg dark:hover:bg-slate-800 dim:hover:bg-slate-700 w-full"
            onClick={(e) => {
                e.stopPropagation();
                handleFollow();
            }}
        >
            <span>
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-5 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-1q142lx"
                >
                    <g>
                        <path d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm13 4v3h2v-3h3V8h-3V5h-2v3h-3v2h3zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"></path>
                    </g>
                </svg>
            </span>
            <span>Follow @{username}</span>
        </button>
    );
}

export default FollowTweet;
