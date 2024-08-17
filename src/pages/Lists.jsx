import { Feed, Aside, UnderDev } from "../components";

function Lists() {
    document.title = "Lists / X";

    return (
        <>
            <Feed>
                <UnderDev />
            </Feed>

            <Aside />
        </>
    );
}

export default Lists;
