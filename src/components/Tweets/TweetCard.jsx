function TweetCard() {
    return (
        <>
            <div className="post flex px-2 border border-t-0 pt-2 pb-2">
                {/* User avatar */}
                <div className="avatar w-[9%]">
                    <div className="m-1">
                        <img
                            className="w-full rounded-full"
                            src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
                            alt=""
                        />
                    </div>
                </div>

                <div className="content w-[90%]">
                    <div className="reposted flex">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-4 m-0.5 fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-10ptun7 r-1janqcz"
                        >
                            <g>
                                <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
                            </g>
                        </svg>

                        <span className="text-gray-500 font-bold text-sm">You reposted</span>
                    </div>

                    {/* User details */}
                    <div className="flex justify-between">
                        <div className="user-details mx-0.5 text-base">
                            <span className="mx-0.5 font-bold">
                                Abhishek Shukla
                            </span>
                            <span className="mx-0.5 text-zin font-light">
                                @username
                            </span>
                            <span className="mx-0.5 font-light">&middot;</span>
                            <span className="mx-0.5 font-light">
                                June 30, 2024
                            </span>
                        </div>
                        <div className="mx-0.5">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-5 m-1 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2"
                            >
                                <g>
                                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* User content */}
                    <div className="text mx-1.5 my-1">
                        OUR LATEST #INNOVATION... turns obstacles into
                        opportunities, bringing the last citizen in remote
                        mountains into 5G connectivity. #DigitalIndia Full video
                        here: https://youtu.be/Rw-QZuGVP3o
                    </div>
                    <div className="image m-1.5">
                        <img
                            className="rounded-lg"
                            src="https://pbs.twimg.com/media/Fu3x2XAWYAAbcdR?format=jpg&name=small"
                            alt=""
                        />
                    </div>

                    {/* Bottom Interactions */}
                    <div className="flex justify-between">
                        <div className="flex w-[92%]">
                            <div className="flex mr-auto">
                                <span className="m-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                                    >
                                        <g>
                                            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="text-gray-500">comm..</span>
                            </div>
                            <div className="flex mr-auto">
                                <span className="m-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                                    >
                                        <g>
                                            <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="text-gray-500">repo..</span>
                            </div>
                            <div className="flex mr-auto">
                                <span className="m-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                                    >
                                        <g>
                                            <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="text-gray-500">likes</span>
                            </div>
                            <div className="flex mr-auto">
                                <span className="m-1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                                    >
                                        <g>
                                            <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
                                        </g>
                                    </svg>
                                </span>
                                <span className="text-gray-500">anay</span>
                            </div>
                        </div>

                        {/* BookMark and share */}
                        <div className="flex p-1 mx-0.5">
                            <div className="mx-1">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                                >
                                    <g>
                                        <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="mx-1">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                                >
                                    <g>
                                        <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TweetCard;
