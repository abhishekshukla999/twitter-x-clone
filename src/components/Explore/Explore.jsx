import { useCallback, useEffect, useState } from "react";
import {
    MobileNavIcon,
    TrendingCard,
    TweetCard,
    UserSearchCard,
} from "../index";
import { profileService, tweetService } from "../../appwrite";
import { Query } from "appwrite";

function Explore() {
    const [searchText, setSearchtext] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [tweetsList, setTweetsList] = useState([]);

    const handleSearch = useCallback(async () => {
        const usersProfiles = await profileService.getProfiles([
            Query.search("username", searchText),
        ]);

        const usersTweets = await tweetService.getTweets([
            Query.search("content", searchText),
        ]);

        setUsersList(usersProfiles.documents);
        setTweetsList(usersTweets.documents);
    }, [searchText]);

    useEffect(() => {
        let unsubscribe = false;

        if (!unsubscribe) {
            handleSearch();
        }

        return () => {
            unsubscribe = true;
        };
    }, [searchText, handleSearch]);

    return (
        <div>
            <div className="flex p-2">
                {/* Navigation Mobile */}
                <div className="mr-2">
                    <MobileNavIcon />
                </div>

                <div className="max-w-md p-1 mx-auto my-auto w-full">
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white dim:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-5 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-2 ps-10 text-base text-gray-900 border border-gray-300 rounded-full  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dim:bg-gray-700 dim:border-gray-600 dim:placeholder-gray-400 dim:text-white dim:focus:ring-blue-500 dim:focus:border-blue-500"
                            placeholder="Search a user or post"
                            value={searchText}
                            onChange={(e) => setSearchtext(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {usersList.length === 0 && tweetsList.length === 0 ? (
                <div>
                    <TrendingCard
                        prefix="Trending in India"
                        title="BCCI"
                        suffix="205K posts"
                    />
                    <TrendingCard
                        prefix="Sports · Trending"
                        title="#Siraj"
                        suffix="19.5K posts"
                    />
                    <TrendingCard
                        prefix="Entertainment · Trending"
                        title="Avatar 3"
                        suffix="11K posts"
                    />
                    <TrendingCard
                        prefix="Finance · Trending"
                        title="#Doge"
                        suffix="9K posts"
                    />
                </div>
            ) : (
                <div>
                    <div>
                        {usersList.map((user) => (
                            <UserSearchCard
                                key={user.$id}
                                name={user.name}
                                username={user.username}
                                media={user.avatar}
                                userId={user.$id}
                                premium={user.premiumMember}
                            />
                        ))}
                    </div>

                    <div>
                        {tweetsList.map((tweet) => (
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
                </div>
            )}
        </div>
    );
}

export default Explore;
