import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    tweetService,
    tweetMediaService,
    profileService,
} from "../../appwrite";
import { useSelector, useDispatch } from "react-redux";
import { addProfileData } from "../../features/profile/profileSlice";

function TweetForm() {
    // preview and upload states
    const [prevImage, setPrevImage] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.profile.profileData);

    const submitPost = async (data) => {
        if (uploadImage) {
            const file = await tweetMediaService.uploadFile(uploadImage);

            if (file) {
                const fileId = file.$id;
                data.media = fileId;
            }
        }

        const tweetPost = await tweetService.createTweet({
            name: userData.name,
            username: userData.username,
            author: userData.$id,
            content: String(data.content),
            media: data.media || "",
        });

        if (tweetPost) {
            console.log("Tweet Created");

            const tweets = userData.tweets || [];
            const updatedTweets = [tweetPost?.$id, ...tweets];

            profileService
                .updateProfile(userData.$id, {
                    tweets: updatedTweets,
                })
                .then((res) => {
                    dispatch(addProfileData({ profileData: res }));
                });
        }

        reset();
    };

    const openAndReadFile = (e) => {
        setPrevImage(URL.createObjectURL(e.target.files[0]));
        setUploadImage(e.target.files[0]);
        e.target.value = null;
    };

    const removeImage = () => {
        setPrevImage(null);
        setUploadImage(null);
    };

    // handling textarea change when input changes
    // this conflicting with react-hook-form and useRef
    // const handleTextareaChange = () => {
    //     const textarea = textareaRef.current;
    //     textarea.style.height = "auto";
    //     textarea.style.height = `${textarea.scrollHeight}px`;
    // };

    return (
        <>
            <div className="tweet-form flex max-[499px]:hidden pt-3 w-full max-h-[70%] border border-t-0 border-zinc-200">
                <div className="mx-2 w-[7%]">
                    <img
                        className="w-full rounded-full"
                        src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
                        alt=""
                    />
                </div>
                <form
                    className="items w-[90%]"
                    onSubmit={handleSubmit(submitPost)}
                >
                    {/* textarea */}
                    {/* note: change textarea length with rows & useEffect */}
                    <div className="">
                        <textarea
                            className="w-full max-h-[60vh] overflow-y-auto text-xl focus:outline-none  whitespace-normal p-2 resize-none"
                            type="text"
                            rows="4"
                            placeholder="What is happening?!"
                            maxLength="500"
                            {...register("content")}
                        />

                        {prevImage && (
                            <div className="preview w-28">
                                <div
                                    className="relative left-28 cursor-pointer"
                                    onClick={removeImage}
                                >
                                    <span className="text-2xl font-bold">
                                        &times;
                                    </span>
                                </div>

                                <img className="rounded-lg" src={prevImage} />
                            </div>
                        )}
                    </div>
                    {/* usables */}
                    <div className="flex justify-between border border-b-0 border-l-0 border-r-0">
                        <div className="flex my-2 flex-wrap">
                            {/* file upload */}
                            <div
                                className="mx-0.5 p-2 w-fit h-fit hover:bg-blue-100 rounded-full"
                                title="media"
                            >
                                <label htmlFor="mediaFile" className="">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="w-5 fill-blue-500 cursor-pointer r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                    >
                                        <g>
                                            <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                                        </g>
                                    </svg>
                                </label>
                                <input
                                    id="mediaFile"
                                    type="file"
                                    accept=".jpg, .png, .gif"
                                    className="hidden"
                                    onChange={openAndReadFile}
                                />
                            </div>
                            {/* gif */}
                            <div
                                className="mx-0.5 p-2 cursor-pointer w-fit h-fit hover:bg-red-200 rounded-full"
                                title="GIF"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-blue-500 cursor-pointer r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                >
                                    <g>
                                        <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path>
                                    </g>
                                </svg>
                            </div>
                            {/* poll */}
                            <div
                                className="mx-0.5 p-2 cursor-pointer w-fit h-fit hover:bg-red-200 rounded-full"
                                title="Poll"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-blue-500 cursor-pointer r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                >
                                    <g>
                                        <path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"></path>
                                    </g>
                                </svg>
                            </div>
                            {/* emoji */}
                            <div
                                className="mx-0.5 p-2 cursor-pointer w-fit h-fit hover:bg-red-200 rounded-full"
                                title="Emoji"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-blue-500 cursor-pointer r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                >
                                    <g>
                                        <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path>
                                    </g>
                                </svg>
                            </div>
                            {/* schedule */}
                            <div
                                className="mx-0.5 p-2 cursor-pointer w-fit h-fit hover:bg-red-200 rounded-full"
                                title="Schedule"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-blue-500 cursor-pointer r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                >
                                    <g>
                                        <path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"></path>
                                    </g>
                                </svg>
                            </div>
                            {/* location */}
                            <div
                                className="mx-0.5 p-2 cursor-pointer w-fit h-fit hover:bg-red-200 rounded-full"
                                title="Location"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 fill-blue-500 cursor-pointer r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                >
                                    <g>
                                        <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="my-2">
                            <button
                                type="submit"
                                className="w-20 mx-2 py-2 font-bold text-base text-white bg-twitter-blue hover:bg-blue-600 rounded-full"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default TweetForm;
