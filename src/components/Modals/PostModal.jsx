import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import {
    tweetService,
    tweetMediaService,
    profileMediaService,
    profileService,
} from "../../appwrite";
import { useSelector, useDispatch } from "react-redux";
import { addOtherProfile } from "../../features/profile/otherProfileSlice";
import { addTweetPageData } from "../../features/tweet/tweetPageSlice";
import { addTweets } from "../../features/tweet/tweetSlice";
import { addProfileData } from "../../features/profile/profileSlice";
import { LoadingModal } from "../";
import { toast } from "sonner";

function PostModal({ isOpen, onClose, post = false }) {
    // preview and upload states
    const [prevImage, setPrevImage] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const { register, handleSubmit, reset, formState, watch } = useForm({
        defaultValues: {
            content: post.content || "",
        },
    });
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.profile);
    const otherProfile = useSelector((state) => state.otherProfile);
    const authData = useSelector((state) => state.auth.userData);
    const tweetPageData = useSelector((state) => state.tweetPage);
    const tweetsData = useSelector((state) => state.tweets);
    const { errors } = formState;
    const [appwriteError, setAppwriteError] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const textContent = watch("content");

    useEffect(() => {
        if (textContent?.length === 0) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [textContent]);

    const submitPost = async (data) => {
        setAppwriteError("");
        setButtonDisabled(true);
        setLoading(true);

        if (post) {
            try {
                const file = uploadImage
                    ? await tweetMediaService.uploadFile(uploadImage)
                    : null;

                if (file && post.media) {
                    await tweetMediaService.deleteFile(post.media);
                }

                const updatedTweetPost = await tweetService.updateTweet(
                    post.tweetId,
                    {
                        content: data.content,
                        media: file ? file.$id : post.media,
                    }
                );

                if (updatedTweetPost) {
                    // console.log("Tweet Updated");
                    dispatch(
                        addTweetPageData({
                            ...tweetPageData,
                            tweetData: updatedTweetPost,
                        })
                    );
                }

                toast.success("Tweet updated successfully");
            } catch (error) {
                // console.log("Error Updating tweets :: ", error);
                setAppwriteError(error.message);
                toast.error("Tweet updating failed");
            } finally {
                onClose();
                setPrevImage(null);
                setUploadImage(null);
                setButtonDisabled(false);
                setLoading(false);
            }
        } else {
            try {
                if (uploadImage) {
                    const file = await tweetMediaService.uploadFile(
                        uploadImage
                    );

                    if (file) {
                        const fileId = file.$id;
                        data.media = fileId;
                    }
                }

                const tweetPost = await tweetService.createTweet({
                    author: authData?.$id,
                    content: data.content,
                    media: data.media || "",
                });

                if (tweetPost) {
                    // console.info("Tweet Created");
                    const updatedTweetsCount = profileData?.tweets + 1;
                    const updatedProfileData =
                        await profileService.updateProfile(authData?.$id, {
                            tweets: updatedTweetsCount,
                        });

                    dispatch(addProfileData({ ...updatedProfileData }));

                    if (authData.$id === otherProfile?.$id) {
                        dispatch(addOtherProfile({ ...updatedProfileData }));

                        const updatedTweetsData = [tweetPost, ...tweetsData];
                        dispatch(addTweets(updatedTweetsData));
                    }
                }

                toast.success("Tweet created successfully");
            } catch (error) {
                // console.error("Error creating tweet :: ", error);
                toast.error("Tweet creation failed");
            } finally {
                reset();
                onClose();
                setPrevImage(null);
                setUploadImage(null);
                setButtonDisabled(false);
                setLoading(false);
            }
        }
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

    const imageUrl = () => {
        if (profileData?.avatar) {
            return profileMediaService.getCustomFilePreview(
                profileData.avatar,
                50,
                50
            );
        } else {
            return "/defaultAvatar.png";
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className="close-outer fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={onClose}
        >
            <LoadingModal isOpen={loading} />
            <div
                className="bg-white text-black dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg overflow-y-auto opacity-100 p-5 rounded-xl shadow-lg relative 2xl:w-[50%] xl:w-[60%] lg:w-[50%] md:w-[60%] max-h-fit max-[702px]:h-screen max-[702px]:w-screen"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="">
                    <button
                        className="rounded-lg m-3 absolute top-2.5 left-2.5 bg-none border-none text-2xl cursor-pointer"
                        onClick={() => {
                            onClose();
                            reset();
                            setPrevImage(null);
                            setUploadImage(null);
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 fill-black dark:fill-white dim:fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                            </g>
                        </svg>
                    </button>

                    <div className="flex justify-center">
                        <svg
                            viewBox="0 0 24 24"
                            aria-label="X"
                            role="img"
                            className="w-7 dark:invert dim:invert r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-16y2uox r-lwhw9o"
                        >
                            <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </g>
                        </svg>
                    </div>
                </div>

                {/* TweetForm implemented */}
                <div>
                    <div className="post-modal flex justify-center pt-3 w-full max-h-[60vh] border-zinc-200">
                        <div className="mx-2 min-w-[50px]">
                            <img
                                className="w-full rounded-full"
                                src={imageUrl()}
                                alt="avatar"
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
                                    className="w-full max-h-[60vh] dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg dark:text-white dim:text-white overflow-y-auto text-xl focus:outline-none whitespace-normal p-2 resize-none"
                                    type="text"
                                    rows="5"
                                    placeholder="What is happening?!"
                                    {...register("content", {
                                        required: "Please write something",
                                        maxLength: {
                                            value: 500,
                                            message:
                                                "Maximum allowed is 500 characters",
                                        },
                                    })}
                                />

                                {prevImage && (
                                    <div className="dark:text-white dim:text-white">
                                        <span className="font-bold text-sm">
                                            New Image
                                        </span>
                                        <div className="preview w-28">
                                            <div
                                                className="relative left-28 cursor-pointer"
                                                onClick={removeImage}
                                            >
                                                <span className="text-2xl font-bold">
                                                    &times;
                                                </span>
                                            </div>

                                            <img
                                                className="rounded-lg"
                                                src={prevImage}
                                            />
                                        </div>
                                    </div>
                                )}

                                {post && post.media && (
                                    <div className="dark:text-white dim:text-white">
                                        <span className="font-bold text-sm text-gray-400">
                                            Current Image
                                        </span>
                                        <img
                                            className="w-80"
                                            src={tweetMediaService.getFilePreview(
                                                post.media
                                            )}
                                            alt="Tweet Image"
                                        />
                                    </div>
                                )}

                                <small>
                                    Image size should be less than 5MB
                                </small>
                            </div>
                            {/* usables */}
                            <div className="flex justify-between border-t dark:border-gray-800 dim:border-gray-800">
                                <div className="flex my-2 flex-wrap">
                                    {/* file upload */}
                                    <div
                                        className="mx-0.5 p-2 w-fit h-fit rounded-full cursor-pointer hover:bg-blue-100 yellow:hover:bg-yellow-100 crimson:hover:bg-rose-100 purple:hover:bg-purple-300 orange:hover:bg-orange-300 green:hover:bg-green-300"
                                        title="media"
                                    >
                                        <label
                                            htmlFor="mediaFileModal"
                                            className=""
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                                className="w-5 fill-blue-500 yellow:fill-twitter-yellow crimson:fill-twitter-crimson purple:fill-twitter-purple orange:fill-twitter-orange green:fill-twitter-green cursor-pointer r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                            >
                                                <g>
                                                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                                                </g>
                                            </svg>
                                        </label>
                                        <input
                                            id="mediaFileModal"
                                            type="file"
                                            accept=".jpg, .png, .gif"
                                            className="hidden"
                                            onChange={openAndReadFile}
                                        />
                                    </div>
                                    {/* gif */}
                                    <div
                                        className="mx-0.5 p-2 cursor-not-allowed w-fit h-fit rounded-full"
                                        title="GIF"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-5 fill-blue-500 yellow:fill-twitter-yellow crimson:fill-twitter-crimson purple:fill-twitter-purple orange:fill-twitter-orange green:fill-twitter-green cursor-not-allowed r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                        >
                                            <g>
                                                <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    {/* poll */}
                                    <div
                                        className="mx-0.5 p-2 cursor-not-allowed w-fit h-fit rounded-full"
                                        title="Poll"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-5 fill-blue-500 yellow:fill-twitter-yellow crimson:fill-twitter-crimson purple:fill-twitter-purple orange:fill-twitter-orange green:fill-twitter-green cursor-not-allowed r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                        >
                                            <g>
                                                <path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    {/* emoji */}
                                    <div
                                        className="mx-0.5 p-2 cursor-not-allowed w-fit h-fit rounded-full"
                                        title="Emoji"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-5 fill-blue-500 yellow:fill-twitter-yellow crimson:fill-twitter-crimson purple:fill-twitter-purple orange:fill-twitter-orange green:fill-twitter-green cursor-not-allowed r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                        >
                                            <g>
                                                <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    {/* schedule */}
                                    <div
                                        className="mx-0.5 p-2 cursor-not-allowed w-fit h-fit rounded-full"
                                        title="Schedule"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-5 fill-blue-500 yellow:fill-twitter-yellow crimson:fill-twitter-crimson purple:fill-twitter-purple orange:fill-twitter-orange green:fill-twitter-green cursor-not-allowed r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                                        >
                                            <g>
                                                <path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    {/* location */}
                                    <div
                                        className="mx-0.5 p-2 cursor-not-allowed w-fit h-fit rounded-full"
                                        title="Location"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-5 fill-blue-500 yellow:fill-twitter-yellow crimson:fill-twitter-crimson purple:fill-twitter-purple orange:fill-twitter-orange green:fill-twitter-green cursor-not-allowed r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
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
                                        className={`w-16 md:w-20 md:mx-2 py-2 font-bold text-base text-white ${
                                            !buttonDisabled
                                                ? "bg-twitter-blue hover:bg-sky-600 yellow:bg-twitter-yellow yellow:hover:bg-yellow-600 crimson:bg-twitter-crimson crimson:hover:bg-rose-600 purple:bg-twitter-purple purple:hover:bg-purple-600 orange:bg-twitter-orange orange:hover:bg-orange-600 green:bg-twitter-green green:hover:bg-green-600"
                                                : "bg-blue-300 yellow:bg-yellow-300 crimson:bg-rose-300 purple:bg-purple-300 orange:bg-orange-300 green:bg-green-300"
                                        } hover:bg-blue-600 rounded-full`}
                                    >
                                        {post ? "Update" : "Post"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {errors.content?.message && (
                    <p className="text-red-600 m-1 p-2 bg-red-100 rounded-lg text-center">
                        {errors.content?.message}
                    </p>
                )}
                {appwriteError && (
                    <p className="text-red-600 m-1 p-2 bg-red-100 rounded-lg text-center">
                        {appwriteError}
                    </p>
                )}
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default PostModal;
