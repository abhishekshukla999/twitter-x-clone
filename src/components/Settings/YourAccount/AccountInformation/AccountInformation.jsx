import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { SettingItemsContainer, BackButton } from "../../../index";

function AccountInformation() {
    const profileData = useSelector((state) => state.profile);

    document.title = "Account information / X";

    // converting date to local
    const toLocalDate = (date) => {
        const toLocal = new Date(date);
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const formatTime = (hours, minutes, seconds) => {
            const isPM = hours >= 12;
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes.toString().padStart(2, "0");
            const formattedSeconds = seconds.toString().padStart(2, "0");
            const period = isPM ? "PM" : "AM";
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
        };

        const convertedDate = {
            date: toLocal.getDate(),
            month: months[toLocal.getMonth()],
            year: toLocal.getFullYear(),
            hours: toLocal.getHours(),
            minutes: toLocal.getMinutes(),
            seconds: toLocal.getSeconds(),
        };

        const time = formatTime(
            convertedDate.hours,
            convertedDate.minutes,
            convertedDate.seconds
        );

        return { ...convertedDate, time };
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Adjust age if the current date is before the birth date in the current year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    };

    const accountDateAndTime = toLocalDate(profileData?.$createdAt);
    const birthDate = toLocalDate(profileData?.dob);
    const age = calculateAge(profileData?.dob);

    return (
        <SettingItemsContainer>
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <BackButton />
                    <div className="font-bold text-xl py-3">
                        Account information
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div className="border-b dark:border-gray-800 dim:border-gray-800">
                        <NavLink
                            to="/settings/screen_name"
                            className="flex py-3 px-2 justify-between w-full hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800 "
                        >
                            <div className="leading-5">
                                <div className="text-[15px]">Username</div>
                                <div className="text-[13px] text-gray-500">
                                    @{profileData?.username || ""}
                                </div>
                            </div>
                            <div className="my-auto py-2 px-4">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
                                >
                                    <g>
                                        <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
                                    </g>
                                </svg>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/settings/phone"
                            className="flex py-3 px-2 justify-between w-full hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800 "
                        >
                            <div className="leading-5 mr-6">
                                <div className="text-[15px]">Phone</div>
                                <div className="text-[13px] text-gray-500">
                                    {profileData?.phone || ""}
                                </div>
                            </div>
                            <div className="my-auto py-2 px-4">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
                                >
                                    <g>
                                        <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
                                    </g>
                                </svg>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/settings/email"
                            className="flex py-3 px-2 justify-between w-full hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800 "
                        >
                            <div className="leading-5 mr-6">
                                <div className="text-[15px]">Email</div>
                                <div className="text-[13px] text-gray-500">
                                    {profileData?.email || ""}
                                </div>
                            </div>
                            <div className="my-auto py-2 px-4">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
                                >
                                    <g>
                                        <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
                                    </g>
                                </svg>
                            </div>
                        </NavLink>
                        <div className="py-3 px-2 leading-5 w-full">
                            <div className="text-[15px] flex">
                                <span>Verified</span>
                                {profileData.premiumMember && (
                                    <span>
                                        <svg
                                            viewBox="0 0 22 22"
                                            aria-label="Verified account"
                                            role="img"
                                            className="w-5 fill-twitter-blue r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-1cvl2hr r-f9ja8p r-og9te1"
                                            data-testid="icon-verified"
                                        >
                                            <g>
                                                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                                            </g>
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <div className="text-[13px] text-gray-500">
                                {profileData?.premiumMember ? "Yes. " : "No. "}
                                <span className="hover:underline cursor-pointer text-twitter-blue hover:text-sky-600 yellow:text-twitter-yellow yellow:hover:text-yellow-600 crimson:text-twitter-crimson crimson:hover:text-rose-600 purple:text-twitter-purple purple:hover:text-purple-600 orange:text-twitter-orange orange:hover:text-orange-600 green:text-twitter-green green:hover:text-green-600">
                                    Learn more
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="border-b dark:border-gray-800 dim:border-gray-800">
                        <div className="py-3 px-2 leading-5 mr-6 w-full">
                            <div className="text-[15px]">Account creation</div>
                            <div className="text-[13px] text-gray-500">
                                {`${accountDateAndTime.month} ${accountDateAndTime.date}, ${accountDateAndTime.year}, ${accountDateAndTime.time}`}
                            </div>
                        </div>
                    </div>
                    <div className="border-b dark:border-gray-800 dim:border-gray-800">
                        <NavLink
                            to="/settings/country"
                            className="flex py-3 px-2 justify-between w-full hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800 "
                        >
                            <div className="leading-5 mr-6">
                                <div className="text-[15px]">Country</div>
                                <div className="text-[13px] text-gray-500">
                                    {profileData?.country || "Add your country"}
                                </div>
                            </div>
                            <div className="my-auto py-2 px-4">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
                                >
                                    <g>
                                        <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
                                    </g>
                                </svg>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/settings/your_twitter_data/gender"
                            className="flex py-3 px-2 justify-between w-full hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800 "
                        >
                            <div className="leading-5 mr-6">
                                <div className="text-[15px]">Gender</div>
                                <div className="text-[13px] text-gray-500">
                                    {profileData?.gender || "Add your gender"}
                                </div>
                            </div>
                            <div className="my-auto py-2 px-4">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
                                >
                                    <g>
                                        <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
                                    </g>
                                </svg>
                            </div>
                        </NavLink>
                        <div className="py-3 px-2 leading-5 mr-6 w-full">
                            <div className="text-[15px]">Birth date</div>
                            <div className="text-[13px] text-gray-500">
                                {`${birthDate.month} ${birthDate.date}, ${birthDate.year}`}
                            </div>
                            <div className="text-[13px] text-gray-500">
                                Add your date of birth to your{" "}
                                <Link
                                    to={`/${profileData?.username}`}
                                    className="hover:underline text-twitter-blue hover:text-sky-600 yellow:text-twitter-yellow yellow:hover:text-yellow-600 crimson:text-twitter-crimson crimson:hover:text-rose-600 purple:text-twitter-purple purple:hover:text-purple-600 orange:text-twitter-orange orange:hover:text-orange-600 green:text-twitter-green green:hover:text-green-600"
                                >
                                    profile.
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <NavLink
                            to="/settings/your_twitter_data/age"
                            className="flex py-3 px-2 justify-between w-full hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800 "
                        >
                            <div className="leading-5 mr-6">
                                <div className="text-[15px]">Age</div>
                                <div className="text-[13px] text-gray-500">
                                    {age}
                                </div>
                            </div>
                            <div className="my-auto py-2 px-4">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-gray-500 r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-14j79pv r-1q142lx r-2dysd3"
                                >
                                    <g>
                                        <path d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"></path>
                                    </g>
                                </svg>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </SettingItemsContainer>
    );
}

export default AccountInformation;
