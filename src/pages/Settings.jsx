import { Outlet } from "react-router-dom";
import { SettingsList, NavigationBottom } from "../components";

function Settings() {
    return (
        <>
            <SettingsList />
            <Outlet />
            <NavigationBottom />
        </>
    );
}

export default Settings;
