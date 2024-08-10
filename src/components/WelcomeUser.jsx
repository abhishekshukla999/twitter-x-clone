import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function WelcomeUser() {
    const navigate = useNavigate();

    useEffect(() => {
        navigateHome();
    }, []);

    function navigateHome() {
        navigate("/home");
    }

    return (
        <div className="w-full flex flex-col justify-center items-center p-12 my-auto font-bold">
            <p className="text-4xl my-4">Welcome to X.</p>
            <p>It&apos;s what&apos;s happening / X</p>
            <div className="my-4 p-2 w-fit bg-twitter-blue rounded-xl">
                <NavLink to="/home" className="text-white ">
                    Navigate me to home
                </NavLink>
            </div>
        </div>
    );
}

export default WelcomeUser;
