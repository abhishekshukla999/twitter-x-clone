import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Age() {
    const profileData = useSelector((state) => state.profile);
    const navigate = useNavigate();

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
        <div className="xl:flex-[0_0_43%] border-r h-full sticky top-0 overflow-y-auto">
            <div className="top flex sticky top-0 backdrop-blur-3xl opacity-[100%]">
                <div className="flex gap-5">
                    <NavLink
                        className="m-0.5 my-auto p-2 hover:bg-gray-200 rounded-full"
                        onClick={() => navigate(-1)}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-5 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                            </g>
                        </svg>
                    </NavLink>
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
        </div>
    );
}

export default Age;
