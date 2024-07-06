import React from "react";
import { Aside, Feed, Bookmarks as UserBookmarks } from "../components";

function Bookmarks() {
    return (
        <>
            <Feed>
                <UserBookmarks />
            </Feed>

            <Aside />
        </>
    );
}

export default Bookmarks;
