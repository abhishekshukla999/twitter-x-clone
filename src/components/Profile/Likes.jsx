import { useEffect, useState } from "react";
import { likeService, tweetService } from "../../appwrite";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import { Loader, TweetCard } from "../";

function Likes() {
    const authData = useSelector((state) => state.auth.userData);
    const [likeTweets, setLikeTweets] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        async function fetchLikes() {
            const myLikes = await likeService.getLikes([
                Query.equal("userId", [authData.$id]),
                Query.orderDesc("$createdAt"),
            ]);

            const tweetIds = myLikes.documents.map((like) => like.tweetId);
            const LikedTweets = await tweetService.getTweets([
                Query.equal("$id", tweetIds),
            ]);
            setLikeTweets([...LikedTweets.documents]);

            setLoader(false);
        }

        fetchLikes();
    }, []);

    return (
        <div>
            {loader ? (
                <Loader />
            ) : likeTweets.length === 0 ? (
                <div className="p-4 text-2xl font-bold text-center border-l border-r">
                    You don&apos;t have any bookmarks
                </div>
            ) : (
                <div>
                    {likeTweets.map((tweet) => (
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

export default Likes;
