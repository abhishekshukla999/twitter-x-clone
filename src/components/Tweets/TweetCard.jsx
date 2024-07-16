import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
    faBookmark as faBookmarkSolid,
    faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
    bookmarksService,
    likeService,
    profileService,
    retweetService,
    tweetMediaService,
    tweetService,
} from "../../appwrite";
import { useDispatch, useSelector } from "react-redux";
import { addTweets } from "../../features/tweet/tweetSlice";
import { addProfileData } from "../../features/profile/profileSlice";
import { addOtherProfile } from "../../features/profile/otherProfileSlice";
import PostModal from "../Modals/PostModal";
import { Query } from "appwrite";

function TweetCard({
    tweetId,
    name,
    username,
    content,
    media = "",
    likes = [],
    replies = [],
    retweets = [],
    author,
    slug,
    bookmarks = [],
    createdAt,
    updatedAt,
}) {
    const [mediaURL, setMediaURL] = useState("");
    const [analytics] = useState((Math.random() * 1000).toFixed(0));
    const [date, setDate] = useState({});
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.profile.profileData);
    const authData = useSelector((state) => state.auth.userData);
    const tweetsData = useSelector((state) => state.tweets.tweetsData);
    const otherProfile = useSelector(
        (state) => state.otherProfile.otherProfile
    );
    // options box handling
    const [isOpen, setisOpen] = useState(false);
    //edit handling
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const [myBookmark, setMyBookmark] = useState(false);
    const [myLike, setMyLike] = useState(false);
    const [myRetweet, setMyRetweet] = useState(false);

    useEffect(() => {
        const fetchMedia = async () => {
            if (media) {
                setMediaURL(tweetMediaService.getFilePreview(media));
            }

            if (bookmarks.length !== 0) {
                const isBookmarked = await bookmarksService.getBookmarks([
                    Query.and([
                        Query.equal("tweetId", tweetId),
                        Query.equal("userId", authData.$id),
                    ]),
                ]);

                if (isBookmarked.documents.length !== 0) {
                    setMyBookmark(true);
                }
            }

            if (likes.length !== 0) {
                const isLiked = await likeService.getLikes([
                    Query.and([
                        Query.equal("tweetId", tweetId),
                        Query.equal("userId", authData.$id),
                    ]),
                ]);

                if (isLiked.documents.length !== 0) {
                    setMyLike(true);
                }
            }

            if (retweets.length !== 0) {
                const isRetweeted = await retweetService.getRetweets([
                    Query.and([
                        Query.equal("tweetId", tweetId),
                        Query.equal("userId", authData.$id),
                    ]),
                ]);

                if (isRetweeted.documents.length !== 0) {
                    setMyLike(true);
                }
            }
        };

        fetchMedia();
        setDate(toLocalDate(updatedAt));
    }, [media, content]);

    // converting date to local
    const toLocalDate = (date) => {
        const toLocal = new Date(date);
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const convertedDate = {
            date: toLocal.getDate(),
            month: months[toLocal.getMonth()],
            year: toLocal.getFullYear(),
            hours: toLocal.getHours(),
            minutes: toLocal.getMinutes(),
        };
        return convertedDate;
    };

    // delete a tweet
    const handleDelete = async () => {
        if (media) {
            await tweetMediaService.deleteFile(media);
        }

        tweetService
            .deleteTweet(tweetId)
            .then((res) => {
                if (res) {
                    let tweetsArr = tweetsData.filter(
                        (tweet) => tweet.$id !== tweetId
                    );
                    dispatch(addTweets({ tweetsData: [...tweetsArr] }));
                }
            })
            .then(() => {
                let tweetIds = userData.tweets || [];

                tweetIds = tweetIds.filter((id) => id !== tweetId);

                profileService
                    .updateProfile(userData.$id, {
                        tweets: tweetIds,
                    })
                    .then((res) => {
                        if (res) {
                            dispatch(addProfileData({ profileData: res }));
                            if (userData.$id === otherProfile.$id) {
                                dispatch(
                                    addOtherProfile({ currentProfile: res })
                                );
                            }
                        }
                    });
            });
    };

    const handleBookmark = async () => {
        if (authData) {
            const isBookmarked = await bookmarksService.getBookmarks([
                Query.and([
                    Query.equal("tweetId", tweetId),
                    Query.equal("userId", authData.$id),
                ]),
            ]);

            if (isBookmarked.documents.length === 0) {
                const bookmark = await bookmarksService.createBookmark({
                    userId: authData.$id,
                    tweetId,
                });

                if (bookmark) {
                    bookmarks = [bookmark.$id, ...bookmarks];

                    tweetService
                        .updateTweet(tweetId, { bookmarks })
                        .then((res) => {
                            if (res) {
                                const tweetsArr = tweetsData.map((item) =>
                                    item.$id === res.$id ? res : item
                                );
                                dispatch(
                                    addTweets({ tweetsData: [...tweetsArr] })
                                );
                                setMyBookmark(true);
                            }
                        })
                        .catch((err) => {
                            console.log("Error add bookmarks :: ", err);
                        });
                }
            } else {
                const bookmark = await bookmarksService.deleteBookmark(
                    isBookmarked.documents["0"].$id
                );

                if (bookmark) {
                    bookmarks = bookmarks.filter(
                        (bookId) => bookId !== isBookmarked.documents["0"].$id
                    );

                    tweetService
                        .updateTweet(tweetId, { bookmarks })
                        .then((res) => {
                            if (res) {
                                const tweetsArr = tweetsData.map((item) =>
                                    item.$id === res.$id ? res : item
                                );
                                dispatch(
                                    addTweets({ tweetsData: [...tweetsArr] })
                                );
                                setMyBookmark(false);
                            }
                        })
                        .catch((err) => {
                            console.log("Error delete bookmarks :: ", err);
                        });
                }
            }
        }
    };

    const handleLike = async () => {
        if (authData) {
            const isLiked = await likeService.getLikes([
                Query.and([
                    Query.equal("tweetId", tweetId),
                    Query.equal("userId", authData.$id),
                ]),
            ]);

            if (isLiked.documents.length === 0) {
                const like = await likeService.createLike({
                    userId: authData.$id,
                    tweetId,
                });

                if (like) {
                    likes = [like.$id, ...likes];

                    tweetService
                        .updateTweet(tweetId, { likes })
                        .then((res) => {
                            if (res) {
                                const tweetsArr = tweetsData.map((item) =>
                                    item.$id === res.$id ? res : item
                                );
                                dispatch(
                                    addTweets({ tweetsData: [...tweetsArr] })
                                );
                                setMyLike(true);
                            }
                        })
                        .catch((err) => {
                            console.log("Error add like :: ", err);
                        });
                }
            } else {
                const like = await likeService.deleteLike(
                    isLiked.documents["0"].$id
                );

                if (like) {
                    likes = likes.filter(
                        (likeId) => likeId !== isLiked.documents["0"].$id
                    );

                    tweetService
                        .updateTweet(tweetId, { likes })
                        .then((res) => {
                            if (res) {
                                const tweetsArr = tweetsData.map((item) =>
                                    item.$id === res.$id ? res : item
                                );
                                dispatch(
                                    addTweets({ tweetsData: [...tweetsArr] })
                                );
                                setMyLike(false);
                            }
                        })
                        .catch((err) => {
                            console.log("Error delete like :: ", err);
                        });
                }
            }
        }
    };

    const handleRetweet = async () => {
        if (authData) {
            const isRetweeted = await retweetService.getRetweets([
                Query.and([
                    Query.equal("tweetId", tweetId),
                    Query.equal("userId", authData.$id),
                ]),
            ]);

            if (isRetweeted.documents.length === 0) {
                const retweet = await retweetService.createRetweet({
                    userId: authData.$id,
                    tweetId,
                });

                if (retweet) {
                    retweets = [retweet.$id, ...retweets];

                    tweetService
                        .updateTweet(tweetId, { retweets })
                        .then((res) => {
                            if (res) {
                                const tweetsArr = tweetsData.map((item) =>
                                    item.$id === res.$id ? res : item
                                );
                                dispatch(
                                    addTweets({ tweetsData: [...tweetsArr] })
                                );
                                setMyRetweet(true);
                            }
                        })
                        .catch((err) => {
                            console.log("Error add retweet :: ", err);
                        });
                }
            } else {
                const retweet = await retweetService.deleteRetweet(
                    isRetweeted.documents["0"].$id
                );

                if (retweet) {
                    retweets = retweets.filter(
                        (retweetId) =>
                            retweetId !== isRetweeted.documents["0"].$id
                    );

                    tweetService
                        .updateTweet(tweetId, { retweets })
                        .then((res) => {
                            if (res) {
                                const tweetsArr = tweetsData.map((item) =>
                                    item.$id === res.$id ? res : item
                                );
                                dispatch(
                                    addTweets({ tweetsData: [...tweetsArr] })
                                );
                                setMyRetweet(false);
                            }
                        })
                        .catch((err) => {
                            console.log("Error delete retweet :: ", err);
                        });
                }
            }
        }
    };

    return (
        <>
            <div className="post flex px-2 border border-t-0 pt-2">
                {/* User avatar */}
                <div className="avatar w-[9%]">
                    <div className="m-1">
                        <img
                            className="w-full rounded-full"
                            src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
                            alt=""
                        />
                    </div>
                </div>

                <div className="content w-[90%]">
                    <div className="reposted flex">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-4 m-0.5 fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-10ptun7 r-1janqcz"
                        >
                            <g>
                                <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
                            </g>
                        </svg>

                        <span className="text-gray-500 font-bold text-sm">
                            You reposted
                        </span>
                    </div>

                    {/* User details */}
                    <div className="flex justify-between">
                        <div className="user-details mx-0.5 text-base">
                            <span className="mx-0.5 font-bold">{name}</span>
                            <span className="mx-0.5 text-zin font-light">
                                @{username}
                            </span>
                            <span className="mx-0.5 font-light">&middot;</span>
                            <span className="mx-0.5 font-light">{`${date.month} ${date.date}, ${date.year}`}</span>
                            {createdAt !== updatedAt && (
                                <span className="mx-0.5 font-light">
                                    &middot; Edited
                                </span>
                            )}
                        </div>

                        {/* options */}
                        <div
                            className="mx-0.5 cursor-pointer relative"
                            title="Options"
                            onClick={() => {
                                setisOpen(true);
                            }}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-5 m-1 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2"
                            >
                                <g>
                                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                                </g>
                            </svg>

                            {/* options layover */}
                            {isOpen && (
                                <div className="absolute bg-white right-full w-[240px] border rounded-xl shadow-2xl">
                                    <button
                                        className="font-bold mx-3 text-3xl"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setisOpen(false);
                                        }}
                                    >
                                        &times;
                                    </button>
                                    <div className="my-2 w-full">
                                        <div
                                            className="flex gap-2 mr-5 text-base font-bold px-5 py-1 hover:bg-gray-200 w-full"
                                            onClick={handleDelete}
                                        >
                                            <span>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                    className="w-5 fill-red-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1q142lx r-9l7dzd"
                                                >
                                                    <g>
                                                        <path d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            <span>Delete</span>
                                        </div>
                                        <div
                                            className="flex gap-2 mr-5 text-base font-bold px-5 py-1 hover:bg-gray-200 w-full"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsOpenEdit(true);
                                                setisOpen(false);
                                            }}
                                        >
                                            <span>
                                                <svg
                                                    className="w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M1.438 16.873l-1.438 7.127 7.127-1.437 16.874-16.872-5.69-5.69-16.873 16.872zm1.12 4.572l.722-3.584 2.86 2.861-3.582.723zm18.613-15.755l-13.617 13.617-2.86-2.861 13.617-13.617 2.86 2.861z" />
                                                </svg>
                                            </span>
                                            <span>Edit</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <PostModal
                            isOpen={isOpenEdit}
                            onClose={() => {
                                setIsOpenEdit(false);
                            }}
                            post={{ tweetId, content, media }}
                        />
                    </div>

                    {/* User content */}
                    <div className="text mx-1.5 my-1">{content}</div>

                    {media && (
                        <div className="image m-1.5">
                            <img
                                className="rounded-lg w-full"
                                src={mediaURL}
                                alt=""
                            />
                        </div>
                    )}

                    {/* Bottom Interactions */}
                    <div className="flex justify-between">
                        <div className="flex w-[92%]">
                            <div className="flex mr-auto">
                                <span className="my-auto p-2 rounded-full hover:bg-blue-100 cursor-pointer">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-5 fill-gray-500 hover:fill-twitter-blue r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                                    >
                                        <g>
                                            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="text-gray-500 my-auto">
                                    {replies.length}
                                </span>
                            </div>
                            <div
                                className="flex mr-auto"
                                onClick={handleRetweet}
                            >
                                <span className="my-auto p-2 rounded-full cursor-pointer">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className={`w-5 ${
                                            myRetweet
                                                ? "fill-green-500"
                                                : "fill-gray-500"
                                        } hover:fill-green-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi`}
                                    >
                                        <g>
                                            <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span
                                    className={`${
                                        myRetweet
                                            ? "text-green-500"
                                            : "text-gray-500"
                                    }  my-auto`}
                                >
                                    {retweets.length}
                                </span>
                            </div>
                            <div className="flex mr-auto" onClick={handleLike}>
                                <span className="my-1 rounded-full text-[15px] p-2 cursor-pointer text-gray-500 hover:bg-red-100 hover:text-red-500">
                                    {myLike ? (
                                        <FontAwesomeIcon
                                            icon={faHeartSolid}
                                            className="w-5 text-red-500"
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faHeart}
                                            className="w-5"
                                        />
                                    )}
                                </span>
                                <span
                                    className={`${
                                        myLike
                                            ? "text-red-500"
                                            : "text-gray-500"
                                    }  m-auto cursor-pointer`}
                                >
                                    {likes.length}
                                </span>
                            </div>
                            <div className="flex mr-auto my-auto cursor-pointer">
                                <span className="my-1 p-2 rounded-full hover:bg-blue-100">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-5 fill-gray-500 hover:fill-twitter-blue r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                                    >
                                        <g>
                                            <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="text-gray-500 m-auto">
                                    {analytics}
                                </span>
                            </div>
                        </div>

                        {/* BookMark and share */}
                        <div className="flex">
                            <div
                                className="rounded-full my-auto text-[15px] p-2 cursor-pointer text-gray-500 hover:bg-blue-100 hover:text-twitter-blue"
                                onClick={handleBookmark}
                            >
                                {myBookmark ? (
                                    <FontAwesomeIcon
                                        icon={faBookmarkSolid}
                                        className="w-5 text-twitter-blue"
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faBookmark}
                                        className="w-5"
                                    />
                                )}
                            </div>
                            <div className="cursor-pointer p-2 m-auto hover:bg-red-100 rounded-full">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-gray-500 hover:fill-red-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                                >
                                    <g>
                                        <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TweetCard;
