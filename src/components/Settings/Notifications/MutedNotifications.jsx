import { SettingItemsContainer, BackButton } from "../../";

function MutedNotifications() {
    return (
        <SettingItemsContainer>
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <BackButton />
                    <div className="font-bold text-xl py-3">
                        Muted notifications
                    </div>
                </div>
            </div>

            <div>
                <div className="p-3 text-xl font-bold">
                    Mute notifications from people:
                </div>

                <div className="leading-5 py-4 px-2 w-full text-[15px] flex justify-between">
                    <p>You don&apos;t follow</p>
                    <input type="checkbox" className="w-6 cursor-pointer" />
                </div>
                <div className="leading-5 py-4 px-2 w-full text-[15px] flex justify-between">
                    <p>Who don&apos;lt follow you</p>
                    <input type="checkbox" className="w-6 cursor-pointer" />
                </div>
                <div className="leading-5 py-4 px-2 w-full text-[15px] flex justify-between">
                    <p>With a new account</p>
                    <input type="checkbox" className="w-6 cursor-pointer" />
                </div>
                <div className="leading-5 py-4 px-2 w-full text-[15px] flex justify-between">
                    <p>Who have a default profile photo</p>
                    <input type="checkbox" className="w-6 cursor-pointer" />
                </div>
                <div className="leading-5 py-4 px-2 w-full text-[15px] flex justify-between">
                    <p>Who haven&apos;t confirmed their email</p>
                    <input type="checkbox" className="w-6 cursor-pointer" />
                </div>
                <div className="leading-5 py-4 px-2 w-full text-[15px] flex justify-between">
                    <p>Who haven&apos;t confirmed their phone number</p>
                    <input type="checkbox" className="w-6 cursor-pointer" />
                </div>
                <div className="py-3 px-2 w-full text-[13px] text-gray-500">
                    These filters won&apos;t affect notifications from people
                    you follow.
                    <span className="text-twitter-blue hover:underline">
                        {""} Learn more
                    </span>
                </div>
            </div>
        </SettingItemsContainer>
    );
}

export default MutedNotifications;
