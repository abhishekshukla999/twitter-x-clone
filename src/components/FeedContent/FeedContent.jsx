import React from "react";
import { NavLink } from "react-router-dom";
import { TweetCard, TweetForm } from "../index";

function FeedContent() {
    return (
        <div>
            <div className="top flex p-3 sticky top-0 backdrop-blur-3xl opacity-[100%] border-b border-l border-r border-b-zinc-200">
                <NavLink className="left w-1/2 flex justify-center font-bold text-base">
                    For You
                </NavLink>

                <NavLink className="right w-1/2 flex justify-center font-bold text-base">
                    Following
                </NavLink>
            </div>
            {/* TweetForm */}
            <TweetForm />

            {/* TweetCard */}
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
            <TweetCard />
        </div>
    );
}

export default FeedContent;
