import { useEffect, useState } from "react";
import { likeService, tweetService } from "../../appwrite";
import { useDispatch, useSelector } from "react-redux";
import { Query } from "appwrite";
import { Loader, TweetCard } from "../index";
import { addLikes } from "../../features/like/likeSlice";

function Likes() {
    const otherProfileData = useSelector((state) => state.otherProfile);
    const likesData = useSelector((state) => state.likes);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        let unsubscribe = false;

        async function fetchLikes() {
            if (!unsubscribe) {
                try {
                    const myLikes = await likeService.getLikes([
                        Query.equal("userId", [otherProfileData.$id]),
                    ]);

                    if (myLikes.documents.length !== 0) {
                        const tweetIds = myLikes.documents.map(
                            (like) => like.tweetId
                        );

                        const likedTweets = await tweetService.getTweets([
                            Query.equal("$id", tweetIds),
                        ]);

                        // map of tweetId to like createdAt
                        const likeMap = myLikes.documents.reduce(
                            (map, like) => {
                                map[like.tweetId] = like.$createdAt;
                                return map;
                            },
                            {}
                        );

                        // Sorting the tweets based on like creation date
                        likedTweets.documents.sort((a, b) => {
                            return (
                                new Date(likeMap[b.$id]) -
                                new Date(likeMap[a.$id])
                            );
                        });

                        dispatch(
                            addLikes({
                                data: likedTweets.documents,
                                likesCount: myLikes.documents.length,
                            })
                        );
                    }
                } catch (error) {
                    console.error("Error in fetching likes :: ", error);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchLikes();

        return () => {
            unsubscribe = true;
        };
    }, [dispatch, likesData.likesCount, otherProfileData.$id]);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : likesData.likesCount === 0 ? (
                <div className="p-4 text-2xl font-bold text-center border-l border-r">
                    @{otherProfileData.username} don&apos;t have any likes
                </div>
            ) : (
                <div>
                    {likesData.data.map((tweet) => (
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

export default Likes;
