import { Aside, Feed, Explore as UserExplore } from "../components";

function Explore() {
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
