import React from "react";
import FeedContent from "../FeedContent/FeedContent";
import Profile from "../Profile/Profile";
import { Outlet } from "react-router-dom";

function Feed({ children }) {
    return (
        <section className="xl:flex-[0_0_46%] lg:flex-[0_0_55%]  md:flex-[0_0_80%] 200 w-full max-w-full">
            {children}
        </section>
    );
}

export default Feed;
