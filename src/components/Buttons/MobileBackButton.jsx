import { useNavigate, NavLink } from "react-router-dom";

function MobileBackButton() {
    const navigate = useNavigate();

    return (
        <NavLink
            className="m-0.5 my-auto p-2 hover:bg-gray-200 rounded-full hidden max-[1004px]:block "
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
    );
}

export default MobileBackButton;
