import { Aside, Feed, FeedContent } from "../components";

function Home() {
    document.title = "Home / X";

    return (
        <>
            <Feed>
                <FeedContent />
            </Feed>

            <Aside />
        </>
    );
}

export default Home;
