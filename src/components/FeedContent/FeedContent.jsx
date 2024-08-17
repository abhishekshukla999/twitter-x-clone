import { useCallback, useEffect, useRef, useState } from "react";

import { NavLink } from "react-router-dom";
import { Loader, MobileNavIcon, TweetCard, TweetForm } from "../index";
import { tweetService } from "../../appwrite";
import { Client, Query } from "appwrite";
import { config } from "../../config/config";

function FeedContent() {
    const [tweetsList, setTweetsList] = useState([]);
    const [lastId, setLastId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        let unsubscribe = false;

        setLoading(true);
        setError(false);

        async function fetchTweets() {
            if (!unsubscribe) {
                const queryParams = [
                    Query.limit(7),
                    Query.orderDesc("$createdAt"),
                ];

                if (lastId) {
                    queryParams.push(Query.cursorAfter(lastId));
                }

                try {
                    const tweets = await tweetService.getTweets(queryParams);

                    if (tweets.documents.length > 0) {
                        const oldTweetsList = [...tweetsList];
                        setTweetsList([...oldTweetsList, ...tweets.documents]);

                        setHasMore(tweets.total);
                    }
                } catch (error) {
                    console.log("Error Fetching tweet list :: ", error);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchTweets();

        return () => {
            unsubscribe = true;
        };
    }, [lastId]);

    useEffect(() => {
        const client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        const unsubscribe = client.subscribe(
            `databases.${config.appwriteDatabaseId}.collections.${config.appwriteTweetsCollectionId}.documents`,
            (response) => {
                if (
                    response.events.includes(
                        "databases.*.collections.*.documents.*.create"
                    )
                ) {
                    setTweetsList((prev) => [response.payload, ...prev]);
                } else if (
                    response.events.includes(
                        "databases.*.collections.*.documents.*.delete"
                    )
                ) {
                    setTweetsList((prev) =>
                        prev.filter(
                            (tweet) => tweet.$id !== response.payload.$id
                        )
                    );
                }
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    const observer = useRef();
    const lastIdElementRef = useCallback(
        (node) => {
            if (loading) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (
                    entries["0"].isIntersecting &&
                    hasMore > tweetsList.length
                ) {
                    setLastId(tweetsList[tweetsList.length - 1]?.$id);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading]
    );

    return (
        <div className="relative">
            {/* Navigation Mobile */}
            <div className="hidden max-[499px]:flex sticky top-0 z-30 bg-white dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg opacity-95">
                <div className="w-1/2">
                    <MobileNavIcon />
                </div>
                <div className="w-1/2 my-auto">
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-7 dark:invert dim:invert r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-16y2uox r-lwhw9o"
                    >
                        <g>
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </g>
                    </svg>
                </div>
            </div>
            <div className="top flex p-3 min-[500px]:sticky z-30 top-0 backdrop-blur-3xl opacity-[100%] border-b border-l border-r border-b-zinc-200 dark:border-gray-800 dim:border-gray-800">
                <NavLink className="left w-1/2 flex justify-center font-bold text-base">
                    For You
                </NavLink>

                <NavLink className="right w-1/2 flex justify-center font-bold text-base">
                    Following
                </NavLink>
            </div>
            {/* TweetForm */}
            <TweetForm />

            {tweetsList?.map((tweet, index) =>
                tweetsList.length === index + 1 ? (
                    <div key={tweet.$id} ref={lastIdElementRef}>
                        <TweetCard
                            tweetId={tweet.$id}
                            content={tweet.content}
                            media={tweet.media}
                            author={tweet.author}
                            createdAt={tweet.$createdAt}
                            updatedAt={tweet.$updatedAt}
                        />
                    </div>
                ) : (
                    <div key={tweet.$id}>
                        <TweetCard
                            tweetId={tweet.$id}
                            content={tweet.content}
                            media={tweet.media}
                            author={tweet.author}
                            createdAt={tweet.$createdAt}
                            updatedAt={tweet.$updatedAt}
                        />
                    </div>
                )
            )}

            {loading && <Loader />}

            {error && "ERROR!!!!!!!!!"}
        </div>
    );
}

export default FeedContent;
