import { Outlet, useLocation } from "react-router-dom";
import { SettingsList, NavigationBottom } from "../components";
import { useMediaQuery } from "react-responsive";

function Settings() {
    const isWideScreen = useMediaQuery({ minWidth: "1005px" });
    const location = useLocation();

    const isBaseSettingsRoute = location.pathname === "/settings";

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
