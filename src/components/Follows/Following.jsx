import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import Feed from "../Containers/Feed";
import Aside from "../Containers/Aside";
import { useDispatch, useSelector } from "react-redux";
import { followService, profileService } from "../../appwrite";
import { Query } from "appwrite";
import { addFollowData, removeFollowData } from "../../features/follow/follow";
import { Loader, ActionsCard } from "../index";

function Following() {
    const { username } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const followsData = useSelector((state) => state.follows);
    const [usernameData, setUsernameData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const usernameData = await profileService.getProfiles([
                    Query.equal("username", [username]),
                ]);

                if (usernameData.documents.length !== 0) {
                    setUsernameData(usernameData.documents["0"]);
                    const userId = usernameData.documents["0"].$id;

                    const allFollowing = await followService.getFollows([
                        Query.equal("followerId", [userId]),
                    ]);

                    const allFollowingIds = allFollowing.documents.map(
                        (follow) => follow.followingId
                    );

                    const allFollowingData = await profileService.getProfiles([
                        Query.equal("$id", allFollowingIds),
                    ]);

                    const updatedFollowingData = [
                        ...allFollowingData.documents,
                    ];

                    dispatch(
                        addFollowData({
                            ...followsData,
                            followingData: updatedFollowingData,
                        })
                    );
                }
            } catch (error) {
                console.log("Error fetching following :: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowing();

        return () => {
            dispatch(removeFollowData());
        };
    }, [dispatch, username]);

    return (
        <>
            <Feed>
                <div>
                    <div className="top flex px-2 sticky top-0 backdrop-blur-[400px] opacity-[100%] border border-t-0 border-b-0">
                        <NavLink
                            className="left my-auto p-3 hover:bg-gray-200 rounded-full"
                            onClick={() => navigate(-1)}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-5 m-auto r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                            >
                                <g>
                                    <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                                </g>
                            </svg>
                        </NavLink>

                        <div className="right ml-4">
                            <p className="font-bold text-xl">
                                {usernameData?.name || ""}
                            </p>
                            <p className="text-[13px] font-light">
                                {usernameData?.username || ""}
                            </p>
                        </div>
                    </div>
                    <div className="top flex top-0 backdrop-blur-3xl opacity-80 border-b border-b-zinc-200">
                        <NavLink
                            to={`/${username}/following`}
                            className={`left w-1/2 px-3 flex justify-center font-bold text-base hover:bg-gray-300`}
                        >
                            <div className="py-4 text-black border-b-4 border-twitter-blue">
                                Following
                            </div>
                        </NavLink>
                        <NavLink
                            to={`/${username}/followers`}
                            className={`left w-1/2 px-3 flex justify-center font-bold text-base hover:bg-gray-300`}
                        >
                            <div className="py-4 text-gray-600">Followers</div>
                        </NavLink>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : followsData?.followingData.length === 0 ? (
                        <div className="text-center font-bold p-5">
                            @{usernameData?.username} has no followers
                        </div>
                    ) : (
                        followsData?.followingData.map((user) => (
                            <ActionsCard
                                key={user.$id}
                                name={user.name}
                                username={user.username}
                                media={user.avatar}
                            />
                        ))
                    )}
                </div>
            </Feed>
            <Aside />
        </>
    );
}

export default Following;
