import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    EditProfileModal,
    Likes,
    Loader,
    Posts,
    TweetCard,
    Media,
    Replies,
} from "../index";
import {
    profileMediaService,
    profileService,
    tweetService,
} from "../../appwrite";
import { addTweets, removeTweets } from "../../features/tweet/tweetSlice";
import {
    addOtherProfile,
    removeOtherProfile,
} from "../../features/profile/otherProfileSlice";
import { Query } from "appwrite";

function Profile({ username }) {
    const [tweetLoading, setTweetLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(true);
    const otherProfileData = useSelector((state) => state.otherProfile);
    const tweetsData = useSelector((state) => state.tweets);
    const authId = useSelector((state) => state.auth.userData.$id);
    const dispatch = useDispatch();
    const [isProfileEdit, setIsProfileEdit] = useState(false);
    const [currProfileCompo, setCurrProfileCompo] = useState("posts");
    const { tweets, followers, following } = otherProfileData;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const currentProfileData = await profileService.getProfiles([
                    Query.equal("username", [username]),
                ]);

                // console.log(currentProfileData);
                if (currentProfileData.documents.length !== 0) {
                    const currentProfile = currentProfileData.documents["0"];

                    // console.log(currentProfile);

                    const postCount = await tweetService.getTweets([
                        Query.equal("author", [currentProfile.$id]),
                    ]);

                    dispatch(
                        addOtherProfile({
                            data: currentProfile,
                            tweets: postCount.documents.length,
                            followers: 0,
                            following: 0,
                        })
                    );
                } else {
                    dispatch(removeOtherProfile());
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setProfileLoading(false);
            }
        };

        const fetchData = async () => {
            await fetchProfile();
        };

        fetchData();
    }, [dispatch, username, tweets, followers, following]);

    useEffect(() => {
        if (!otherProfileData.data?.$id) return;

        const fetchTweets = async () => {
            try {
                const tweetsCollectionData = await tweetService.getTweets([
                    Query.equal("author", [otherProfileData.data?.$id]),
                    Query.orderDesc("$createdAt"),
                ]);

                // console.log(tweetsCollection.documents);

                if (tweetsCollectionData.documents.length !== 0) {
                    const tweetsCollection = tweetsCollectionData.documents.map(
                        (tweet) => {
                            return {
                                data: tweet,
                                likes: 0,
                                replies: 0,
                                retweets: 0,
                                bookmarks: 0,
                            };
                        }
                    );

                    // console.log(tweetsCollection);

                    dispatch(addTweets(tweetsCollection));
                } else {
                    dispatch(removeTweets());
                }
            } catch (error) {
                console.error("Error fetching tweets:", error);
            } finally {
                setTweetLoading(false);
            }
        };

        fetchTweets();
    }, [
        dispatch,
        username,
        otherProfileData.data?.$id,
        tweetsData?.length,
        tweets,
    ]);

    const imageUrl = () => {
        if (otherProfileData.data?.avatar) {
            return profileMediaService.getFilePreview(
                otherProfileData.data.avatar
            );
        } else {
            return "/defaultAvatar.png";
        }
    };

    const toLocalDate = (date) => {
        const toLocal = new Date(date);
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const convertedDate = {
            month: months[toLocal.getMonth()],
            year: toLocal.getFullYear(),
        };
        return `${convertedDate.month} ${convertedDate.year}`;
    };

    return (
        <div>
            {profileLoading ? (
                <Loader />
            ) : (
                <div>
                    <div className="top flex py-1 px-3 sticky top-0 backdrop-blur-3xl opacity-[100%] border-b border-b-zinc-200">
                        <NavLink className="left my-auto p-1.5 hover:bg-gray-200 rounded-full">
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

                        <NavLink className="right ml-4">
                            <p className="font-bold text-base">
                                {otherProfileData.data?.name || ""}
                            </p>
                            <p className="text-sm font-light">
                                {otherProfileData?.tweets || "0"} posts
                            </p>
                        </NavLink>
                    </div>

                    <div className="border border-b-0">
                        {/* cover */}
                        <div>
                            {!otherProfileData.data?.profileCover ? (
                                <div className="h-[200px] w-full bg-gray-300"></div>
                            ) : (
                                <img
                                    className="h-[200px] w-full"
                                    src={
                                        profileMediaService.getFilePreview(
                                            otherProfileData.data.profileCover
                                        ) || ""
                                    }
                                    alt="Cover Image"
                                />
                            )}
                        </div>

                        <div className="flex justify-between relative">
                            {/* Avatar */}
                            <div className="p-4 absolute -top-20">
                                <img
                                    className="rounded-full h-[133.5px] w-[133.5px] p-1 bg-white"
                                    src={imageUrl()}
                                    alt="Avatar Image"
                                />
                            </div>
                            {/* Edit / Follow */}
                            <div className="absolute top-4 right-4">
                                {authId === otherProfileData.data?.$id ? (
                                    <button
                                        className="p-2 px-4 font-bold text-base border border-zinc-300 rounded-full"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsProfileEdit(true);
                                        }}
                                    >
                                        Edit profile
                                    </button>
                                ) : (
                                    <button className="p-2 px-4 font-bold text-base border text-white bg-black border-zinc-300 rounded-full">
                                        Follow
                                    </button>
                                )}

                                <EditProfileModal
                                    isOpen={isProfileEdit}
                                    onClose={() => {
                                        setIsProfileEdit(false);
                                    }}
                                />
                            </div>
                            {/* Message */}
                            <div className="absolute top-5 right-36">
                                <button className="p-2 font-bold text-base border border-zinc-300 rounded-full">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-5 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"
                                    >
                                        <g>
                                            <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* blue tick */}
                        <div className="mt-20 ml-4">
                            <div className="flex">
                                <span className="font-bold text-xl">
                                    {otherProfileData.data?.name || ""}
                                </span>
                                {otherProfileData.data?.premiumMember && (
                                    <span>
                                        <svg
                                            viewBox="0 0 22 22"
                                            aria-label="Verified account"
                                            role="img"
                                            className="w-5 fill-blue-500 m-1 r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1"
                                            data-testid="icon-verified"
                                        >
                                            <g>
                                                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                                            </g>
                                        </svg>
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-500">
                                @{otherProfileData.data?.username || ""}
                            </p>
                        </div>

                        <div className="bio m-4">
                            <p>{otherProfileData?.bio || ""}</p>
                        </div>

                        <div className="social flex gap-2 flex-wrap mx-3 text-sm">
                            {otherProfileData.data?.location && (
                                <div className="flex">
                                    <span className="mx-1">
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1gs4q39"
                                        >
                                            <g>
                                                <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>
                                            </g>
                                        </svg>
                                    </span>
                                    <span className="text-gray-500">
                                        {otherProfileData.data?.location || ""}
                                    </span>
                                </div>
                            )}
                            {otherProfileData.data?.website && (
                                <div className="flex">
                                    <span className="mx-1">
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1gs4q39"
                                        >
                                            <g>
                                                <path d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"></path>
                                            </g>
                                        </svg>
                                    </span>
                                    <span className="text-blue-500">
                                        {otherProfileData.data?.website || ""}
                                    </span>
                                </div>
                            )}
                            <div className="flex">
                                <span className="mx-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1gs4q39"
                                    >
                                        <g>
                                            <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="text-gray-500">
                                    Joined{" "}
                                    {toLocalDate(
                                        otherProfileData.data?.$createdAt
                                    ) || ""}
                                </span>
                            </div>
                        </div>

                        {/* follow/ing */}
                        <div className="flex gap-4 text-sm px-4 py-3 text-gray-700">
                            <span className="hover:underline cursor-pointer">
                                <strong>
                                    {otherProfileData.following || "0"}
                                </strong>{" "}
                                Following
                            </span>
                            <span className="hover:underline cursor-pointer">
                                <strong>
                                    {otherProfileData.followers || "0"}
                                </strong>{" "}
                                Followers
                            </span>
                        </div>
                    </div>

                    <div className="top flex top-0 backdrop-blur-3xl opacity-80 border-b border-l border-r border-b-zinc-200">
                        <NavLink
                            className={`left w-1/2 px-3 flex justify-center font-bold text-base hover:bg-gray-300`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrProfileCompo("posts");
                            }}
                        >
                            <div
                                className={`py-4 ${
                                    currProfileCompo === "posts"
                                        ? "text-black border-b-4 border-twitter-blue"
                                        : "text-gray-600"
                                }`}
                            >
                                Posts
                            </div>
                        </NavLink>

                        <NavLink
                            className={`right w-1/2 px-3 flex justify-center font-bold text-base hover:bg-gray-300`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrProfileCompo("replies");
                            }}
                        >
                            <div
                                className={`py-4 ${
                                    currProfileCompo === "replies"
                                        ? "text-black border-b-4 border-twitter-blue"
                                        : "text-gray-600"
                                }`}
                            >
                                Replies
                            </div>
                        </NavLink>
                        <NavLink
                            className={`left w-1/2 px-3 flex justify-center font-bold text-base hover:bg-gray-300`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrProfileCompo("media");
                            }}
                        >
                            <div
                                className={`py-4 ${
                                    currProfileCompo === "media"
                                        ? "text-black border-b-4 border-twitter-blue"
                                        : "text-gray-600"
                                }`}
                            >
                                Media
                            </div>
                        </NavLink>

                        <NavLink
                            className={`right w-1/2 px-3 flex justify-center font-bold text-base hover:bg-gray-300`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrProfileCompo("likes");
                            }}
                        >
                            <div
                                className={`py-4 ${
                                    currProfileCompo === "likes"
                                        ? "text-black border-b-4 border-twitter-blue"
                                        : "text-gray-600"
                                }`}
                            >
                                Likes
                            </div>
                        </NavLink>
                    </div>
                </div>
            )}

            {/* mapping */}
            {tweetLoading ? (
                <Loader />
            ) : (
                (() => {
                    switch (currProfileCompo) {
                        case "posts":
                            return (
                                <Posts>
                                    {tweetsData?.length === 0 ? (
                                        <div className="text-3xl font-bold text-center">
                                            @
                                            {otherProfileData.data?.username ||
                                                ""}{" "}
                                            don&apos;t have any posts
                                        </div>
                                    ) : (
                                        tweetsData?.map((tweet) => (
                                            <TweetCard
                                                key={tweet.data.$id}
                                                tweetId={tweet.data.$id}
                                                author={tweet.data.author}
                                                content={tweet.data.content}
                                                media={tweet.data.media}
                                                likes={tweet.likes}
                                                replies={tweet.replies}
                                                retweets={tweet.retweets}
                                                bookmarks={tweet.bookmarks}
                                                createdAt={
                                                    tweet.data.$createdAt
                                                }
                                                updatedAt={
                                                    tweet.data.$updatedAt
                                                }
                                            />
                                        ))
                                    )}
                                </Posts>
                            );
                        case "replies":
                            return <Replies>Replies by user</Replies>;
                        case "media":
                            return <Media>Media posted by user</Media>;
                        case "likes":
                            return <Likes />;

                        default:
                            return null;
                    }
                })()
            )}
        </div>
    );
}

export default Profile;
