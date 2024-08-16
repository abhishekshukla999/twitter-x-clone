import React from "react";
import { Link } from "react-router-dom";

function Error() {
    return (
        <section className="flex justify-center items-center bg-white dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-twitter-blue yellow:text-twitter-yellow crimson:text-twitter-crimson purple:text-twitter-purple  orange:text-twitter-orange green:text-twitter-green ">
                        404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white dim:text-white">
                        Something&apos;missing.
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400 dim:text-gray-300">
                        Sorry, we can&apos;t find that page. You&apos;ll find
                        lots to explore on the home page.{" "}
                    </p>
                    <Link
                        to="/home"
                        className="inline-flex text-white bg-twitter-blue hover:bg-sky-600 yellow:bg-twitter-yellow yellow:hover:bg-yellow-600 crimson:bg-twitter-crimson crimson:hover:bg-rose-600 purple:bg-twitter-purple purple:hover:bg-purple-600 orange:bg-twitter-orange orange:hover:bg-orange-600 green:bg-twitter-green green:hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                    >
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Error;
