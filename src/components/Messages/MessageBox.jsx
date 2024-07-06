import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TypeBox from "./TypeBox";
import MessageEntity from "./MessageEntity";

function MessageBox() {
    const [message, setMessage] = useState(true);

    if (!message)
        return (
            <div className="flex items-center justify-center xl:flex-[0_0_43%] border-r">
                <div className="flex gap-10 px-8 flex-col w-[75%]">
                    <div>
                        <div className="text-3xl font-bold m-1">
                            Select a message
                        </div>
                        <div className="text-zinc-500 m-1">
                            Choose from your existing conversations, start a new
                            one, or just keep swimming
                        </div>
                    </div>
                    <span>
                        <NavLink className="text-[17px] font-bold text-white py-4 px-8 rounded-full  bg-twitter-blue">
                            New message
                        </NavLink>
                    </span>
                </div>
            </div>
        );
    return (
        <div className="xl:flex-[0_0_43%] border-r h-full sticky top-0 overflow-y-auto">
            <div className="top flex justify-between p-3 sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="px-1.5 font-bold text-[17px] flex">
                    <span>Elon Musk</span>
                    <span className="m-1">
                        <svg
                            viewBox="0 0 22 22"
                            aria-label="Verified account"
                            role="img"
                            className="w-5 fill-twitter-blue r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1 r-3t4u6i"
                            data-testid="icon-verified"
                        >
                            <g>
                                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                            </g>
                        </svg>
                    </span>
                </div>

                <div className="flex gap-4">
                    <NavLink className="m-0.5">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z"></path>
                            </g>
                        </svg>
                    </NavLink>
                </div>
            </div>
            
            {/* Chatting with */}
            <div className="p-4 flex flex-col items-center justify-center h-[30%] hover:bg-gray-100 cursor-pointer">
                <div>
                    <div>
                        <img
                            className="w-14 rounded-full"
                            src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
                            alt=""
                        />
                    </div>
                    <div className="flex gap-x-1">
                        <span className="font-bold">Elon Musk</span>
                        <span>
                            <svg
                                viewBox="0 0 22 22"
                                aria-label="Verified account"
                                role="img"
                                className="w-5 fill-twitter-blue r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1 r-3t4u6i"
                                data-testid="icon-verified"
                            >
                                <g>
                                    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                                </g>
                            </svg>
                        </span>
                    </div>
                    <div>@elonmusk</div>
                </div>
                <div className="text-center text-gray-900 text-[15px]">
                    Sharing things I&apos;m learning through my foundation work
                    and other interests.
                </div>
                <div className="text-zinc-400">
                    Joined July 2024 &middot; 60M Followers
                </div>
            </div>

            {/* Convo */}
            <div className="border-t min-h-[59%]">
                <MessageEntity />
                <MessageEntity sender={false} />
                <MessageEntity />
                <MessageEntity />
                <MessageEntity sender={false} />
                <MessageEntity />
                <MessageEntity />
                <MessageEntity sender={false} />
                <MessageEntity />
                <MessageEntity sender={false} />
            </div>

            {/* typebox */}
            <div className="sticky bottom-0 bg-white">
                <TypeBox />
            </div>
        </div>
    );
}

export default MessageBox;
