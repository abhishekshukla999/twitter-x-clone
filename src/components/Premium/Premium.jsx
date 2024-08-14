import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Premium() {
    const profileData = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const [basic, setBasic] = useState({
        name: "Basic",
        price: "₹215.87/month",
        status: false,
    });
    const [premium, setPremium] = useState({
        name: "Premium",
        price: "₹566.67/month",
        status: true,
    });
    const [premiumPlus, setPremiumPlus] = useState({
        name: "Premium+",
        price: "₹1,133.3/month",
        status: false,
    });

    const [selectedPlan, setSelectedPlan] = useState(premium);

    const handleBasic = () => {
        setBasic((prev) => ({ ...prev, status: true }));
        setPremium((prev) => ({ ...prev, status: false }));
        setPremiumPlus((prev) => ({ ...prev, status: false }));

        setSelectedPlan(basic);
    };
    const handlePremium = () => {
        setPremium((prev) => ({ ...prev, status: true }));
        setBasic((prev) => ({ ...prev, status: false }));
        setPremiumPlus((prev) => ({ ...prev, status: false }));

        setSelectedPlan(premium);
    };
    const handlePremiumPlus = () => {
        setPremiumPlus((prev) => ({ ...prev, status: true }));
        setBasic((prev) => ({ ...prev, status: false }));
        setPremium((prev) => ({ ...prev, status: false }));

        setSelectedPlan(premiumPlus);
    };

    return profileData?.premiumMember ? (
        <div className="overflow-y-auto h-screen w-full">
            <div className="top flex p-2 sticky z-50 border-b dark:border-gray-800 dim:border-gray-800 top-0 backdrop-blur-[400px] opacity-[100%]">
                <NavLink
                    className="left my-auto p-3 hover:bg-gray-200 dark:hover:bg-slate-800 dim:hover:bg-slate-700 rounded-full"
                    onClick={() => navigate(-1)}
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-5 dark:fill-white dim:fill-white m-auto r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                    >
                        <g>
                            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                        </g>
                    </svg>
                </NavLink>

                <div className="right ml-4 my-auto">
                    <p className="font-bold text-xl">Premium</p>
                </div>
            </div>
            <div>
                <h1 className="text-4xl font-bold p-4 text-center">
                    You&apos;re already subscribed !!
                </h1>
                <p className="text-gray-400 text-center mx-2">
                    Enjoy an enhanced experience, exclusive creator tools,
                    top-tier verification and security.
                </p>
            </div>
        </div>
    ) : (
        <div className="overflow-y-auto h-screen w-full">
            <div className="top flex p-2 sticky z-50 border-b top-0 dark:border-gray-800 dim:border-gray-800 backdrop-blur-[400px] opacity-[100%]">
                <NavLink
                    className="left my-auto p-3 hover:bg-gray-200 dark:hover:bg-slate-800 dim:hover:bg-slate-700 rounded-full"
                    onClick={() => navigate(-1)}
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-5 dark:fill-white dim:fill-white m-auto r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                    >
                        <g>
                            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                        </g>
                    </svg>
                </NavLink>

                <div className="right ml-4 my-auto">
                    <p className="font-bold text-xl">Premium</p>
                </div>
            </div>
            <div>
                <h1 className="text-4xl font-bold p-4 text-center">
                    Upgrade to Premium
                </h1>
                <p className="text-gray-400 text-center">
                    Enjoy an enhanced experience, exclusive creator tools,
                    top-tier verification and security.
                </p>

                <div className="flex flex-wrap gap-2 justify-center items-center max-[1180px]:flex-col">
                    <div
                        className="m-6 rounded-lg focus:ring cursor-pointer"
                        onClick={handleBasic}
                    >
                        <div className="flex justify-between p-2 text-2xl">
                            <label htmlFor="basic">Basic</label>
                            <input
                                className="w-6 cursor-pointer"
                                type="radio"
                                name="premiumVersion"
                                id="basic"
                                checked={basic.status}
                            />
                        </div>
                        <div>
                            <div className="p-2">
                                <span className="text-3xl font-bold">
                                    ₹215.87
                                </span>
                                <span>/month</span>
                            </div>
                            <div className="text-sm p-2">
                                ₹2,590.48 billed annually{" "}
                                <span className="bg-green-100 text-green-800 font-bold">
                                    SAVE 11%
                                </span>
                            </div>
                        </div>
                        <ul className="list-none flex flex-col gap-1 p-2">
                            <li>
                                &#10003;
                                <span className="mx-1">Edit Tweets</span>
                            </li>
                            <li className="flex">
                                &#10003;
                                <span className="mx-1">Verfied Blue tick </span>
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
                            </li>
                            <li>
                                {" "}
                                &#10003;
                                <span className="mx-1">Download Media</span>
                            </li>
                        </ul>
                    </div>
                    <div
                        className="m-6 rounded-lg focus:ring cursor-pointer"
                        onClick={handlePremium}
                    >
                        <div className="flex justify-between p-2 text-2xl">
                            <label htmlFor="premium">
                                Premium{" "}
                                <small className="font-light text-base mr-3">
                                    &#40;recommended&#41;
                                </small>
                            </label>
                            <input
                                className="w-6"
                                type="radio"
                                name="premiumVersion"
                                id="premium"
                                checked={premium.status}
                            />
                        </div>
                        <div>
                            <div className="p-2">
                                <span className="text-3xl font-bold">
                                    ₹566.67
                                </span>
                                <span>/month</span>
                            </div>
                            <div className="text-sm p-2">
                                ₹6,800 billed annually{" "}
                                <span className="bg-green-100 text-green-800 font-bold">
                                    SAVE 12%
                                </span>
                            </div>
                        </div>
                        <ul className="list-none flex flex-col gap-1 p-2">
                            <li>
                                &#10003;
                                <span className="mx-1">Edit Tweets</span>
                            </li>
                            <li className="flex">
                                &#10003;
                                <span className="mx-1">Verfied Blue tick </span>
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
                            </li>
                            <li>
                                {" "}
                                &#10003;
                                <span className="mx-1">Download Media</span>
                            </li>
                        </ul>
                    </div>
                    <div
                        className="m-6 rounded-lg focus:ring cursor-pointer"
                        onClick={handlePremiumPlus}
                    >
                        <div className="flex justify-between p-2 text-2xl">
                            <label htmlFor="premiumplus">Premium+</label>
                            <input
                                className="w-6"
                                type="radio"
                                name="premiumVersion"
                                id="premiumplus"
                                checked={premiumPlus.status}
                            />
                        </div>
                        <div>
                            <div className="p-2">
                                <span className="text-3xl font-bold">
                                    ₹1,133.3
                                </span>
                                <span>/month</span>
                            </div>
                            <div className="text-sm p-2">
                                ₹13,600 billed annually{" "}
                                <span className="bg-green-100 text-green-800 font-bold">
                                    SAVE 12%
                                </span>
                            </div>
                        </div>
                        <ul className="list-none flex flex-col gap-1 p-2">
                            <li>
                                &#10003;
                                <span className="mx-1">Edit Tweets</span>
                            </li>
                            <li className="flex">
                                &#10003;
                                <span className="mx-1">Verfied Blue tick </span>
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
                            </li>
                            <li>
                                {" "}
                                &#10003;
                                <span className="mx-1">Download Media</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="m-6 p-4 flex gap-1 flex-col justify-center items-center">
                    <div className="p-1 font-[500]">Your selected Plan</div>
                    <div className="p-1 font-[500]">{`${selectedPlan.name} ${selectedPlan.price}`}</div>
                    <button
                        type="submit"
                        className="font-bold mx-2 w-[70%] p-2 rounded-full text-white bg-twitter-blue"
                        onClick={() => navigate("/checkout")}
                    >
                        Subscribe and Pay
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Premium;
