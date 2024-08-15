import { Aside, Feed, UnderDev } from "../components";

function Communities() {
    document.title = "Communities / X";

    return (
        <>
            <Feed>
                <UnderDev />
            </Feed>

            <Aside />
        </>
    );
}

export default Communities;
