import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
    bookmarkService,
    likeService,
    profileService,
    retweetService,
} from "../../appwrite";
import { NavLink } from "react-router-dom";
import { Query } from "appwrite";
import { Loader, ActionsCard } from "../index";

function PostEngagementsModal({ isOpen, onClose, tweetId }) {
    const [retweetsList, setRetweetsList] = useState([]);
    const [likesList, setLikesList] = useState([]);
    const [bookmarksList, setBookmarksList] = useState([]);
    const [currEngsCompo, setCurrEngsCompo] = useState("likes");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe = false;

        const fetchEngsData = async () => {
            if (!unsubscribe) {
                try {
                    const allRetweets = await retweetService.getRetweets([
                        Query.equal("tweetId", [tweetId]),
                    ]);

                    if (allRetweets.total !== 0) {
                        const usersId = allRetweets.documents.map(
                            (retweet) => retweet.userId
                        );

                        const usersData = await profileService.getProfiles([
                            Query.equal("$id", usersId),
                        ]);

                        setRetweetsList([...usersData.documents]);
                    }

                    const allLikes = await likeService.getLikes([
                        Query.equal("tweetId", [tweetId]),
                    ]);

                    if (allLikes.total !== 0) {
                        const usersId = allLikes.documents.map(
                            (like) => like.userId
                        );

                        const usersData = await profileService.getProfiles([
                            Query.equal("$id", usersId),
                        ]);

                        setLikesList([...usersData.documents]);
                    }

                    const allBookmarks = await bookmarkService.getBookmarks([
                        Query.equal("tweetId", [tweetId]),
                    ]);

                    if (allBookmarks.documents.length !== 0) {
                        const usersId = allBookmarks.documents.map(
                            (book) => book.userId
                        );

                        const usersData = await profileService.getProfiles([
                            Query.equal("$id", usersId),
                        ]);

                        setBookmarksList([...usersData.documents]);
                    }
                } catch (error) {
                    console.log("Engagements list fetching falied :: ", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchEngsData();

        return () => {
            unsubscribe = true;
        };
    }, []);

    if (!isOpen) return null;

    return createPortal(
        <div className="close-outer fixed top-0 left-0 right-0 bottom-0 z-[1000] bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white opacity-100 dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg dark:text-white dim:text-white p-5 rounded-xl shadow-lg relative 2xl:w-[40%] xl:w-[50%] lg:w-[50%] md:w-[60%] max-h-fit max-[702px]:h-screen max-[702px]:w-screen text-black">
                <div className="">
                    <button
                        className="rounded-lg m-3 absolute top-2.5 left-2.5 bg-none border-none text-2xl cursor-pointer"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 fill-black dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                            </g>
                        </svg>
                    </button>

                    <div className="flex justify-center">
                        <svg
                            viewBox="0 0 24 24"
                            aria-label="X"
                            role="img"
                            className="w-7 dark:invert dim:invert r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-16y2uox r-lwhw9o"
                        >
                            <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </g>
                        </svg>
                    </div>
                </div>

                <div className="top flex top-0 backdrop-blur-3xl opacity-80 border-b border-b-zinc-200 dark:border-gray-600 dim:border-gray-600">
                    <NavLink
                        className={`left w-1/2 px-3 flex justify-center font-bold text-base hover:bg-gray-300 dark:hover:bg-slate-700 dim:hover:bg-slate-600`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrEngsCompo("likes");
                        }}
                    >
                        <div
                            className={`py-4 ${
                                currEngsCompo === "likes"
                                    ? "text-black border-b-4 border-twitter-blue yellow:border-twitter-yellow crimson:border-twitter-crimson purple:border-twitter-purple orange:border-twitter-orange green:border-twitter-green dark:text-white dim:text-white"
                                    : "text-gray-600 dark:text-gray-400 dim:text-gray-400"
                            }`}
                        >
                            Likes
                        </div>
                    </NavLink>
                    <NavLink
                        className={`left w-1/2 px-3 flex justify-center font-bold text-base hover:bg-gray-300 dark:hover:bg-slate-700 dim:hover:bg-slate-600`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrEngsCompo("retweets");
                        }}
                    >
                        <div
                            className={`py-4 ${
                                currEngsCompo === "retweets"
                                    ? "text-black border-b-4 border-twitter-blue yellow:border-twitter-yellow crimson:border-twitter-crimson purple:border-twitter-purple orange:border-twitter-orange green:border-twitter-green dark:text-white dim:text-white"
                                    : "text-gray-600 dark:text-gray-400 dim:text-gray-400"
                            }`}
                        >
                            Retweets
                        </div>
                    </NavLink>
                    <NavLink
                        className={`left w-1/2 px-3 flex justify-center font-bold text-base hover:bg-gray-300 dark:hover:bg-slate-700 dim:hover:bg-slate-600`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrEngsCompo("bookmarks");
                        }}
                    >
                        <div
                            className={`py-4 ${
                                currEngsCompo === "bookmarks"
                                    ? "text-black border-b-4 border-twitter-blue yellow:border-twitter-yellow crimson:border-twitter-crimson purple:border-twitter-purple orange:border-twitter-orange green:border-twitter-green dark:text-white dim:text-white"
                                    : "text-gray-600 dark:text-gray-400 dim:text-gray-400"
                            }`}
                        >
                            Bookmarks
                        </div>
                    </NavLink>
                </div>

                {/* engagements list */}
                <div className="h-[50vh] max-[702px]:h-screen overflow-y-auto">
                    {loading ? (
                        <Loader />
                    ) : (
                        (() => {
                            switch (currEngsCompo) {
                                case "likes":
                                    return likesList.map((user) => (
                                        <ActionsCard
                                            key={user.$id}
                                            name={user.name}
                                            username={user.username}
                                            media={user.avatar}
                                            userId={user.$id}
                                        />
                                    ));
                                case "retweets":
                                    return retweetsList.map((user) => (
                                        <ActionsCard
                                            key={user.$id}
                                            name={user.name}
                                            username={user.username}
                                            media={user.avatar}
                                            userId={user.$id}
                                        />
                                    ));
                                case "bookmarks":
                                    return bookmarksList.map((user) => (
                                        <ActionsCard
                                            key={user.$id}
                                            name={user.name}
                                            username={user.username}
                                            media={user.avatar}
                                            userId={user.$id}
                                        />
                                    ));
                                default:
                                    return null;
                            }
                        })()
                    )}
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default PostEngagementsModal;
