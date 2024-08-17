import { profileMediaService } from "../../appwrite";
import { NavLink, useNavigate } from "react-router-dom";
import { Follow } from "../index";
import { useSelector } from "react-redux";

function ActionsCard({ name, username, media, userId }) {
    const authId = useSelector((state) => state.auth.userData.$id);
    const navigate = useNavigate();

    const avatarUrl = () => {
        if (media) {
            return profileMediaService.getCustomFilePreview(media, 50, 50);
        } else {
            return "/defaultAvatar.png";
        }
    };

    return (
        <div className="flex justify-between cursor-pointer my-1 hover:bg-gray-100 dark:hover:bg-slate-700 dim:hover:bg-slate-800">
            <NavLink className="flex" onClick={() => navigate(`/${username}`)}>
                {/* User avatar */}
                <div className="avatar m-1.5 w-[50px]">
                    <img
                        className="rounded-full"
                        src={avatarUrl()}
                        alt="avatar"
                        loading="lazy"
                    />
                </div>

                {/* User details */}
                <div className="my-auto">
                    <div className="mx-0.5 font-bold hover:underline">
                        {name || ""}
                    </div>
                    <div className="mx-0.5 text-zinc-500 font-light">
                        @{username || ""}
                    </div>
                </div>
            </NavLink>
            {authId !== userId && (
                <div className="cursor-pointer my-auto" title="Follow">
                    <Follow followingId={userId} followerId={authId} />
                </div>
            )}
        </div>
    );
}

export default ActionsCard;
