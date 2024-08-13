import { useSelector } from "react-redux";
import { SettingItemsContainer, BackButton } from "../../../";

function Age() {
    const profileData = useSelector((state) => state.profile);

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Adjust age if the current date is before the birth date in the current year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    };

    const age = calculateAge(profileData?.dob);

    return (
        <SettingItemsContainer>
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <BackButton />
                    <div className="font-bold text-xl py-3">Age</div>
                </div>
            </div>
            <form>
                <div className="border-b py-3 px-3 text-[15px] text-gray-500">
                    These are the age ranges associated with you.
                </div>
                <div className="border-b py-3 px-3 text-[15px]">{age}</div>
                <div className="py-3 px-3 text-[15px] text-gray-500">
                    Not right? You can add your date of birth to your profile
                    without sharing it publicly.
                </div>
            </form>
        </SettingItemsContainer>
    );
}

export default Age;
