import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import Feed from "../Containers/Feed";
import Aside from "../Containers/Aside";
import { followService, profileService } from "../../appwrite";
import { useDispatch, useSelector } from "react-redux";
import { Query } from "appwrite";
import { addFollowData, removeFollowData } from "../../features/follow/follow";
import { Loader, ActionsCard } from "../index";

function Followers() {
    const { username } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const followsData = useSelector((state) => state.follows);
    const [usernameData, setUsernameData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const usernameData = await profileService.getProfiles([
                    Query.equal("username", [username]),
                ]);

                if (usernameData.documents.length !== 0) {
                    setUsernameData(usernameData.documents["0"]);
                    const userId = usernameData.documents["0"].$id;

                    const allFollowers = await followService.getFollows([
                        Query.equal("followingId", [userId]),
                    ]);

                    const allFollowerIds = allFollowers.documents.map(
                        (follow) => follow.followerId
                    );

                    const allFollowersData = await profileService.getProfiles([
                        Query.equal("$id", allFollowerIds),
                    ]);

                    const updatedFollowersData = [
                        ...allFollowersData.documents,
                    ];

                    dispatch(
                        addFollowData({
                            ...followsData,
                            followersData: updatedFollowersData,
                        })
                    );
                }
            } catch (error) {
                console.log("Error fetching followers :: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowers();

        return () => {
            dispatch(removeFollowData());
        };
    }, [dispatch, username]);

    return (
        <>
            <Feed>
                <div>
                    <div className="top flex px-2 sticky top-0 backdrop-blur-[400px] opacity-[100%] border border-t-0 border-b-0 dark:border-gray-800 dim:border-gray-800">
                        <NavLink
                            className="left my-auto p-3 hover:bg-gray-200 dark:hover:bg-slate-800 dim:hover:bg-slate-700 rounded-full"
                            onClick={() => navigate(-1)}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-5 dark:fill-white dim:fill-white m-auto r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
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
                            <div className="py-4 text-gray-600">Following</div>
                        </NavLink>
                        <NavLink
                            to={`/${username}/followers`}
                            className={`left w-1/2 px-3 flex justify-center font-bold text-base hover:bg-gray-300`}
                        >
                            <div className="py-4 text-black border-b-4 border-twitter-blue">
                                Followers
                            </div>
                        </NavLink>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : followsData?.followersData.length === 0 ? (
                        <div className="text-center font-bold p-5">
                            @{usernameData?.username} has no followers
                        </div>
                    ) : (
                        <div className="mx-2">
                            {followsData?.followersData.map((user) => (
                                <ActionsCard
                                    key={user.$id}
                                    name={user.name}
                                    username={user.username}
                                    media={user.avatar}
                                    userId={user.$id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </Feed>
            <Aside />
        </>
    );
}

export default Followers;
