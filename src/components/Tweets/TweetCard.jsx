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
    replyService,
    retweetService,
    tweetMediaService,
    tweetService,
} from "../../appwrite";
import { useDispatch, useSelector } from "react-redux";
import { addOtherProfile } from "../../features/profile/otherProfileSlice";
import { Query } from "appwrite";
import { addBookmarks } from "../../features/bookmark/bookmarkSlice";
import { addLikes } from "../../features/like/likeSlice";
import { useNavigate } from "react-router-dom";
import { addProfileData } from "../../features/profile/profileSlice";
import { addTweets } from "../../features/tweet/tweetSlice";
import { toast } from "sonner";
import {
    LoadingModal,
    FollowTweet,
    MediaLoader,
    UserCardLoader,
} from "../index";

function TweetCard({
    tweetId,
    content,
    media = "",
    author,
    createdAt,
    updatedAt,
}) {
    const [mediaURL, setMediaURL] = useState("");
    const [avatarURL, setAvatarURL] = useState("/defaultAvatar.png");
    const [authorInfo, setAuthorInfo] = useState(null);
    const [analytics] = useState((Math.random() * 1000).toFixed(0));
    const [date, setDate] = useState({});
    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth.userData);
    const profileData = useSelector((state) => state.profile);
    const otherProfile = useSelector((state) => state.otherProfile);
    const tweetsData = useSelector((state) => state.tweets);
    const bookmarksData = useSelector((state) => state.bookmarks);
    const likesData = useSelector((state) => state.likes);

    // options box handling
    const [isOpen, setisOpen] = useState(false);

    const [interactions, setInteractions] = useState({
        myBookmark: false,
        myLike: false,
        myRetweet: false,
        bookmarksCount: 0,
        likesCount: 0,
        retweetsCount: 0,
        repliesCount: 0,
    });

    const [mediaLoader, setMediaLoader] = useState(true);
    const [authorInfoLoader, setAuthorInfoLoader] = useState(true);
    const navigate = useNavigate();
    const [navLoading, setNavLoading] = useState(false);

    useEffect(() => {
        let unsubscribe = false;

        const avatarUrl = async () => {
            if (!unsubscribe) {
                try {
                    const authorData = await profileService.getProfile(author);

                    if (authorData) {
                        if (authorData?.avatar) {
                            const url = profileMediaService.getFilePreview(
                                authorData?.avatar
                            );

                            const URL = url ? url : "/defaultAvatar.png";

                            setAvatarURL(URL);
                        }
                        setAuthorInfo({
                            name: authorData.name,
                            username: authorData.username,
                            premiumMember: authorData.premiumMember,
                        });

                        setAuthorInfoLoader(false);
                    }
                } catch (error) {
                    console.log(
                        "Error fetching profile in tweets card :: ",
                        error
                    );
                }
            }
        };

        avatarUrl();

        return () => {
            unsubscribe = true;
        };
    }, [author]);

    useEffect(() => {
        let unsubscribe = false;

        const fetchMedia = async () => {
            if (media && !unsubscribe) {
                const img = new Image();
                img.src = tweetMediaService.getCustomQualityFilePreview({
                    fileId: media,
                    quality: 70,
                });

                img.onload = () => {
                    setMediaURL(img.src);
                    setMediaLoader(false);
                };

                img.onerror = () => {
                    mediaURL("/errorImage.png");
                    setMediaLoader(false);
                };

                if (img.complete) {
                    setMediaURL(img.src);
                    setMediaLoader(false);
                }
            }
        };

        fetchMedia();
        setDate(toLocalDate(createdAt));

        return () => {
            unsubscribe = true;
        };
    }, [media]);

    // bookmarks
    useEffect(() => {
        let unsubscribe = false;

        const fetchBookmarksData = async () => {
            if (!unsubscribe) {
                try {
                    const allBookmarks = await bookmarkService.getBookmarks([
                        Query.equal("tweetId", [tweetId]),
                    ]);

                    if (allBookmarks.documents.length !== 0) {
                        setInteractions((interactions) => ({
                            ...interactions,
                            bookmarksCount: allBookmarks.documents.length,
                        }));

                        const isMyBook = await bookmarkService.getBookmarks([
                            Query.and([
                                Query.equal("tweetId", [tweetId]),
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
                } catch (error) {
                    console.log("Bookmarks loading failed :: ", error);
                }
            }
        };

        fetchBookmarksData();

        return () => {
            unsubscribe = true;
        };
    }, []);

    // likes
    useEffect(() => {
        let unsubscribe = false;

        const fetchLikesData = async () => {
            if (!unsubscribe) {
                try {
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
                } catch (error) {
                    console.log("Likes loading failed :: ", error);
                }
            }
        };

        fetchLikesData();

        return () => {
            unsubscribe = true;
        };
    }, []);

    // retweets
    useEffect(() => {
        let unsubscribe = false;

        const fetchRetweetsData = async () => {
            if (!unsubscribe) {
                try {
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
                } catch (error) {
                    console.log("Retweets loading failed :: ", error);
                }
            }
        };

        fetchRetweetsData();

        return () => {
            unsubscribe = true;
        };
    }, []);

    // replies
    useEffect(() => {
        let unsubscribe = false;

        const fetchRepliesData = async () => {
            if (!unsubscribe) {
                try {
                    const allReplies = await replyService.getReplies([
                        Query.equal("tweetId", [tweetId]),
                    ]);

                    if (allReplies.documents.length !== 0) {
                        setInteractions((interactions) => ({
                            ...interactions,
                            repliesCount: allReplies.documents.length,
                        }));
                    }
                } catch (error) {
                    console.log("Replies loading failed :: ", error);
                }
            }
        };

        fetchRepliesData();

        return () => {
            unsubscribe = true;
        };
    }, []);

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
        try {
            if (media) {
                await tweetMediaService.deleteFile(media);
            }

            const deletedTweet = await tweetService.deleteTweet(tweetId);

            if (deletedTweet) {
                // console.log("Tweet Deleted");

                const updatedTweetsCount = profileData?.tweets - 1;
                const updatedProfileData = await profileService.updateProfile(
                    authData?.$id,
                    {
                        tweets: updatedTweetsCount,
                    }
                );

                dispatch(addProfileData({ ...updatedProfileData }));

                if (authData.$id === otherProfile?.$id) {
                    dispatch(addOtherProfile({ ...updatedProfileData }));

                    const updatedTweetsData = tweetsData.filter(
                        (tweet) => tweet.$id !== tweetId
                    );

                    dispatch(addTweets(updatedTweetsData));
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

                const deleteReplyPromises = allReplies.documents.map(
                    (document) => replyService.deleteReply(document.$id)
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
            }

            toast.success("Tweet deleted successfully");
        } catch (error) {
            // console.error("Error deleting tweet :: ", error);
            toast.error("Tweet deletion failed");
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
                    toast.error("Failed adding Tweet to bookmarks ");
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

                    const currentUserbookmarks =
                        await bookmarkService.getBookmarks([
                            Query.equal("userId", [authData.$id]),
                        ]);

                    dispatch(
                        addBookmarks({
                            ...bookmarksData,
                            bookmarksCount:
                                currentUserbookmarks.documents.length,
                        })
                    );

                    toast.success("Tweet removed from bookmarks");
                } catch (error) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myBookmark: true,
                    }));
                    console.error("Error deleting bookmark :: ", error);
                    toast.error("Failed removing tweet from bookmarks");
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

                    const currentUserLikes = await likeService.getLikes([
                        Query.equal("userId", [authData.$id]),
                    ]);

                    dispatch(
                        addLikes({
                            ...likesData,
                            likesCount: currentUserLikes.documents.length,
                        })
                    );
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

    const handleTweetNavigation = useCallback(
        (e) => {
            e.stopPropagation();
            setNavLoading(true);

            profileService
                .getProfile(author)
                .then((res) => {
                    // console.log("Handletweet", res);
                    navigate(`/${res.username}/status/${tweetId}`);
                })
                .catch((err) =>
                    console.log("Error in handle tweet navigation :: ", err)
                )
                .finally(() => setNavLoading(false));
        },
        [navigate, tweetId, author]
    );

    const handleProfileNavigation = useCallback(
        (e) => {
            e.stopPropagation();
            setNavLoading(true);

            profileService
                .getProfile(author)
                .then((res) => {
                    navigate(`/${res.username}`);
                })
                .catch((err) =>
                    console.log("Error in handle profile navigation :: ", err)
                )
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
            <div
                className="parent post px-2 border border-t-0 dark:border-gray-800 dim:border-gray-800 pt-2 cursor-pointer hover:bg-[#F7F7F7] dark:hover:bg-slate-700 dim:hover:bg-slate-800"
                onClick={handleTweetNavigation}
            >
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
                <div className="flex">
                    {/* User avatar */}
                    <div className="avatar m-1 min-w-[40px] max-w-[43px]">
                        <img
                            className="w-full rounded-full"
                            src={avatarURL}
                            alt="avatar"
                            loading="lazy"
                        />
                    </div>

                    <div className="content w-[90%]">
                        {/* User details */}
                        <div className="relative">
                            {authorInfoLoader ? (
                                <UserCardLoader />
                            ) : (
                                <div className="flex justify-between">
                                    <div
                                        className="user-details flex flex-wrap mx-0.5 text-base"
                                        onClick={handleProfileNavigation}
                                    >
                                        <span className="mx-0.5 font-bold hover:underline">
                                            {authorInfo?.name}
                                        </span>
                                        {authorInfo?.premiumMember && (
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
                                        <span className="mx-0.5 text-zin font-light">
                                            @{authorInfo?.username}
                                        </span>
                                        <span className="mx-0.5 font-light">
                                            &middot;
                                        </span>
                                        <span className="mx-0.5 font-light">{`${date.month} ${date.date}, ${date.year}`}</span>

                                        {createdAt !== updatedAt && (
                                            <>
                                                <span className="mx-0.5 font-light">
                                                    &middot;
                                                </span>
                                                <span className="mx-0.5 text-[13px] font-light">
                                                    Edited
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {/* options */}
                                    <div
                                        className="w-9 cursor-pointer relative"
                                        title="Options"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setisOpen(true);
                                        }}
                                    >
                                        <div className="">
                                            <svg
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                                className="w-9 p-2 hover:bg-blue-100 hover:fill-twitter-blue dark:hover:bg-slate-800 dim:hover:bg-slate-700 rounded-full fill-gray-500 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2"
                                            >
                                                <g>
                                                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* options layover */}
                            {isOpen && (
                                <div className="absolute bg-white dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg z-20 top-1 left-1/2 transform -translate-x-1/3 w-2/3 border dark:border-gray-500 dim:border-gray-500 rounded-xl shadow-2xl dark:shadow-inner dim:shadow-gray-500">
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
                                                className="flex gap-2 mr-5 text-base font-bold px-5 py-1 hover:bg-gray-200 dark:hover:bg-slate-700 dim:hover:bg-slate-800 w-full"
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
                        </div>

                        {/* User content */}
                        <div className="text mx-1.5 mb-1 mt-0.5">{content}</div>

                        {media &&
                            (mediaLoader ? (
                                <div className="m-1.5">
                                    <MediaLoader />
                                </div>
                            ) : (
                                <div className="image m-1.5">
                                    <img
                                        className="rounded-2xl w-full"
                                        src={mediaURL}
                                        alt="tweet media"
                                        loading="lazy"
                                    />
                                </div>
                            ))}

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
                                        {interactions.repliesCount}
                                    </span>
                                </div>
                                <div
                                    className="flex mr-auto"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRetweet();
                                    }}
                                >
                                    <span className="my-auto p-2 rounded-full cursor-pointer">
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className={`w-5 ${
                                                interactions.myRetweet
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
                                            interactions.myRetweet
                                                ? "text-green-500"
                                                : "text-gray-500"
                                        }  my-auto`}
                                    >
                                        {interactions.retweetsCount}
                                    </span>
                                </div>
                                <div
                                    className="flex mr-auto"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLike();
                                    }}
                                >
                                    <span className="my-1 rounded-full text-[15px] p-2 cursor-pointer text-gray-500 hover:bg-red-100 hover:text-red-500">
                                        {interactions.myLike ? (
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
                                            interactions.myLike
                                                ? "text-red-500"
                                                : "text-gray-500"
                                        }  m-auto cursor-pointer`}
                                    >
                                        {interactions.likesCount}
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
                            <div className="flex gap-1">
                                <div className="flex">
                                    <div
                                        className="rounded-full  my-auto text-[15px] p-2 cursor-pointer text-gray-500 hover:bg-blue-100 hover:text-twitter-blue"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBookmark();
                                        }}
                                    >
                                        {interactions.myBookmark ? (
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
                                    {author === authData.$id && (
                                        <span className="text-gray-500 m-auto">
                                            {interactions.bookmarksCount}
                                        </span>
                                    )}
                                </div>
                                {profileData.premiumMember && (
                                    <div
                                        className="cursor-pointer p-2 m-auto hover:bg-blue-100 rounded-full"
                                        title="Download media"
                                        onClick={handelFileDownload}
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 fill-[#6b7280] hover:fill-twitter-blue"
                                        >
                                            <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0"
                                            ></g>
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
                    </div>
                </div>
            </div>

            <LoadingModal isOpen={navLoading} />
        </>
    );
}

export default TweetCard;
