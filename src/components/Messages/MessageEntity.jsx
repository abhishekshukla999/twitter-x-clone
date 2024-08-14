import React from "react";

function MessageEntity({ message = "", sender = true }) {
    return (
        <div
            className={`flex gap-2 my-3 ${
                sender ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`${
                    sender
                        ? "bg-twitter-blue yellow:bg-twitter-yellow yellow:hover:bg-yellow-600 crimson:bg-twitter-crimson crimson:hover:bg-rose-600 purple:bg-twitter-purple purple:hover:bg-purple-600 orange:bg-twitter-orange orange:hover:bg-orange-600 green:bg-twitter-green green:hover:bg-green-600 text-white rounded-l-3xl rounded-tr-3xl"
                        : "bg-gray-200 dark:bg-gray-900 dark:text-white dim:bg-slate-600 dim:text-white rounded-r-3xl rounded-tl-3xl"
                } p-3 w-[45%] order-1`}
            >
                <div className="w-full break-words">
                    my send messagedwddwdwdwdwdwwwwwwdwwad
                </div>
            </div>
            <div className={`${sender ? "order-none" : "order-2"} p-3`}>
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-5 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03 r-jwb30u"
                >
                    <g>
                        <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                    </g>
                </svg>
            </div>
        </div>
    );
}

export default MessageEntity;
