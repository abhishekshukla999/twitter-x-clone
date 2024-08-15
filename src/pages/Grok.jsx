import { Feed, Aside, UnderDev } from "../components";

function Grok() {
    document.title = "Grok / X";

    return (
        <>
            <Feed>
                <UnderDev />
            </Feed>

            <Aside />
        </>
    );
}

export default Grok;
