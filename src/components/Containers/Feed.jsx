import { useState } from "react";
import NavigationBottom from "../Header/NavigationBottom";
import { PostModal } from "../index";

function Feed({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <section className="xl:flex-[0_0_46%] lg:flex-[0_0_50%] md:flex-[0_0_70%] w-full max-w-full border-r border-l dark:border-gray-800 dim:border-gray-800">
            {children}

            <NavigationBottom />

            {/* tweet form modal */}
            <div className="fixed bottom-20 right-6 hidden max-[499px]:block">
                <button
                    className="bg-twitter-blue p-3 w-[56px] rounded-full hover:bg-sky-600 yellow:bg-twitter-yellow crimson:bg-twitter-crimson purple:bg-twitter-purple orange:bg-twitter-orange green:bg-twitter-green hidden max-xl:block"
                    onClick={() => setIsOpen(true)}
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1472mwg r-lrsllp"
                    >
                        <g>
                            <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                        </g>
                    </svg>
                </button>
            </div>
            <PostModal isOpen={isOpen} onClose={handleClose} />
            <div className="py-40"></div>
        </section>
    );
}

export default Feed;
