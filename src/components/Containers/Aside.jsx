import React from "react";
import { Search, WhatsHappening, WhoToFollow } from "../index";
import { Outlet } from "react-router-dom";

function Aside() {
    return (
        <aside className="max-w-xl sticky top-0 mr-auto overflow-y-auto overflow-x-hidden min-h-full hidden min-[1005px]:block">
            <Search />
            <WhatsHappening />
            <WhoToFollow />
        </aside>
    );
}

export default Aside;
