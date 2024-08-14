import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TweetCard from "../Tweets/TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkService, tweetService } from "../../appwrite";
import { Query } from "appwrite";
import { Loader } from "../";
import {
    addBookmarks,
    removeBookmarks,
} from "../../features/bookmark/bookmarkSlice";
import { toast } from "sonner";

function Bookmarks() {
    const profileData = useSelector((state) => state.profile);
    const authData = useSelector((state) => state.auth.userData);
    const bookmarksData = useSelector((state) => state.bookmarks);
    const [loader, setLoader] = useState(true);
    const dispatch = useDispatch();
    const [myBookmarksData, setMyBookmarksData] = useState([]);
    const [isOptionOpen, setIsOptionOpen] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBookmarks() {
            try {
                if (authData) {
                    const myBookmarks = await bookmarkService.getBookmarks([
                        Query.equal("userId", [authData.$id]),
                        Query.orderDesc("$createdAt"),
                    ]);

                    if (myBookmarks.documents.length !== 0) {
                        setMyBookmarksData(myBookmarks.documents);
                        const tweetIds = myBookmarks.documents.map(
                            (book) => book.tweetId
                        );

                        const bookMarkedTweets = await tweetService.getTweets([
                            Query.equal("$id", tweetIds),
                        ]);

                        // map of tweetId to bookmark createdAt
                        const bookmarkMap = myBookmarks.documents.reduce(
                            (map, bookmark) => {
                                map[bookmark.tweetId] = bookmark.$createdAt;
                                return map;
                            },
                            {}
                        );

                        // Sorting the tweets based on bookmark creation date
                        bookMarkedTweets.documents.sort((a, b) => {
                            return (
                                new Date(bookmarkMap[b.$id]) -
                                new Date(bookmarkMap[a.$id])
                            );
                        });

                        dispatch(
                            addBookmarks({
                                data: bookMarkedTweets.documents,
                                bookmarksCount: myBookmarks.documents.length,
                            })
                        );
                    } else {
                        dispatch(removeBookmarks());
                    }
                }
            } catch (error) {
                console.error("Error in fetching bookmarks :: ", error);
            } finally {
                setLoader(false);
            }
        }

        fetchBookmarks();
    }, [dispatch, bookmarksData.bookmarksCount]);

    const handleClearAllBookmarks = async () => {
        try {
            if (myBookmarksData.length !== 0) {
                for (const element of myBookmarksData) {
                    await bookmarkService.deleteBookmark(element.$id);
                }

                dispatch(removeBookmarks());
                setIsOptionOpen(false);
                toast.success("All bookmarks deleted successfully");
            } else {
                throw new Error("No Bookmarks exists");
            }
        } catch (error) {
            console.log("Error deleting all bookmarks :: ", error.message);
            toast.error(error.message);
        }
    };

    return (
        <div
            className="relative"
            onClick={(e) => {
                e.stopPropagation();
                setIsOptionOpen(false);
            }}
        >
            <div className="top flex justify-between p-3 pt-1 sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex">
                    <NavLink
                        className="m-0.5 my-auto p-2 hover:bg-gray-200 dark:hover:bg-slate-800 dim:hover:bg-slate-700 rounded-full hidden max-[499px]:block"
                        onClick={() => navigate(-1)}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                            </g>
                        </svg>
                    </NavLink>
                    <div className="px-1.5 font-bold text-xl">
                        <div>Bookmarks</div>
                        <div className="text-sm font-light text-gray-600 dark:text-gray-400 dim:text-gray-400">
                            @{profileData?.username}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 my-auto">
                    <div
                        className="m-0.5 p-2 hover:bg-gray-200 dark:hover:bg-slate-800 dim:hover:bg-slate-700 cursor-pointer rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOptionOpen(true);
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                        >
                            <g>
                                <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            {isOptionOpen && (
                <div
                    className="absolute flex bg-white top-3 left-1/2 transform -translate-x-1/3 w-2/3 rounded-xl shadow-lg dark:shadow-gray-500 dark:shadow-inner dim:shadow-gray-500 dim:shadow-inner dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="font-bold mx-3 p-1 text-3xl rounded-full hover:text-twitter-blue"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOptionOpen(false);
                        }}
                    >
                        &times;
                    </button>
                    <div
                        className="my-2 w-full cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClearAllBookmarks();
                        }}
                    >
                        <div className="flex gap-2 mr-5 text-base font-bold text-red-600 px-5 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 dim:hover:bg-slate-700 w-full">
                            <button className="w-full">
                                Clear all Bookmarks
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tweet Card */}
            {loader ? (
                <Loader />
            ) : bookmarksData?.bookmarksCount === 0 ? (
                <div className="p-4 text-2xl font-bold text-center h-screen">
                    You don&apos;t have any bookmarks
                </div>
            ) : (
                <div>
                    {bookmarksData?.data.map((tweet) => (
                        <TweetCard
                            key={tweet.$id}
                            tweetId={tweet.$id}
                            content={tweet.content}
                            media={tweet.media}
                            author={tweet.author}
                            createdAt={tweet.$createdAt}
                            updatedAt={tweet.$updatedAt}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Bookmarks;
