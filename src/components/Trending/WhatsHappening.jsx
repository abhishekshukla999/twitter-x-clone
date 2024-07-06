import React from "react";
import TrendingCard from "./TrendingCard";

function WhatsHappening() {
    return (
        <>
            <div className="mt-6 border border-zinc-200 rounded-xl">
                <h1 className="m-3 font-bold text-xl">What&apos;s Happening</h1>

                <div className="flex mx-3 my-4 max-w-[20rem]">
                    <span className="mx-2">
                        <img className="w-[79px] h-[79px] rounded-xl" src="/Live.jpg" alt="live now image" />
                    </span>
                    <span>
                        <p className="font-bold">England vs Switzerland</p>
                        <p className="text-gray-500 text-sm">UEFA European Championship &middot; LIVE</p>
                    </span>
                </div>

                <TrendingCard
                    prefix="Trending in India"
                    title="BCCI"
                    suffix="200.4K posts"
                />
                <TrendingCard
                    prefix="Sports &middot; Trending"
                    title="#Siraj"
                    suffix="19.3K posts"
                />
                <TrendingCard
                    prefix="Entertainment &middot; Trending"
                    title="Avatar 3"
                    suffix="10K posts"
                />
                <TrendingCard
                    prefix="Finance &middot; Trending"
                    title="#Doge"
                    suffix="5K posts"
                />

                <div className="m-3 p-1 text-twitter-blue text-base">
                    Show more
                </div>
            </div>
        </>
    );
}

export default WhatsHappening;
