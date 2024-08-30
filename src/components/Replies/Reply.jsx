import { useCallback, useEffect, useState } from "react";
import {
    profileMediaService,
    profileService,
    replyService,
    tweetMediaService,
} from "../../appwrite";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTweetPageData } from "../../features/tweet/tweetPageSlice";
import { FollowTweet, LoadingModal, MediaLoader } from "../index";
import { toast } from "sonner";

function Reply({
    replyId,
    userId,
    tweetAuthorId,
    content,
    media = "",
    createdAt,
}) {
    const [mediaURL, setMediaURL] = useState("");
    const [avatarURL, setAvatarURL] = useState("/defaultAvatar.png");
    const [authorInfo, setAuthorInfo] = useState(null);
    const [date, setDate] = useState({});
    const authData = useSelector((state) => state.auth.userData);
    const tweetPageData = useSelector((state) => state.tweetPage);
    const dispatch = useDispatch();
    const [mediaLoader, setMediaLoader] = useState(true);

    // options box handling
    const [isOpen, setisOpen] = useState(false);
    const [navLoading, setNavLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let unsubscribe = false;

        const avatarUrl = async () => {
            if (!unsubscribe) {
                try {
                    const authorData = await profileService.getProfile(userId);

                    if (authorData) {
                        if (authorData?.avatar) {
                            const url =
                                profileMediaService.getCustomFilePreview(
                                    authorData.avatar,
                                    50,
                                    50
                                );

                            setAvatarURL(url || "/defaultAvatar.png");
                        }

                        setAuthorInfo({
                            name: authorData.name,
                            username: authorData.username,
                            premiumMember: authorData.premiumMember,
                        });
                    }
                } catch (error) {
                    console.log(
                        "Error fetching Avatar url in reply :: ",
                        error
                    );
                }
            }
        };

        avatarUrl();

        return () => {
            unsubscribe = true;
        };
    }, [userId]);

    useEffect(() => {
        const fetchMedia = async () => {
            if (media) {
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
    }, [media]);

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

    // delete a reply
    const handleDelete = async () => {
        try {
            if (media) {
                await tweetMediaService.deleteFile(media);
            }

            const deletedReply = await replyService.deleteReply(replyId);

            if (deletedReply) {
                // console.log("Reply Deleted");

                const oldData = tweetPageData;
                const newCount = tweetPageData.repliesCount - 1;
                const updatedRepliesData = tweetPageData.repliesData.filter(
                    (reply) => reply.$id !== replyId
                );

                dispatch(
                    addTweetPageData({
                        ...oldData,
                        repliesData: updatedRepliesData,
                        repliesCount: newCount,
                    })
                );
            }
        } catch (error) {
            // console.error("Error deleting reply :: ", error);
            toast.error("Failed deleting reply");
        }
    };

    const handleProfileNavigation = useCallback(
        (e) => {
            e.stopPropagation();
            setNavLoading(true);

            profileService
                .getProfile(userId)
                .then((res) => {
                    // console.log("HandleProfile", res);
                    navigate(`/${res.username}`);
                })
                .catch((err) => console.log("HandleProfile", err))
                .finally(() => setNavLoading(false));
        },
        [navigate, userId]
    );

    return (
        <>
            <div className="parent post px-2 border-b dark:border-gray-600 dim:border-gray-600 pt-2 py-2 hover:bg-[#F7F7F7] dark:hover:bg-slate-700 dim:hover:bg-slate-800">
                <div className="flex">
                    {/* User avatar */}

                    <div className="avatar m-1 min-w-[40px] max-w-[43px]">
                        <img
                            className="rounded-full"
                            src={avatarURL}
                            alt="avatar"
                            loading="lazy"
                        />
                    </div>

                    <div className="content w-[90%]">
                        {/* User details */}
                        <div className="relative">
                            <div className="flex justify-between">
                                <div
                                    className="user-details cursor-pointer flex flex-wrap mx-0.5 text-base"
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
                                            className="w-9 p-2 hover:bg-blue-100dark:hover:bg-slate-800 dim:hover:bg-slate-700  fill-gray-500 dark:fill-white dim:fill-white rounded-full r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2"
                                        >
                                            <g>
                                                <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* options layover */}
                            {isOpen && (
                                <div className="absolute z-20 bg-white dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg top-1 left-1/2 transform -translate-x-1/3 w-2/3 border rounded-xl shadow-2xl">
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
                                        {(userId === authData.$id ||
                                            tweetAuthorId === authData.$id) && (
                                            <div
                                                className="flex gap-2 mr-5 cursor-pointer text-base font-bold px-5 py-1 hover:bg-gray-200 dark:hover:bg-slate-700 dim:hover:bg-slate-800 w-full"
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

                                        {userId !== authData.$id && (
                                            <FollowTweet
                                                followingId={userId}
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
                                <MediaLoader />
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
                    </div>
                </div>
            </div>

            <LoadingModal isOpen={navLoading} />
        </>
    );
}

export default Reply;
