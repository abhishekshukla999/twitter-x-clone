import { useNavigate } from "react-router-dom";
import { tweetMediaService } from "../../appwrite";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { MediaLoader } from "../index";

function MediaCard({ tweetId, media }) {
    const otherProfileData = useSelector((state) => state.otherProfile);
    const navigate = useNavigate();
    const [mediaLoader, setMediaLoader] = useState(true);
    const [mediaURL, setMediaURL] = useState("");

    useEffect(() => {
        const fetchMediaUrl = () => {
            if (media) {
                const img = new Image();

                img.src = tweetMediaService.getCustomQualityFilePreview({
                    fileId: media,
                    width: 400,
                    height: 400,
                    quality: 50,
                });

                img.onload = () => {
                    setMediaURL(img.src);
                    setMediaLoader(false);
                };

                img.onerror = () => {
                    mediaURL("/errorImage.png");
                    setMediaLoader(false);
                };

                if (img.complete) {
                    setMediaURL(img.src);
                    setMediaLoader(false);
                }
            }
        };

        fetchMediaUrl();
    }, [media]);

    return !media ? null : (
        <div
            className="w-1/3 inline-block hover:border-2 cursor-pointer"
            onClick={() =>
                navigate(`/${otherProfileData.username}/status/${tweetId}`)
            }
        >
            {mediaLoader ? (
                <MediaLoader />
            ) : (
                <img src={mediaURL} alt="tweet media" loading="lazy" />
            )}
        </div>
    );
}

export default MediaCard;
