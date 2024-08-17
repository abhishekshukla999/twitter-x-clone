import { profileMediaService } from "../../appwrite";
import { useSelector } from "react-redux";
import { Follow } from "../index";

function FollowCard({ name, username, avatar, userId }) {
    const authId = useSelector((state) => state.auth.userData.$id);

    function fetchAvatar(avatar) {
        if (!avatar) {
            return "/defaultAvatar.png";
        } else {
            return profileMediaService.getCustomFilePreview(avatar, 50, 50);
        }
    }

    return (
        <div>
            <div className="flex justify-between text-base">
                <div className="flex">
                    <div className="m-3 min-w-[40px] max-w-[43px]">
                        <img
                            className="w-full rounded-full"
                            src={fetchAvatar(avatar)}
                            alt="user avatar"
                            loading="lazy"
                        />
                    </div>
                    <div className="flex flex-col p-1">
                        <span className="font-bold">{name}</span>
                        <span>@{username}</span>
                    </div>
                </div>
                <div className="mx-2">
                    <Follow followingId={userId} followerId={authId} />
                </div>
            </div>
        </div>
    );
}

export default FollowCard;
