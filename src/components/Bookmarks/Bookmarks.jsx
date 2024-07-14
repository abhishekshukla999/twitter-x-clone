import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TweetCard from "../Tweets/TweetCard";
import { useSelector } from "react-redux";
import { bookmarksService, tweetService } from "../../appwrite";
import { Query } from "appwrite";
import Loader from "../Loader";

function Bookmarks() {
    const userData = useSelector((state) => state.profile.profileData);
    const authData = useSelector((state) => state.auth.userData);
    const [bookTweets, setBookTweets] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        async function fetchBookmarks() {
            const myBookmarks = await bookmarksService.getBookmarks([
                Query.equal("userId", [authData.$id]),
                Query.orderDesc("$createdAt"),
            ]);

            const tweetIds = myBookmarks.documents.map((book) => book.tweetId);
            const bookMarkedTweets = await tweetService.getTweets([
                Query.equal("$id", tweetIds),
            ]);
            setBookTweets([...bookMarkedTweets.documents]);

            setLoader(false);
        }

        fetchBookmarks();
    }, []);

    return (
        <div>
            <div className="top flex justify-between p-3 sticky top-0 backdrop-blur-3xl opacity-[100%] border-l border-r">
                <NavLink className="px-1.5 font-bold text-xl">
                    <div>Bookmarks</div>
                    <div className="text-sm font-light text-gray-600">
                        @{userData.username}
                    </div>
                </NavLink>

                <div className="flex gap-4">
                    <NavLink className="m-0.5">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                        >
                            <g>
                                <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                            </g>
                        </svg>
                    </NavLink>
                </div>
            </div>

            {/* Tweet Card */}
            {loader ? (
                <Loader />
            ) : bookTweets.length === 0 ? (
                <div className="p-4 text-2xl font-bold text-center border-l border-r">
                    You don&apos;t have any bookmarks
                </div>
            ) : (
                <div>
                    {bookTweets.map((tweet) => (
                        <TweetCard
                            key={tweet.$id}
                            tweetId={tweet.$id}
                            name={tweet.name}
                            username={tweet.username}
                            content={tweet.content}
                            media={tweet.media}
                            likes={tweet.likes}
                            replies={tweet.replies}
                            retweets={tweet.retweets}
                            author={tweet.author}
                            slug={tweet.slug}
                            bookmarks={tweet.bookmarks}
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
