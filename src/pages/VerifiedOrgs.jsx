import { Feed, Aside, UnderDev } from "../components";

function VerifiedOrgs() {
    document.title = "Verified Organizations / X";

    return (
        <>
            <Feed>
                <UnderDev />
            </Feed>

            <Aside />
        </>
    );
}

export default VerifiedOrgs;
