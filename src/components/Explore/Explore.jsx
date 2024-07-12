import { useState } from "react";
import TweetCard from "../Tweets/TweetCard";
import NavigationMobile from "../Header/NavigationMobile";

function Explore() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div className="flex p-2 border-l border-r">
                {/* Navigation Mobile */}
                <div className="my-3 hidden max-[499px]:flex">
                    <div className="w-1/2 " onClick={() => setIsOpen(true)}>
                        <img
                            className="w-8 rounded-full mx-3"
                            src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
                            alt="navigation menu"
                        />
                    </div>
                    <NavigationMobile isOpen={isOpen} onClose={handleClose} />
                </div>
                
                <form className="max-w-md p-1 mx-auto w-full">
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
                            className="block w-full p-2 ps-10 text-base text-gray-900 border border-gray-300 rounded-full  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search a post"
                            required
                        />
                    </div>
                </form>
            </div>
            <div>
                {/* Tweet Card */}
            </div>
        </div>
    );
}

export default Explore;
