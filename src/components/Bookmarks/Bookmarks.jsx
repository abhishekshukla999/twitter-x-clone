import React from "react";
import { NavLink } from "react-router-dom";
import TweetCard from "../Tweets/TweetCard";

function Bookmarks() {
    return (
        <div>
            <div className="top flex justify-between p-3 sticky top-0 backdrop-blur-3xl opacity-[100%] border-l border-r">
                <NavLink className="px-1.5 font-bold text-xl">
                    <div>Bookmarks</div>
                    <div className="text-sm font-light text-gray-600">@username</div>
                </NavLink>

                <div className="flex gap-4">
                    <NavLink className="m-0.5">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                        >
                            <g>
                                <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                            </g>
                        </svg>
                    </NavLink>
                </div>
            </div>

            <TweetCard/>
            <TweetCard/>
            <TweetCard/>
            <TweetCard/>
        </div>
    );
}

export default Bookmarks;
