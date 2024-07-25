import { NavLink, useNavigate } from "react-router-dom";
import { Loader, PostCard, Reply, ReplyForm } from "../index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileService, replyService, tweetService } from "../../appwrite";
import { Query } from "appwrite";
import {
    addTweetPageData,
    removeTweetPageData,
} from "../../features/tweet/tweetPageSlice";

function PostPageComponent({ username, tweetId }) {
    const dispatch = useDispatch();
    const [author, setAuthor] = useState(null);
    const tweetPageData = useSelector((state) => state.tweetPage);
    const tweetData = useSelector((state) => state.tweetPage.tweetData);
    const repliesData = useSelector((state) => state.tweetPage.repliesData);
    const repliesCount = useSelector((state) => state.tweetPage.repliesCount);
    const [tweetLoading, setTweetLoading] = useState(true);
    const [repliesLoading, setRepliesLoading] = useState(true);
    const navigate = useNavigate();

    // author & tweet data
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const authorData = await profileService.getProfiles([
                    Query.equal("username", username),
                ]);

                if (authorData.documents.length !== 0) {
                    setAuthor(authorData.documents["0"].$id);
                }

                const postData = await tweetService.getTweet(tweetId);

                if (postData) {
                    const oldData = tweetPageData;
                    dispatch(
                        addTweetPageData({ ...oldData, tweetData: postData })
                    );
                }
            } catch (error) {
                console.log("Error fetching Post data", error);
            } finally {
                setTweetLoading(false);
            }
        };

        fetchPostData();
    }, [dispatch, username, tweetId]);

    // replies
    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const allReplies = await replyService.getReplies([
                    Query.equal("tweetId", [tweetId]),
                    Query.orderDesc("$createdAt"),
                ]);

                if (allReplies.documents.length !== 0) {
                    const oldData = tweetPageData;
                    dispatch(
                        addTweetPageData({
                            ...oldData,
                            repliesData: allReplies.documents,
                            repliesCount: allReplies.documents.length,
                        })
                    );
                } else {
                    dispatch(
                        addTweetPageData({
                            ...tweetPageData,
                            repliesData: [],
                            repliesCount: 0,
                        })
                    );
                }
            } catch (error) {
                console.log("Error fetching Replies data", error);
            } finally {
                setRepliesLoading(false);
            }
        };

        fetchReplies();
    }, [dispatch, repliesCount, tweetId]);

    return (
        <div className="border-l border-r">
            <div className="top flex py-1 px-3 h-[51px] sticky top-0 backdrop-blur-[400px] opacity-[100%]">
                <NavLink
                    className="left my-auto rounded-full"
                    onClick={() => navigate(-2)}
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-9 p-2 hover:bg-gray-300 rounded-full r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                    >
                        <g>
                            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                        </g>
                    </svg>
                </NavLink>

                <div className="right my-auto ml-8">
                    <p className="font-bold text-xl">Post</p>
                </div>
            </div>

            {tweetLoading ? (
                <Loader />
            ) : (
                <PostCard
                    tweetId={tweetId}
                    content={tweetData.content}
                    media={tweetData.media}
                    author={author}
                    createdAt={tweetData.$createdAt}
                    updatedAt={tweetData.$updatedAt}
                />
            )}

            <ReplyForm tweetId={tweetId} />

            {repliesLoading ? (
                <Loader />
            ) : (
                repliesData?.map((reply) => (
                    <Reply
                        key={reply.$id}
                        replyId={reply.$id}
                        userId={reply.userId}
                        tweetAuthorId={author}
                        content={reply.content}
                        media={reply.media}
                        createdAt={reply.$createdAt}
                    />
                ))
            )}
        </div>
    );
}

export default PostPageComponent;
