import { useState } from "react";
import { SettingItemsContainer, BackButton } from "../../index";

function PushNotifications() {
    const [isChecked, setIsChecked] = useState(false);

    document.title = "Push notifications / X";

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <SettingItemsContainer>
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <BackButton />
                    <div className="font-bold text-xl py-3">
                        Push notifications
                    </div>
                </div>
            </div>
            <div>
                <div className="flex px-2 my-1 justify-between w-full">
                    <div className="text-[15px] my-auto">
                        Push notifications
                    </div>

                    <div className="my-auto px-4">
                        <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={isChecked}
                                    onChange={handleToggle}
                                />
                                <div
                                    className={`block w-10 h-6 rounded-full ${
                                        isChecked
                                            ? "bg-twitter-blue yellow:bg-twitter-yellow crimson:bg-twitter-crimson purple:bg-twitter-purple orange:bg-twitter-orange green:bg-twitter-green"
                                            : "bg-gray-300"
                                    }`}
                                ></div>
                                <div
                                    className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                                        isChecked
                                            ? "transform translate-x-4"
                                            : ""
                                    }`}
                                ></div>
                            </div>
                            <span className="ml-3 text-gray-700">
                                {isChecked ? "On" : "Off"}
                            </span>
                        </label>
                    </div>
                </div>
                <div className="py-1 px-2 text-[13px] text-gray-500">
                    Get push notifications to find out what&apos;s going on when
                    you&apos;re not on X. You can turn them off anytime.
                </div>
            </div>
        </SettingItemsContainer>
    );
}

export default PushNotifications;
