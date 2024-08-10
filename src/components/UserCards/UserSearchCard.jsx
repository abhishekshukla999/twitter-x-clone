import { NavLink, useNavigate } from "react-router-dom";
import { profileMediaService } from "../../appwrite";

function UserSearchCard({ name, username, media }) {
    const navigate = useNavigate();

    const avatarUrl = () => {
        if (media) {
            return profileMediaService.getCustomFilePreview(media, 50, 50);
        } else {
            return "/defaultAvatar.png";
        }
    };

    return (
        <div className="flex justify-between cursor-pointer my-1 mx-2">
            <NavLink className="flex" onClick={() => navigate(`/${username}`)}>
                {/* User avatar */}
                <div className="avatar m-1.5 w-[50px]">
                    <img
                        className="rounded-full"
                        src={avatarUrl()}
                        alt="avatar"
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
        </div>
    );
}

export default UserSearchCard;
