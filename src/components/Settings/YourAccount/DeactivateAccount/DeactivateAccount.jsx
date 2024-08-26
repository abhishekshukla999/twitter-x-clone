import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { profileMediaService } from "../../../../appwrite";
import { Input, SettingItemsContainer, BackButton } from "../../../index";

function DeactivateAccount() {
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState(false);
    const profileData = useSelector((state) => state.profile);

    const avatarUrl = () => {
        return profileData?.avatar
            ? profileMediaService.getFilePreview(profileData.avatar)
            : "/defaultAvatar.png";
    };

    document.title = "Deactivate account / X";

    return !confirm ? (
        <SettingItemsContainer>
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <BackButton />
                    <div className="font-bold text-xl py-3">
                        Deactivate account
                    </div>
                </div>
            </div>

            <div>
                <div className="border-b dark:border-gray-800 dim:border-gray-800">
                    <NavLink
                        className="p-3 flex hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800"
                        to={`/${profileData.username}`}
                    >
                        <div className="min-w-[40px] max-w-[43px] my-auto">
                            <img
                                src={avatarUrl()}
                                alt="avatar"
                                className="w-full rounded-full"
                                loading="lazy"
                            />
                        </div>
                        <div className="text-[15px] px-1.5 my-auto leading-5">
                            <div className="font-bold">{profileData.name}</div>
                            <div className="text-gray-500">
                                @{profileData.username}
                            </div>
                        </div>
                        {profileData?.premiumMember && (
                            <span>
                                <svg
                                    viewBox="0 0 22 22"
                                    aria-label="Verified account"
                                    role="img"
                                    className="w-5 fill-blue-500 m-1 r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1"
                                    data-testid="icon-verified"
                                >
                                    <g>
                                        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                                    </g>
                                </svg>
                            </span>
                        )}
                    </NavLink>
                    <div className="p-3 text-xl font-bold">
                        This will deactivate your account
                    </div>
                    <div className="p-3 text-[13px] text-gray-500">
                        You&apos;re about to start the process of deactivating
                        your X account. Your display name, @username, and public
                        profile will no longer be viewable on X.com, X for iOS,
                        or X for Android.
                    </div>
                    <div className="p-3 text-xl font-bold">
                        What else you should know
                    </div>
                    <div className="p-3 text-[13px] text-gray-500">
                        You can restore your X account if it was accidentally or
                        wrongfully deactivated for up to 30 days after
                        deactivation.
                    </div>
                </div>
                <div>
                    <div className="border-b p-3 dark:border-gray-800 dim:border-gray-800 text-[13px] text-gray-500">
                        Some account information may still be available in
                        search engines, such as Google or Bing. {""}
                        <Link
                            to="https://help.x.com/en/safety-and-security/remove-x-profile-from-google-search"
                            target="_blank"
                            className="hover:underline cursor-pointer text-twitter-blue hover:text-sky-600 yellow:text-twitter-yellow yellow:hover:text-yellow-600 crimson:text-twitter-crimson crimson:hover:text-rose-600 purple:text-twitter-purple purple:hover:text-purple-600 orange:text-twitter-orange orange:hover:text-orange-600 green:text-twitter-green green:hover:text-green-600"
                        >
                            Learn more
                        </Link>
                    </div>
                    <div className="border-b p-3 dark:border-gray-800 dim:border-gray-800 text-[13px] text-gray-500">
                        If you just want to change your @username, you
                        don&apos;t need to deactivate your account — edit it in
                        your {""}
                        <Link
                            to="/settings/your_twitter_data/account"
                            className="hover:underline cursor-pointer text-twitter-blue hover:text-sky-600 yellow:text-twitter-yellow yellow:hover:text-yellow-600 crimson:text-twitter-crimson crimson:hover:text-rose-600 purple:text-twitter-purple purple:hover:text-purple-600 orange:text-twitter-orange orange:hover:text-orange-600 green:text-twitter-green green:hover:text-green-600"
                        >
                            settings.
                        </Link>
                    </div>
                    <div className="border-b dark:border-gray-800 dim:border-gray-800 p-3 text-[13px] text-gray-500">
                        To use your current @username or email address with a
                        different X account,
                        <Link
                            to="/settings/your_twitter_data/account"
                            className="hover:underline cursor-pointer text-twitter-blue hover:text-sky-600 yellow:text-twitter-yellow yellow:hover:text-yellow-600 crimson:text-twitter-crimson crimson:hover:text-rose-600 purple:text-twitter-purple purple:hover:text-purple-600 orange:text-twitter-orange orange:hover:text-orange-600 green:text-twitter-green green:hover:text-green-600"
                        >
                            {""} change{" "}
                        </Link>
                        them before you deactivate this account.
                    </div>
                    <div className="border-b dark:border-gray-800 dim:border-gray-800 p-3 text-[13px] text-gray-500">
                        If you want to download
                        <span className="hover:underline cursor-pointer text-twitter-blue hover:text-sky-600 yellow:text-twitter-yellow yellow:hover:text-yellow-600 crimson:text-twitter-crimson crimson:hover:text-rose-600 purple:text-twitter-purple purple:hover:text-purple-600 orange:text-twitter-orange orange:hover:text-orange-600 green:text-twitter-green green:hover:text-green-600">
                            {""} your X data{" "}
                        </span>
                        , you&apos;ll need to complete both the request and
                        download process before deactivating your account. Links
                        to download your data cannot be sent to deactivated
                        accounts.
                    </div>
                </div>
                <div className="p-3 border-b dark:border-gray-800 dim:border-gray-800 text-base underline text-red-400">
                    Note: This is dummy page and it won&apos;t deactivate your
                    account. This feature will be enabled in future updates.
                </div>
                <div className="my-1 box-border">
                    <button
                        type="submit"
                        className="py-3 px-4 text-center w-full text-red-500 hover:bg-red-100"
                        onClick={() => setConfirm(true)}
                    >
                        Deactivate
                    </button>
                </div>
            </div>
        </SettingItemsContainer>
    ) : (
        <SettingItemsContainer>
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <NavLink
                        className="m-0.5 my-auto p-2 hover:bg-gray-200 rounded-full"
                        onClick={() => navigate(-1)}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                            </g>
                        </svg>
                    </NavLink>
                    <div className="font-bold text-xl py-3">
                        Confirm your password
                    </div>
                </div>
            </div>

            <div>
                <div className="border-b">
                    <div className="py-3 px-3 text-xl font-bold">
                        Confirm your password
                    </div>
                    <div className="p-3 text-[13px] text-gray-500">
                        Complete your deactivation request by entering the
                        password associated with your account.
                    </div>
                </div>
                <div>
                    <div className="border-b p-3">
                        <Input label="Password" />
                        <button className="text-[13px] px-2 text-twitter-blue hover:underline">
                            Forgot password?
                        </button>
                    </div>
                </div>
                <div className="flex justify-end px-2 py-3">
                    <button
                        type="submit"
                        className="py-1.5 px-4 text-white font-bold bg-red-500 rounded-full hover:bg-red-600"
                    >
                        Deactivate
                    </button>
                </div>
            </div>
        </SettingItemsContainer>
    );
}

export default DeactivateAccount;
