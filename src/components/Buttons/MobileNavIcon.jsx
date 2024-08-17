import { useState, useEffect } from "react";
import { NavigationMobile } from "../index";
import { useSelector } from "react-redux";
import { profileMediaService } from "../../appwrite";

function MobileNavIcon() {
    const profileData = useSelector((state) => state.profile);
    const [avatarURL, setAvatarURL] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let unsubscribe = false;

        function fetchAvatarUrl() {
            if (profileData?.avatar && !unsubscribe) {
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

        return () => {
            unsubscribe = true;
        };
    }, [profileData?.avatar]);

    return (
        <div>
            <div className="my-3 hidden max-[499px]:block">
                <div
                    className="min-w-[40px] max-w-[43px] mx-3"
                    onClick={() => setIsOpen(true)}
                >
                    <img
                        className="rounded-full"
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
