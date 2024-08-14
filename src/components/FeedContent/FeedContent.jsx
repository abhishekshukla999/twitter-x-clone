import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Loader, MobileNavIcon, TweetCard, TweetForm } from "../index";
import { tweetService } from "../../appwrite";
import { Client, Query } from "appwrite";
import { config } from "../../config/config";

function FeedContent() {
    const [tweetsList, setTweetsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTweets();

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

        tweetService.client.subscribe(``);

        return () => {
            unsubscribe();
        };
    }, []);

    async function fetchTweets() {
        const tweets = await tweetService.getTweets([
            Query.limit(10),
            Query.orderDesc("$createdAt"),
        ]);

        setTweetsList(tweets.documents);
        setLoading(false);
    }

    return (
        <div className="relative">
            {/* Navigation Mobile */}
            <div className="hidden max-[499px]:flex sticky top-0 z-1 bg-white dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg opacity-95">
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

            <div className="top flex p-3 min-[500px]:sticky top-0 backdrop-blur-3xl opacity-[100%] border-b border-l border-r border-b-zinc-200 dark:border-gray-800 dim:border-gray-800">
                <NavLink className="left w-1/2 flex justify-center font-bold text-base">
                    For You
                </NavLink>

                <NavLink className="right w-1/2 flex justify-center font-bold text-base">
                    Following
                </NavLink>
            </div>
            {/* TweetForm */}
            <TweetForm />

            {loading ? (
                <Loader />
            ) : (
                tweetsList.map((tweet) => (
                    <TweetCard
                        key={tweet.$id}
                        tweetId={tweet.$id}
                        content={tweet.content}
                        media={tweet.media}
                        author={tweet.author}
                        createdAt={tweet.$createdAt}
                        updatedAt={tweet.$updatedAt}
                    />
                ))
            )}
        </div>
    );
}

export default FeedContent;
