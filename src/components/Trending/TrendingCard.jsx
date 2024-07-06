import React from "react";

function TrendingCard({ prefix, title, suffix }) {
    return (
        <>
            <div className="m-3">
                <div className="flex justify-between text-gray-500 text-sm">
                    <span>{prefix}</span>
                    <span>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                        >
                            <g>
                                <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                            </g>
                        </svg>
                    </span>
                </div>
                <div className="font-bold">{title}</div>
                <div className="text-gray-500 text-sm">{suffix}</div>
            </div>
        </>
    );
}

export default TrendingCard;
