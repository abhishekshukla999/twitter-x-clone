import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTweets, removeTweets } from "../../features/tweet/tweetSlice";
import { tweetService } from "../../appwrite";
import { Query } from "appwrite";
import { Loader, TweetCard } from "../index";
import { toast } from "sonner";

function Posts() {
    const [tweetLoading, setTweetLoading] = useState(true);
    const otherProfileData = useSelector((state) => state.otherProfile);
    const tweetsData = useSelector((state) => state.tweets);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!otherProfileData?.$id) return;

        let unsubscribe = false;

        const fetchTweets = async () => {
            if (!unsubscribe) {
                try {
                    const tweetsCollectionData = await tweetService.getTweets([
                        Query.equal("author", [otherProfileData?.$id]),
                        Query.orderDesc("$createdAt"),
                    ]);

                    if (tweetsCollectionData.documents.length !== 0) {
                        const tweetsCollection = tweetsCollectionData.documents;
                        dispatch(addTweets(tweetsCollection));
                    } else {
                        dispatch(removeTweets());
                    }
                } catch (error) {
                    // console.error("Error fetching tweets:", error);
                    toast.error("Failed loading posts");
                } finally {
                    setTweetLoading(false);
                }
            }
        };

        fetchTweets();

        return () => {
            unsubscribe = true;
        };
    }, [dispatch, otherProfileData?.$id]);

    return (
        <div>
            {tweetLoading ? (
                <Loader />
            ) : tweetsData?.length === 0 ? (
                <div className="text-3xl font-bold text-center p-4">
                    @{otherProfileData?.username || ""} don&apos;t have any
                    posts
                </div>
            ) : (
                tweetsData?.map((tweet) => (
                    <TweetCard
                        key={tweet.$id}
                        tweetId={tweet.$id}
                        author={tweet.author}
                        content={tweet.content}
                        media={tweet.media}
                        createdAt={tweet.$createdAt}
                        updatedAt={tweet.$updatedAt}
                    />
                ))
            )}
        </div>
    );
}

export default Posts;
