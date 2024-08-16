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
                            />
                        </div>
                        <div className="text-[15px] px-1.5 my-auto leading-5">
                            <div className="font-bold">{profileData.name}</div>
                            <div className="text-gray-500">
                                @{profileData.username}
                            </div>
                        </div>
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
