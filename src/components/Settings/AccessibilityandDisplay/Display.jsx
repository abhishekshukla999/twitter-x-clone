import { useEffect, useState } from "react";
import { SettingItemsContainer, BackButton } from "../../index";

function Display() {
    const [currentColor, setCurrentColor] = useState(
        localStorage.getItem("color") || "default"
    );
    const [currentTheme, setCurrentTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        const html = document.querySelector("html");

        // theme
        html.classList.remove("light", "dim", "dark");

        if (currentTheme) {
            html.classList.add(currentTheme);
            localStorage.setItem("theme", currentTheme);
        } else {
            const defaultTheme = "light";
            html.classList.add(defaultTheme);
            setCurrentTheme(defaultTheme);
            localStorage("theme", defaultTheme);
        }

        // color
        html.classList.remove(
            "default",
            "yellow",
            "crimson",
            "purple",
            "orange",
            "green"
        );

        if (currentColor) {
            html.classList.add(currentColor);
            localStorage.setItem("color", currentColor);
        } else {
            const defaultColor = "default";
            html.classList.add(defaultColor);
            setCurrentColor(defaultColor);
            localStorage.setItem("color", defaultColor);
        }
    }, [currentColor, currentTheme]);

    useEffect(() => {
        const html = document.querySelector("html");
        html.classList.remove(
            "default",
            "yellow",
            "crimson",
            "purple",
            "orange",
            "green"
        );

        if (!currentColor) {
            localStorage.setItem("color", "");
        }

        html.classList.add(currentColor);

        localStorage.setItem("color", currentColor);
    }, [currentColor]);

    document.title = "Display / X";

    return (
        <SettingItemsContainer>
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <BackButton />
                    <div className="font-bold text-xl py-3">Display</div>
                </div>
            </div>

            <div>
                <div className="py-3 px-2 text-[13px] text-gray-500">
                    Manage your font size, color, and background. These settings
                    affect all the X accounts on this browser.
                </div>

                <div className="flex border-b dark:border-gray-800 dim:border-gray-800 py-3 px-2">
                    <div className="w-20">
                        <img
                            src="/twitter.ico"
                            alt="avatar"
                            className="rounded-full"
                        />
                    </div>
                    <div className="px-2">
                        <div className="flex gap-1">
                            <span className="font-bold">X</span>
                            <span className="my-auto">
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
                            <span className="text-gray-500">@X</span>
                            <span className="text-gray-500">&middot;</span>
                            <span className="text-gray-500">15m</span>
                        </div>
                        <div className="text-gray-700">
                            At the heart of X are short messages called posts —
                            just like this one — which can include photos,
                            videos, links, text, hashtags, and mentions like{" "}
                            <span className="text-twitter-blue hover:text-sky-600 yellow:text-twitter-yellow yellow:hover:text-yellow-600 crimson:text-twitter-crimson crimson:hover:text-rose-600 purple:text-twitter-purple purple:hover:text-purple-600 orange:text-twitter-orange orange:hover:text-orange-600 green:text-twitter-green green:hover:text-green-600">
                                @X
                            </span>
                            .
                        </div>
                    </div>
                </div>

                <div className="border-b dark:border-gray-800 dim:border-gray-800">
                    <div className="px-2 py-3 text-xl font-bold">
                        Font size{" "}
                        <small className="text-red-400 font-light">
                            &#40;This feature will be availabe soon&#41;
                        </small>
                    </div>
                    <div className="flex px-2">
                        <span className="text-[13px] my-auto">Aa</span>
                        <div className="w-[90%] my-auto px-3 py-4">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="25"
                                name=""
                                id=""
                                className="w-full h-3"
                            />
                        </div>
                        <span className="text-[20px] my-auto">Aa</span>
                    </div>
                </div>

                <div className="border-b dark:border-gray-800 dim:border-gray-800">
                    <div className="px-2 pt-3 pb-1 text-xl font-bold">
                        Color
                    </div>
                    <div className="flex gap-2 px-2 flex-wrap justify-around py-4">
                        <div
                            className="p-2.5 h-fit rounded-full bg-[#1D9BF0] cursor-pointer"
                            onClick={() => setCurrentColor("default")}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className={`w-5 ${
                                    currentColor === "default"
                                        ? "fill-white"
                                        : "fill-[#1D9BF0]"
                                }  r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-jwli3a r-6zzn7w r-q1j0wu`}
                            >
                                <g>
                                    <path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path>
                                </g>
                            </svg>
                        </div>
                        <div
                            className="p-2.5 h-fit rounded-full bg-[#FFD400] cursor-pointer"
                            onClick={() => setCurrentColor("yellow")}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className={`w-5 ${
                                    currentColor === "yellow"
                                        ? "fill-white"
                                        : "fill-[#FFD400]"
                                } r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-jwli3a r-6zzn7w r-q1j0wu`}
                            >
                                <g>
                                    <path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path>
                                </g>
                            </svg>
                        </div>
                        <div
                            className="p-2.5 h-fit rounded-full bg-[#F91880] cursor-pointer"
                            onClick={() => setCurrentColor("crimson")}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className={`w-5 ${
                                    currentColor === "crimson"
                                        ? "fill-white"
                                        : "fill-[#F91880]"
                                } r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-jwli3a r-6zzn7w r-q1j0wu`}
                            >
                                <g>
                                    <path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path>
                                </g>
                            </svg>
                        </div>
                        <div
                            className="p-2.5 h-fit rounded-full bg-[#7856FF] cursor-pointer"
                            onClick={() => setCurrentColor("purple")}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className={`w-5 ${
                                    currentColor === "purple"
                                        ? "fill-white"
                                        : "fill-[#7856FF]"
                                } r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-jwli3a r-6zzn7w r-q1j0wu`}
                            >
                                <g>
                                    <path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path>
                                </g>
                            </svg>
                        </div>
                        <div
                            className="p-2.5 h-fit rounded-full bg-[#FF7A00] cursor-pointer"
                            onClick={() => setCurrentColor("orange")}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className={`w-5 ${
                                    currentColor === "orange"
                                        ? "fill-white"
                                        : "fill-[#FF7A00]"
                                } r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-jwli3a r-6zzn7w r-q1j0wu`}
                            >
                                <g>
                                    <path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path>
                                </g>
                            </svg>
                        </div>
                        <div
                            className="p-2.5 h-fit rounded-full bg-[#00BA7C] cursor-pointer"
                            onClick={() => setCurrentColor("green")}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className={`w-5 ${
                                    currentColor === "green"
                                        ? "fill-white"
                                        : "fill-[#00BA7C]"
                                } r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-jwli3a r-6zzn7w r-q1j0wu`}
                            >
                                <g>
                                    <path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="border-b dark:border-gray-800 dim:border-gray-800">
                    <div className="px-2 py-3 text-xl font-bold">
                        Background
                    </div>
                    <div className="px-2 py-3 flex justify-evenly max-[704px]:flex-col gap-2 w-full">
                        <div
                            className={`flex px-4 py-5 my-auto font-bold rounded-md cursor-pointer dark:bg-white dim:bg-white dark:text-black dim:text-black ${
                                currentTheme === "light" &&
                                "ring-2 ring-twitter-blue"
                            } min-[705px]:w-[180px] min-[705px]:h-[60px]`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentTheme("light");
                            }}
                        >
                            <div className="mx-auto">
                                <label
                                    htmlFor="default"
                                    className="cursor-pointer"
                                >
                                    Default
                                </label>
                            </div>
                        </div>
                        <div
                            className={`flex px-4 py-5 my-auto font-bold text-white bg-[#15202B] rounded-md cursor-pointer ${
                                currentTheme === "dim" &&
                                "ring-2 ring-twitter-blue"
                            } min-[705px]:w-[180px] min-[705px]:h-[60px]`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentTheme("dim");
                            }}
                        >
                            <div className="mx-auto">
                                <label htmlFor="dim" className="cursor-pointer">
                                    Dim
                                </label>
                            </div>
                        </div>
                        <div
                            className={`flex px-4 py-5 my-auto font-bold text-white bg-black rounded-md cursor-pointer ${
                                currentTheme === "dark" &&
                                "ring-2 ring-twitter-blue"
                            } min-[705px]:w-[180px] min-[705px]:h-[60px]`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentTheme("dark");
                            }}
                        >
                            <div className="mx-auto">
                                <label
                                    htmlFor="lightsOut"
                                    className="cursor-pointer"
                                >
                                    Lights out
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SettingItemsContainer>
    );
}

export default Display;
