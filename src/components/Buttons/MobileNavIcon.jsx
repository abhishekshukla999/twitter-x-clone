import { useState, useEffect } from "react";
import { NavigationMobile } from "../";
import { useSelector } from "react-redux";
import { profileMediaService } from "../../appwrite";

function MobileNavIcon() {
    const profileData = useSelector((state) => state.profile);
    const [avatarURL, setAvatarURL] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function fetchAvatarUrl() {
            if (profileData?.avatar) {
                setAvatarURL(
                    profileMediaService.getCustomFilePreview(
                        profileData?.avatar,
                        50,
                        50
                    )
                );
            } else {
                setAvatarURL("/defaultAvatar.png");
            }
        }

        fetchAvatarUrl();
    }, [profileData?.avatar]);

    return (
        <div>
            <div className="my-3 hidden max-[499px]:block">
                <div onClick={() => setIsOpen(true)}>
                    <img
                        className="w-[45px] rounded-full mx-3"
                        src={avatarURL}
                        alt="navigation menu avatar"
                    />
                </div>
                <NavigationMobile
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            </div>
        </div>
    );
}

export default MobileNavIcon;
