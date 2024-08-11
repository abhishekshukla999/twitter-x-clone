import { useNavigate } from "react-router-dom";
import { tweetMediaService } from "../../appwrite";
import { useSelector } from "react-redux";

function MediaCard({ tweetId, media }) {
    const otherProfileData = useSelector((state) => state.otherProfile);
    const navigate = useNavigate();

    // console.log(tweetId);
    

    const fetchMediaUrl = () => {
        if (media) {
            return tweetMediaService.getCustomQualityFilePreview({
                fileId: media,
                width: 400,
                height: 400,
                quality: 50,
            });
        }
    };

    return !media ? null : (
        <div
            className="w-1/3 inline-block hover:border-2 cursor-pointer"
            onClick={() =>
                navigate(`/${otherProfileData.username}/status/${tweetId}`)
            }
        >
            <img src={fetchMediaUrl()} alt="tweet media" />
        </div>
    );
}

export default MediaCard;
