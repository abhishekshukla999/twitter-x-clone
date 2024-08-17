import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SettingsList, NavigationBottom } from "../components";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

function Settings() {
    const isWideScreen = useMediaQuery({ minWidth: "1005px" });
    const location = useLocation();
    const navigate = useNavigate();

    const isBaseSettingsRoute = location.pathname === "/settings";
    document.title = "X";

    useEffect(() => {
        if (isWideScreen) {
            navigate("/settings/account");
        }
    }, []);

    return (
        <>
            {isWideScreen ? (
                <>
                    <SettingsList />
                    <Outlet />
                </>
            ) : isBaseSettingsRoute ? (
                <>
                    <SettingsList />
                </>
            ) : (
                <Outlet />
            )}

            <NavigationBottom />
        </>
    );
}

export default Settings;
