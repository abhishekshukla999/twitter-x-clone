import { MessagesList, NavigationBottom } from "../components";

function Messages() {
    document.title = "Messages / X";

    return (
        <>
            <MessagesList />
            <NavigationBottom />
        </>
    );
}

export default Messages;
