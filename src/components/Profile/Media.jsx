import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replyService, tweetService } from "../../appwrite";
import { Query, ID } from "appwrite";
import { addMedia, removeMedia } from "../../features/media/mediaSlice";
import { MediaCard, Loader } from "../";
import { toast } from "sonner";

function Media() {
    const otherProfileData = useSelector((state) => state.otherProfile);
    const mediaData = useSelector((state) => state.media);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAllMedia() {
            try {
                const tweetsData = await tweetService.getTweets([
                    Query.equal("author", [otherProfileData.$id]),
                ]);
                const repliesData = await replyService.getReplies([
                    Query.equal("userId", [otherProfileData.$id]),
                ]);

                if (
                    tweetsData.documents.length !== 0 ||
                    repliesData.documents.length !== 0
                ) {
                    const updatedTweetsData = tweetsData.documents.map(
                        (tweet) => {
                            return {
                                tweetId: tweet.$id,
                                media: tweet.media,
                                $createdAt: tweet.$createdAt,
                            };
                        }
                    );

                    const combinedData = [
                        ...updatedTweetsData,
                        ...repliesData.documents,
                    ];

                    const sortedData = combinedData.sort(
                        (a, b) =>
                            new Date(b.$createdAt) - new Date(a.$createdAt)
                    );

                    if (sortedData.length !== 0) {
                        const allMedia = sortedData.map((data) => {
                            return { tweetId: data.tweetId, media: data.media };
                        });

                        dispatch(addMedia(allMedia));
                    }
                } else {
                    dispatch(removeMedia());
                }
            } catch (error) {
                // console.log("Error fetching media :: ", error);
                toast.error("Failed loading media");
            } finally {
                setLoading(false);
            }
        }

        fetchAllMedia();
    }, [dispatch, otherProfileData.$id]);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : mediaData.length === 0 ? (
                <div className="text-3xl font-bold text-center p-4">
                    @{otherProfileData?.username || ""} don&apos;t have any
                    media
                </div>
            ) : mediaData.length !== 0 ? (
                mediaData?.map((data) => {
                    return (
                        <MediaCard
                            key={ID.unique()}
                            tweetId={data.tweetId}
                            media={data.media}
                        />
                    );
                })
            ) : null}
        </div>
    );
}

export default Media;
