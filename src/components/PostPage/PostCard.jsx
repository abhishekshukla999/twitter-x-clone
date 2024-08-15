import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
    faBookmark as faBookmarkSolid,
    faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import {
    bookmarkService,
    likeService,
    profileMediaService,
    profileService,
    retweetService,
    tweetMediaService,
    tweetService,
    replyService,
} from "../../appwrite";
import { useDispatch, useSelector } from "react-redux";
import { PostEngagementsModal, PostModal, FollowTweet } from "../index";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import { removeTweetPageData } from "../../features/tweet/tweetPageSlice";
import { addProfileData } from "../../features/profile/profileSlice";
import { toast } from "sonner";
import { LoadingModal } from "../";

function PostCard({
    tweetId = "",
    content = "",
    media = "",
    author = "",
    createdAt = "",
}) {
    const [mediaURL, setMediaURL] = useState("");
    const [avatarURL, setAvatarURL] = useState("/defaultAvatar.png");
    const [authorInfo, setAuthorInfo] = useState(null);
    const [analytics] = useState((Math.random() * 1000).toFixed(0));
    const [date, setDate] = useState({});
    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth.userData);
    const profileData = useSelector((state) => state.profile);

    const repliesCount = useSelector((state) => state.tweetPage.repliesCount);

    // options box handling
    const [isOpen, setisOpen] = useState(false);
    //edit handling
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const [isOpenEngs, setIsOpenEngs] = useState(false);

    const [interactions, setInteractions] = useState({
        myBookmark: false,
        myLike: false,
        myRetweet: false,
        bookmarksCount: 0,
        likesCount: 0,
        retweetsCount: 0,
        repliesCount: 0,
    });

    const navigate = useNavigate();

    const [mediaLoading, setMediaLoading] = useState(true);
    const [navLoading, setNavLoading] = useState(false);

    useEffect(() => {
        const avatarUrl = async () => {
            const authorData = await profileService.getProfile(author);

            if (authorData) {
                const url = profileMediaService.getCustomFilePreview(
                    authorData.avatar,
                    50,
                    50
                );

                const URL = url ? url : "/defaultAvatar.png";

                setAvatarURL(URL);

                setAuthorInfo({
                    name: authorData.name,
                    username: authorData.username,
                });
            }
        };

        avatarUrl();
        setDate(toLocalDate(createdAt));
    }, [author, createdAt]);

    useEffect(() => {
        const fetchMedia = async () => {
            if (media) {
                setMediaURL(tweetMediaService.getFilePreview(media));
                setMediaLoading(false);
            }
        };

        fetchMedia();
    }, [media]);

    // bookmarks
    useEffect(() => {
        const fetchBookmarksData = async () => {
            const allBookmarks = await bookmarkService.getBookmarks([
                Query.equal("tweetId", tweetId),
            ]);

            if (allBookmarks.documents.length !== 0) {
                setInteractions((interactions) => ({
                    ...interactions,
                    bookmarksCount: allBookmarks.documents.length,
                }));

                const isMyBook = await bookmarkService.getBookmarks([
                    Query.and([
                        Query.equal("tweetId", tweetId),
                        Query.equal("userId", [authData.$id]),
                    ]),
                ]);

                if (isMyBook.documents.length !== 0) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myBookmark: true,
                    }));
                }
            }
        };

        fetchBookmarksData();
    }, []);

    // likes
    useEffect(() => {
        const fetchLikesData = async () => {
            const allLikes = await likeService.getLikes([
                Query.equal("tweetId", tweetId),
            ]);

            if (allLikes.documents.length !== 0) {
                setInteractions((interactions) => ({
                    ...interactions,
                    likesCount: allLikes.documents.length,
                }));

                const isMyLike = await likeService.getLikes([
                    Query.and([
                        Query.equal("tweetId", tweetId),
                        Query.equal("userId", [authData.$id]),
                    ]),
                ]);

                if (isMyLike.documents.length !== 0) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myLike: true,
                    }));
                }
            }
        };

        fetchLikesData();
    }, []);

    // retweets
    useEffect(() => {
        const fetchRetweetsData = async () => {
            const allRetweets = await retweetService.getRetweets([
                Query.equal("tweetId", tweetId),
            ]);

            if (allRetweets.documents.length !== 0) {
                setInteractions((interactions) => ({
                    ...interactions,
                    retweetsCount: allRetweets.documents.length,
                }));

                const isMyRetweet = await retweetService.getRetweets([
                    Query.and([
                        Query.equal("tweetId", tweetId),
                        Query.equal("userId", [authData.$id]),
                    ]),
                ]);

                if (isMyRetweet.documents.length !== 0) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myRetweet: true,
                    }));
                }
            }
        };

        fetchRetweetsData();
    }, []);

    // replies
    useEffect(() => {
        const fetchRepliesData = async () => {
            const allReplies = await replyService.getReplies([
                Query.equal("tweetId", [tweetId]),
            ]);

            if (allReplies.documents.length !== 0) {
                setInteractions((interactions) => ({
                    ...interactions,
                    repliesCount: allReplies.documents.length,
                }));
            } else {
                setInteractions((interactions) => ({
                    ...interactions,
                    repliesCount: 0,
                }));
            }
        };

        fetchRepliesData();
    }, [repliesCount]);

    document.title = `${authorInfo?.name} on X`;

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

        const formatTime = (hours, minutes) => {
            const isPM = hours >= 12;
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes.toString().padStart(2, "0");
            const period = isPM ? "PM" : "AM";
            return `${formattedHours}:${formattedMinutes} ${period}`;
        };

        const convertedDate = {
            date: toLocal.getDate(),
            month: months[toLocal.getMonth()],
            year: toLocal.getFullYear(),
            hours: toLocal.getHours(),
            minutes: toLocal.getMinutes(),
        };

        const time = formatTime(convertedDate.hours, convertedDate.minutes);

        return { ...convertedDate, time };
    };

    // delete a tweet
    const handleDelete = async () => {
        try {
            if (media) {
                await tweetMediaService.deleteFile(media);
            }

            const deletedTweet = await tweetService.deleteTweet(tweetId);

            if (deletedTweet) {
                console.log("Tweet Deleted");
                const updatedTweetsCount = profileData?.tweets - 1;
                const updatedProfileData = await profileService.updateProfile(
                    authData?.$id,
                    {
                        tweets: updatedTweetsCount,
                    }
                );

                dispatch(addProfileData({ ...updatedProfileData }));

                dispatch(removeTweetPageData());
                navigate(-1);
            }

            // deleting associated docs

            // like
            const allLikes = await likeService.getLikes([
                Query.equal("tweetId", tweetId),
            ]);

            const deleteLikePromises = allLikes.documents.map((document) =>
                likeService.deleteLike(document.$id)
            );

            try {
                await Promise.all(deleteLikePromises);
                console.log("All likes deleted successfully.");
            } catch (error) {
                console.error("Error deleting some likes:", error);
            }

            // replies
            const allReplies = await replyService.getReplies([
                Query.equal("tweetId", tweetId),
            ]);

            const deleteReplyPromises = allReplies.documents.map((document) =>
                replyService.deleteReply(document.$id)
            );

            try {
                await Promise.all(deleteReplyPromises);
                console.log("All replies deleted successfully.");
            } catch (error) {
                console.error("Error deleting some replies:", error);
            }

            // retweets
            const allRetweets = await retweetService.getRetweets([
                Query.equal("tweetId", tweetId),
            ]);

            const deleteReyweetPromises = allRetweets.documents.map(
                (document) => retweetService.deleteRetweet(document.$id)
            );

            try {
                await Promise.all(deleteReyweetPromises);
                console.log("All retweets deleted successfully.");
            } catch (error) {
                console.error("Error deleting some retweets:", error);
            }

            // bookmarks
            const allBookmarks = await bookmarkService.getBookmarks([
                Query.equal("tweetId", tweetId),
            ]);

            const deleteBookmarkPromises = allBookmarks.documents.map(
                (document) => bookmarkService.deleteBookmark(document.$id)
            );

            try {
                await Promise.all(deleteBookmarkPromises);
                console.log("All bookmarks deleted successfully.");
            } catch (error) {
                console.error("Error deleting some bookmark:", error);
            }

            toast.success("Tweet deleted successfully");
        } catch (error) {
            // console.error("Error deleting tweet :: ", error);
            toast.error("Failed deleting tweet");
        }
    };

    const handleBookmark = async () => {
        if (authData) {
            const allBookmarks = await bookmarkService.getBookmarks([
                Query.equal("tweetId", [tweetId]),
            ]);

            const isMyBookmarked = allBookmarks.documents.filter(
                (book) => book.userId === authData.$id
            );

            if (isMyBookmarked.length === 0) {
                setInteractions((interactions) => ({
                    ...interactions,
                    myBookmark: true,
                }));

                try {
                    const bookmark = await bookmarkService.createBookmark({
                        userId: authData.$id,
                        tweetId,
                    });

                    if (bookmark) {
                        const currentBooksCount =
                            interactions.bookmarksCount + 1;

                        setInteractions((interactions) => ({
                            ...interactions,
                            bookmarksCount: currentBooksCount,
                        }));
                    }

                    toast.success("Tweet added to bookmarks");
                } catch (error) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myBookmark: false,
                    }));
                    // console.error("Error adding bookmark :: ", error);
                    toast.error("Falied adding tweets to bookmarks");
                }
            } else {
                setInteractions((interactions) => ({
                    ...interactions,
                    myBookmark: false,
                }));

                try {
                    const bookmarkId = isMyBookmarked["0"].$id;
                    const bookmark = await bookmarkService.deleteBookmark(
                        bookmarkId
                    );

                    if (bookmark) {
                        const currentBookCount =
                            interactions.bookmarksCount - 1;

                        setInteractions((interactions) => ({
                            ...interactions,
                            bookmarksCount: currentBookCount,
                        }));
                    }

                    toast.success("Tweet deleted from bookmarks");
                } catch (error) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myBookmark: true,
                    }));
                    // console.error("Error deleting bookmark :: ", error);
                    toast.error("Tweet deleted from bookmarks");
                }
            }
        }
    };

    const handleLike = async () => {
        if (authData) {
            const allLikes = await likeService.getLikes([
                Query.equal("tweetId", tweetId),
            ]);

            const isMyliked = allLikes.documents.filter(
                (like) => like.userId === authData.$id
            );

            if (isMyliked.length === 0) {
                setInteractions((interactions) => ({
                    ...interactions,
                    myLike: true,
                }));

                try {
                    const like = await likeService.createLike({
                        userId: authData.$id,
                        tweetId,
                    });

                    if (like) {
                        const currentLikesCount = interactions.likesCount + 1;

                        setInteractions((interactions) => ({
                            ...interactions,
                            likesCount: currentLikesCount,
                        }));
                    }
                } catch (error) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myLike: false,
                    }));
                    console.error("Error adding like :: ", error);
                }
            } else {
                setInteractions((interactions) => ({
                    ...interactions,
                    myLike: false,
                }));

                try {
                    const likedId = isMyliked["0"].$id;
                    const like = await likeService.deleteLike(likedId);

                    if (like) {
                        const currentLikesCount = interactions.likesCount - 1;

                        setInteractions((interactions) => ({
                            ...interactions,
                            likesCount: currentLikesCount,
                        }));
                    }
                } catch (error) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myLike: true,
                    }));
                    console.log("Error deleting like :: ", error);
                }
            }
        }
    };

    const handleRetweet = async () => {
        if (authData) {
            const allRetweets = await retweetService.getRetweets([
                Query.equal("tweetId", tweetId),
            ]);

            const isMyRetweeted = allRetweets.documents.filter(
                (retweet) => retweet.userId === authData.$id
            );

            if (isMyRetweeted.length === 0) {
                setInteractions((interactions) => ({
                    ...interactions,
                    myRetweet: true,
                }));

                try {
                    const retweet = await retweetService.createRetweet({
                        userId: authData.$id,
                        tweetId,
                    });

                    if (retweet) {
                        const currentRetweetsCount =
                            interactions.retweetsCount + 1;

                        setInteractions((interactions) => ({
                            ...interactions,
                            retweetsCount: currentRetweetsCount,
                        }));
                    }

                    toast.success("Tweet reposted");
                } catch (error) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myRetweet: false,
                    }));
                    // console.log("Error adding retweet :: ", error);
                    toast.error("Tweet reposting failed");
                }
            } else {
                setInteractions((interactions) => ({
                    ...interactions,
                    myRetweet: false,
                }));

                try {
                    const retweetedId = isMyRetweeted["0"].$id;
                    const retweet = await retweetService.deleteRetweet(
                        retweetedId
                    );

                    if (retweet) {
                        const currentRetweetsCount =
                            interactions.retweetsCount - 1;

                        setInteractions((interactions) => ({
                            ...interactions,
                            retweetsCount: currentRetweetsCount,
                        }));
                    }

                    toast.success("Tweet repost deleted");
                } catch (error) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myRetweet: true,
                    }));
                    // console.log("Error deleting retweet :: ", error);
                    toast.error("Failed deleting repost tweet");
                }
            }
        }
    };

    const handleProfileNavigation = useCallback(
        (e) => {
            e.stopPropagation();
            setNavLoading(true);

            profileService
                .getProfile(author)
                .then((res) => {
                    // console.log("HandleProfile", res);
                    navigate(`/${res.username}`);
                })
                .catch((err) => console.log("HandleProfile", err))
                .finally(() => setNavLoading(false));
        },
        [navigate, author]
    );

    const handelFileDownload = (e) => {
        e.stopPropagation();

        if (media) {
            const URL = tweetMediaService.downloadFile(media);
            window.location.href = URL.href;
        }
    };

    return (
        <>
            <div className="parent post px-2 pt-2">
                {interactions.myRetweet && (
                    <div className="reposted flex flex-wrap">
                        <div className="w-[9%] my-auto py-1 px-2">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-4 ml-auto fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-10ptun7 r-1janqcz"
                            >
                                <g>
                                    <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
                                </g>
                            </svg>
                        </div>

                        <span className="text-gray-500 w-[90%] font-bold text-sm">
                            You reposted
                        </span>
                    </div>
                )}
                <div
                    className="flex justify-between relative"
                    onClick={handleProfileNavigation}
                >
                    <div className="flex cursor-pointer">
                        {/* User avatar */}
                        <div className="avatar m-1.5 w-[45px]">
                            <img
                                className="w-full rounded-full"
                                src={avatarURL}
                                alt="avatar"
                            />
                        </div>

                        {/* User details */}
                        <div>
                            <div className="mx-0.5 font-bold hover:underline">
                                {authorInfo?.name || ""}
                            </div>
                            <div className="mx-0.5 text-zinc-500 font-light">
                                @{authorInfo?.username || ""}
                            </div>
                        </div>
                    </div>

                    {/* options */}
                    <div
                        className="w-9 cursor-pointer my-auto"
                        title="Options"
                        onClick={(e) => {
                            e.stopPropagation();
                            setisOpen(true);
                        }}
                    >
                        <div>
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-9 p-2 hover:bg-blue-100 dark:hover:bg-slate-800 dim:hover:bg-slate-700 fill-gray-500 dark:fill-white dim:fill-white rounded-full  r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2"
                            >
                                <g>
                                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* options layover */}
                    {isOpen && (
                        <div className="absolute z-40 bg-white dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg top-1 left-1/2 transform -translate-x-1/3 w-2/3 border dark:border-gray-600 dim:border-gray-600 dark:shadow-inner dim:shadow-inner rounded-xl shadow-2xl">
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
                                {author === authData.$id && (
                                    <div
                                        className="flex gap-2 mr-5 text-base font-bold px-5 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 dim:hover:bg-gray-700 w-full cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete();
                                        }}
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
                                )}

                                {author !== authData.$id && (
                                    <FollowTweet
                                        followingId={author}
                                        followerId={authData.$id}
                                        username={authorInfo?.username}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    <PostModal
                        isOpen={isOpenEdit}
                        onClose={() => {
                            setIsOpenEdit(false);
                        }}
                        post={{ tweetId, content, media }}
                    />
                </div>

                <div>
                    {/* User content */}
                    <div className="content text mx-1.5 mb-3 mt-0.5">
                        {content || "no content found"}
                    </div>

                    {mediaLoading && media ? (
                        <div className="flex justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 200 200"
                                className="w-20"
                            >
                                <circle
                                    fill="#1D9BF0"
                                    stroke="#1D9BF0"
                                    strokeWidth="15"
                                    r="15"
                                    cx="35"
                                    cy="100"
                                >
                                    <animate
                                        attributeName="cx"
                                        calcMode="spline"
                                        dur="1"
                                        values="35;165;165;35;35"
                                        keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                                        repeatCount="indefinite"
                                        begin="0"
                                    ></animate>
                                </circle>
                                <circle
                                    fill="#1D9BF0"
                                    stroke="#1D9BF0"
                                    strokeWidth="15"
                                    opacity=".8"
                                    r="15"
                                    cx="35"
                                    cy="100"
                                >
                                    <animate
                                        attributeName="cx"
                                        calcMode="spline"
                                        dur="2"
                                        values="35;165;165;35;35"
                                        keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                                        repeatCount="indefinite"
                                        begin="0.05"
                                    ></animate>
                                </circle>
                                <circle
                                    fill="#1D9BF0"
                                    stroke="#1D9BF0"
                                    strokeWidth="15"
                                    opacity=".6"
                                    r="15"
                                    cx="35"
                                    cy="100"
                                >
                                    <animate
                                        attributeName="cx"
                                        calcMode="spline"
                                        dur="2"
                                        values="35;165;165;35;35"
                                        keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                                        repeatCount="indefinite"
                                        begin=".1"
                                    ></animate>
                                </circle>
                                <circle
                                    fill="#1D9BF0"
                                    stroke="#1D9BF0"
                                    strokeWidth="15"
                                    opacity=".4"
                                    r="15"
                                    cx="35"
                                    cy="100"
                                >
                                    <animate
                                        attributeName="cx"
                                        calcMode="spline"
                                        dur="2"
                                        values="35;165;165;35;35"
                                        keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                                        repeatCount="indefinite"
                                        begin=".15"
                                    ></animate>
                                </circle>
                                <circle
                                    fill="#1D9BF0"
                                    stroke="#1D9BF0"
                                    strokeWidth="15"
                                    opacity=".2"
                                    r="15"
                                    cx="35"
                                    cy="100"
                                >
                                    <animate
                                        attributeName="cx"
                                        calcMode="spline"
                                        dur="2"
                                        values="35;165;165;35;35"
                                        keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                                        repeatCount="indefinite"
                                        begin=".2"
                                    ></animate>
                                </circle>
                            </svg>
                        </div>
                    ) : (
                        media && (
                            <div className="image m-1.5">
                                <img
                                    className="rounded-2xl w-full"
                                    src={mediaURL}
                                    alt="tweet image"
                                />
                            </div>
                        )
                    )}

                    <div className="text-[15px] mx-1 my-4 flex flex-wrap">
                        <span className="cursor-pointer mx-0.5 my-auto font-light hover:underline">
                            {date.time} &middot;&nbsp;
                            {`${date?.month} ${date?.date}, ${date?.year}`}
                            &nbsp;&middot;
                        </span>
                        {/* <span className="mx-0.5 font-light"></span> */}
                        <span className="mx-0.5 my-auto font-light">
                            <span className="font-bold">{analytics}</span>{" "}
                            <span>Views</span>
                        </span>
                        {author === authData.$id &&
                            profileData.premiumMember && (
                                <span>
                                    <div
                                        className="flex gap-2 mx-1 text-twitter-blue yellow:text-twitter-yellow crimson:text-twitter-crimson purple:text-twitter-purple orange:text-twitter-orange green:text-twitter-green font-bold text-[15px] px-2 hover:bg-sky-100 dark:hover:bg-slate-800 dim:hover:bg-slate-700 rounded-full w-full cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsOpenEdit(true);
                                            setisOpen(false);
                                        }}
                                    >
                                        <span className="my-auto">
                                            <svg
                                                className="w-4 dark:fill-white dim:fill-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M1.438 16.873l-1.438 7.127 7.127-1.437 16.874-16.872-5.69-5.69-16.873 16.872zm1.12 4.572l.722-3.584 2.86 2.861-3.582.723zm18.613-15.755l-13.617 13.617-2.86-2.861 13.617-13.617 2.86 2.861z" />
                                            </svg>
                                        </span>
                                        <span>Edit tweet</span>
                                    </div>
                                </span>
                            )}
                    </div>

                    <div
                        className="flex gap-1 p-3 border-t dark:border-gray-800 dim:border-gray-800 cursor-pointer hover:bg-[#F7F7F7] dark:hover:bg-slate-800 dim:hover:bg-slate-700"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpenEngs(true);
                        }}
                    >
                        <span>
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-5 my-auto fill-gray-500 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-trst2h"
                            >
                                <g>
                                    <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
                                </g>
                            </svg>
                        </span>
                        <span className="text-gray-500 dark:text-white dim:text-white">
                            View post engagements
                        </span>
                    </div>

                    <PostEngagementsModal
                        isOpen={isOpenEngs}
                        onClose={() => setIsOpenEngs(false)}
                        tweetId={tweetId}
                    />
                </div>
                {/* Bottom Interactions */}
                <div className="flex justify-between flex-wrap w-full border-t border-b dark:border-gray-800 dim:border-gray-800">
                    <div className="flex ">
                        <span className="my-auto rounded-full hover:bg-blue-100 cursor-pointer">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-10 p-2 fill-gray-500 hover:fill-twitter-blue dark:hover:fill-gray-500 dim:hover:fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                            >
                                <g>
                                    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                                </g>
                            </svg>
                        </span>
                        <span className="text-gray-500 my-auto">
                            {interactions.repliesCount}
                        </span>
                    </div>
                    <div
                        className="flex"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRetweet();
                        }}
                    >
                        <span className="my-auto p-2 rounded-full cursor-pointer">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className={`w-6 hover:fill-green-500  ${
                                    interactions.myRetweet
                                        ? "fill-green-500"
                                        : "fill-gray-500"
                                } r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi`}
                            >
                                <g>
                                    <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
                                </g>
                            </svg>
                        </span>
                        <span
                            className={`${
                                interactions.myRetweet
                                    ? "text-green-500"
                                    : "text-gray-500"
                            }  my-auto`}
                        >
                            {interactions.retweetsCount}
                        </span>
                    </div>
                    <div
                        className="flex"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLike();
                        }}
                    >
                        <span className="my-1 rounded-full text-[15px] p-2 cursor-pointer text-gray-500 hover:bg-red-100 hover:text-red-500">
                            {interactions.myLike ? (
                                <FontAwesomeIcon
                                    icon={faHeartSolid}
                                    className="w-5 text-red-500 text-xl"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className="w-5 text-xl dark:hover:text-gray-500 dim:hover:text-gray-500"
                                />
                            )}
                        </span>
                        <span
                            className={`${
                                interactions.myLike
                                    ? "text-red-500"
                                    : "text-gray-500"
                            }  m-auto cursor-pointer`}
                        >
                            {interactions.likesCount}
                        </span>
                    </div>
                    <div className="flex">
                        <div
                            className="my-1 rounded-full text-[15px] p-2 cursor-pointer text-gray-500 hover:bg-blue-100 hover:text-twitter-blue"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleBookmark();
                            }}
                        >
                            {interactions.myBookmark ? (
                                <FontAwesomeIcon
                                    icon={faBookmarkSolid}
                                    className="w-5 text-twitter-blue text-xl"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faBookmark}
                                    className="w-5 text-xl dark:hover:text-gray-500 dim:hover:text-gray-500"
                                />
                            )}
                        </div>

                        {authData?.$id === author && (
                            <span className="text-gray-500 m-auto">
                                {interactions.bookmarksCount}
                            </span>
                        )}
                    </div>
                    {profileData.premiumMember && (
                        <div
                            className="cursor-pointer my-auto hover:bg-blue-100 rounded-full"
                            title="Download media"
                            onClick={handelFileDownload}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 p-2 fill-[#6b7280] hover:fill-twitter-blue dark:hover:fill-gray-500 dim:hover:fill-gray-500 "
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z"></path>
                                    <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"></path>
                                </g>
                            </svg>
                        </div>
                    )}
                </div>
            </div>

            <LoadingModal isOpen={navLoading} />
        </>
    );
}

export default PostCard;
