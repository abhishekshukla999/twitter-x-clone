import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileService, replyService, tweetService } from "../../appwrite";
import { Query } from "appwrite";
import { Loader, Reply } from "../";
import { addReplies, removeReplies } from "../../features/replies/replySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Replies() {
    const otherProfileData = useSelector((state) => state.otherProfile);
    const repliesData = useSelector((state) => state.replies);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchReplies() {
            try {
                const myReplies = await replyService.getReplies([
                    Query.equal("userId", [otherProfileData.$id]),
                    Query.orderDesc("$createdAt"),
                ]);

                if (myReplies.documents.length !== 0) {
                    dispatch(
                        addReplies({
                            data: myReplies.documents,
                            repliesCount: myReplies.documents.length,
                        })
                    );
                } else {
                    dispatch(removeReplies());
                }
            } catch (error) {
                // console.error("Error in fetching replies :: ", error);
                toast.error("Failed loading replies")
            } finally {
                setLoading(false);
            }
        }

        fetchReplies();
    }, [dispatch, repliesData.repliesCount, otherProfileData.$id]);

    const navigateTweet = async (tweetId) => {
        const tweetData = await tweetService.getTweet(tweetId);
        const authorProfileData = await profileService.getProfile(
            tweetData.author
        );
        navigate(`/${authorProfileData.username}/status/${tweetId}`);
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : repliesData.data.length === 0 ? (
                <div className="text-3xl font-bold text-center p-4">
                    @{otherProfileData?.username || ""} don&apos;t have any
                    replies
                </div>
            ) : (
                <div>
                    {repliesData.data.map((reply) => (
                        <div
                            key={reply.$id}
                            onClick={() => navigateTweet(reply.tweetId)}
                            className="cursor-pointer"
                        >
                            <Reply
                                replyId={reply.$id}
                                userId={reply.userId}
                                content={reply.content}
                                media={reply.media}
                                createdAt={reply.$createdAt}
                                tweetAuthorId=""
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Replies;
