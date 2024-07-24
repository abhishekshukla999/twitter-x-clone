import React from "react";
import { profileMediaService } from "../../appwrite";
import { NavLink, useNavigate } from "react-router-dom";

function ActionsCard({ name, username, media }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between cursor-pointer my-1">
            <NavLink className="flex" onClick={() => navigate(`/${username}`)}>
                {/* User avatar */}
                <div className="avatar m-1.5 w-[50px]">
                    <img
                        className="rounded-full"
                        src={profileMediaService.getFilePreview(media)}
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
            <div className="cursor-pointer my-auto" title="Follow">
                <button className="p-2 px-4 font-bold text-base border text-white bg-black border-zinc-300 rounded-full">
                    Follow
                </button>
            </div>
        </div>
    );
}

export default ActionsCard;
