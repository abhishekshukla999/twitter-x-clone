import { Aside, Feed, Bookmarks as UserBookmarks } from "../components";

function Bookmarks() {
    document.title = "Bookmarks / X";

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
