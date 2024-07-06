import React from "react";
import TrendingCard from "./TrendingCard";

function WhatsHappening() {
    return (
        <>
            <div className="mt-6 border border-zinc-200 rounded-xl">
                <h1 className="m-3 font-bold text-xl">What&apos;s Happening</h1>

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
