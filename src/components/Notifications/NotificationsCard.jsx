function NotificationsCard() {
    return (
        <div className="flex py-2 px-6">
            <div className="mx-1 my-3">
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-8 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-yucp9h"
                >
                    <g>
                        <path
                            d="M22.99 11.295l-6.986-2.13-.877-.326-.325-.88L12.67.975c-.092-.303-.372-.51-.688-.51-.316 0-.596.207-.688.51l-2.392 7.84-1.774.657-6.148 1.82c-.306.092-.515.372-.515.69 0 .32.21.6.515.69l7.956 2.358 2.356 7.956c.09.306.37.515.69.515.32 0 .6-.21.69-.514l1.822-6.15.656-1.773 7.84-2.392c.303-.09.51-.37.51-.687 0-.316-.207-.596-.51-.688z"
                            fill="#794BC4"
                        ></path>
                    </g>
                </svg>
            </div>
            <div className="m-1 w-[92%]">
                <div className="flex justify-between m-2">
                    <span>
                        <img
                            className="w-8 rounded-full"
                            src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
                            alt=""
                        />
                    </span>
                    <span>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
                        >
                            <g>
                                <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                            </g>
                        </svg>
                    </span>
                </div>
                <div className="font-bold m-2">Elon Musk</div>

                <div className="text-gray-500 m-2">
                    Recently posted Notifications
                </div>
            </div>
        </div>
    );
}

export default NotificationsCard;
