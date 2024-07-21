import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
    faBookmark as faBookmarkSolid,
    faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
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
import { PostEngagementsModal, PostModal } from "../index";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import { removeTweetPageData } from "../../features/tweet/tweetPageSlice";

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

    useEffect(() => {
        const avatarUrl = async () => {
            const authorData = await profileService.getProfile(author);

            if (authorData) {
                const url = profileMediaService.getFilePreview(
                    authorData.avatar
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
            }
        };

        fetchMedia();
    }, [media, content]);

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
                dispatch(removeTweetPageData());
                navigate(-2);
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
        } catch (error) {
            console.error("Error deleting tweet :: ", error);
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
                } catch (error) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myBookmark: false,
                    }));
                    console.error("Error adding bookmark :: ", error);
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
                } catch (error) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myBookmark: true,
                    }));
                    console.error("Error deleting bookmark :: ", error);
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
                } catch (error) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myRetweet: false,
                    }));
                    console.log("Error adding retweet :: ", error);
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
                } catch (error) {
                    setInteractions((interactions) => ({
                        ...interactions,
                        myRetweet: true,
                    }));
                    console.log("Error deleting retweet :: ", error);
                }
            }
        }
    };

    return (
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
            <div className="flex justify-between">
                <div className="flex cursor-pointer">
                    {/* User avatar */}
                    <div className="avatar m-1.5 w-[8%]">
                        <img
                            className="w-full rounded-full"
                            src={avatarURL}
                            alt=""
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
                <div className="flex">
                    <div
                        className="w-9 cursor-pointer relative my-auto"
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
                                className="w-9 p-2 hover:bg-blue-100 rounded-full fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2"
                            >
                                <g>
                                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                                </g>
                            </svg>
                        </div>

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
                                    {author === authData.$id && (
                                        <div
                                            className="flex gap-2 mr-5 text-base font-bold px-5 py-1 hover:bg-gray-200 w-full"
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
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                                className="w-5 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-1q142lx"
                                            >
                                                <g>
                                                    <path d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm13 4v3h2v-3h3V8h-3V5h-2v3h-3v2h3zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        <span>Follow</span>
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
            </div>

            <div>
                {/* User content */}
                <div className="content text mx-1.5 mb-3 mt-0.5">
                    {content || "no content found"}
                </div>

                {media && (
                    <div className="image m-1.5">
                        <img
                            className="rounded-2xl w-full"
                            src={mediaURL}
                            alt=""
                        />
                    </div>
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
                    {author === authData.$id && (
                        <span>
                            <div
                                className="flex gap-2 mx-1 text-twitter-blue font-bold text-[15px] px-2 hover:bg-sky-100 rounded-full w-full cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpenEdit(true);
                                    setisOpen(false);
                                }}
                            >
                                <span className="my-auto">
                                    <svg
                                        className="w-4"
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
                    className="flex gap-1 p-3 border-t cursor-pointer hover:bg-[#F7F7F7]"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpenEngs(true);
                    }}
                >
                    <span>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 my-auto fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-trst2h"
                        >
                            <g>
                                <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
                            </g>
                        </svg>
                    </span>
                    <span className="text-gray-500">View post engagements</span>
                </div>

                <PostEngagementsModal
                    isOpen={isOpenEngs}
                    onClose={() => setIsOpenEngs(false)}
                    tweetId={tweetId}
                />
            </div>
            {/* Bottom Interactions */}
            <div className="flex justify-between flex-wrap w-full border-t border-b">
                <div className="flex">
                    <span className="my-auto rounded-full hover:bg-blue-100 cursor-pointer">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-10 p-2 fill-gray-500 hover:fill-twitter-blue r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
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
                            className={`w-6 ${
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
                                className="w-5 text-xl"
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
                                className="w-5 text-xl"
                            />
                        )}
                    </div>
                    <span className="text-gray-500 m-auto">
                        {interactions.bookmarksCount}
                    </span>
                </div>
                <div className="cursor-pointer my-auto hover:bg-blue-100 rounded-full">
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-10 p-2 fill-gray-500 hover:fill-blue-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                    >
                        <g>
                            <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
