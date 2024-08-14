import { NavLink } from "react-router-dom";
import ChatItem from "./ChatItem";
import { MobileNavIcon } from "..";

function MessagesList() {
    const mess = true;

    return (
        <div className="flex flex-col xl:flex-[0_0_34%] max-[1553px]:flex-[0_0_55%] border-b-0 border-t-0 h-screen dark:border-gray-800 dim:border-gray-800">
            <div className="top flex justify-between p-3 sticky top-0 backdrop-blur-3xl opacity-[100%] border-r border-l dark:border-gray-800 dim:border-gray-800">
                {/* Navigation Mobile */}
                <MobileNavIcon />
                <NavLink className="px-1.5 my-auto font-bold text-xl">
                    Messages
                </NavLink>

                <div className="flex gap-4">
                    <NavLink className="m-0.5 my-auto">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z"></path>
                            </g>
                        </svg>
                    </NavLink>
                    <NavLink className="m-0.5 my-auto">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 dark:fill-white dim:fill-white  r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5V12h-2v-1.537l-8 3.635-8-3.635V18.5c0 .276.224.5.5.5H13v2H4.498c-1.381 0-2.5-1.119-2.5-2.5v-13zm2 2.766l8 3.635 8-3.635V5.5c0-.276-.224-.5-.5-.5h-15c-.276 0-.5.224-.5.5v2.766zM19 18v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"></path>
                            </g>
                        </svg>
                    </NavLink>
                </div>
            </div>

            <div className="p-2 border-r border-l dark:border-gray-800 dim:border-gray-800">
                <form className="max-w-md mx-0.5 p-1">
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
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
                            placeholder="Search Direct Messages"
                            required
                        />
                    </div>
                </form>
            </div>

            <div className="flex px-2 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800 text-base border-r border-l dark:border-gray-800 dim:border-gray-800">
                <div className="m-2 p-3 border rounded-full bg-white dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg dark:border-gray-500 dim:border-gray-500">
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-6 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1472mwg r-lrsllp r-18jsvk2"
                    >
                        <g>
                            <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5V13h-2v-2.537l-8 3.635-8-3.635V18.5c0 .276.224.5.5.5H11v2H4.498c-1.381 0-2.5-1.119-2.5-2.5v-13zm2 2.766l8 3.635 8-3.635V5.5c0-.276-.224-.5-.5-.5h-15c-.276 0-.5.224-.5.5v2.766zM19.429 16l-2 2H23v2h-5.571l2 2-1.414 1.414L13.601 19l4.414-4.414L19.429 16z"></path>
                        </g>
                    </svg>
                </div>

                <div className="my-2 p-3 font-[400] text-zinc-500 dark:text-white dim:text-white">
                    Message requests
                </div>
            </div>

            {!mess ? (
                <div className="border-l border-r dark:border-gray-800 dim:border-gray-800 h-screen">
                    <div className="flex gap-10 px-8 flex-col w-[75%]">
                        <div>
                            <div className="text-3xl font-bold m-1">
                                Welcome to your inbox!
                            </div>
                            <div className="text-zinc-500 m-1">
                                Drop a line, share posts and more with private
                                conversations between you and others on X.
                            </div>
                        </div>
                        <span>
                            <NavLink className="text-[17px] font-bold text-white py-4 px-8 rounded-full  bg-twitter-blue">
                                Write a message
                            </NavLink>
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col">
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                </div>
            )}
        </div>
    );
}

export default MessagesList;
