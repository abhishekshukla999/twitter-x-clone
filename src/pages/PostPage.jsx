import { useParams } from "react-router-dom";
import { Aside, Feed, PostPageComponent } from "../components";

function PostPage() {
    const { username, tweetId } = useParams();

    return (
        <>
            <Feed>
                <PostPageComponent username={username} tweetId={tweetId} />
            </Feed>

            <Aside />
        </>
    );
}

export default PostPage;
