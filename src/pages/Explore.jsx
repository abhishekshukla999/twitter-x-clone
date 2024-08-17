import { Aside, Feed, Explore as UserExplore } from "../components";

function Explore() {
    document.title = "Trending Now / X";

    return (
        <>
            <Feed>
                <UserExplore />
            </Feed>

            <Aside />
        </>
    );
}

export default Explore;
