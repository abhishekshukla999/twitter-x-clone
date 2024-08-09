import { useEffect, useState } from "react";
import {
    profileMediaService,
    profileService,
    replyService,
    tweetMediaService,
} from "../../appwrite";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTweetPageData } from "../../features/tweet/tweetPageSlice";

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

    // options box handling
    const [isOpen, setisOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const avatarUrl = async () => {
            const authorData = await profileService.getProfile(userId);

            if (authorData) {
                const url = profileMediaService.getFilePreview(
                    authorData.avatar
                );

                setAvatarURL(url);

                setAuthorInfo({
                    name: authorData.name,
                    username: authorData.username,
                });
            }
        };

        avatarUrl();
    }, []);

    useEffect(() => {
        const fetchMedia = async () => {
            if (media) {
                setMediaURL(tweetMediaService.getFilePreview(media));
            }
        };

        fetchMedia();
        setDate(toLocalDate(createdAt));
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

    // delete a reply
    const handleDelete = async () => {
        try {
            if (media) {
                await tweetMediaService.deleteFile(media);
            }

            const deletedReply = await replyService.deleteReply(replyId);

            if (deletedReply) {
                console.log("Reply Deleted");

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
            console.error("Error deleting tweet :: ", error);
        }
    };

    const handleProfileNavigation = (e) => {
        e.stopPropagation();

        profileService
            .getProfile(userId)
            .then((res) => {
                console.log("HandleProfile", res);
                navigate(`/${res.username}`);
            })
            .catch((err) => console.log("HandleProfile", err));
    };

    return (
        <div className="parent post px-2  border-b pt-2 py-2 hover:bg-[#F7F7F7]">
            <div className="flex">
                {/* User avatar */}
                <div className="avatar w-[9%]">
                    <div className="m-1">
                        <img
                            className="w-full rounded-full"
                            src={avatarURL}
                            alt=""
                        />
                    </div>
                </div>

                <div className="content w-[90%]">
                    {/* User details */}
                    <div className="flex justify-between flex-wrap">
                        <div
                            className="user-details flex flex-wrap mx-0.5 text-base"
                            onClick={handleProfileNavigation}
                        >
                            <span className="mx-0.5 font-bold hover:underline">
                                {authorInfo?.name}
                            </span>
                            <span className="mx-0.5 text-zin font-light">
                                @{authorInfo?.username}
                            </span>
                            <span className="mx-0.5 font-light">&middot;</span>
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
                                        {(userId === authData.$id ||
                                            tweetAuthorId === authData.$id) && (
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
                    </div>

                    {/* User content */}
                    <div className="text mx-1.5 mb-1 mt-0.5">{content}</div>

                    {media && (
                        <div className="image m-1.5">
                            <img
                                className="rounded-2xl w-full"
                                src={mediaURL}
                                alt=""
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Reply;
