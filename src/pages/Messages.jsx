import { MessagesList, MessageBox, NavigationBottom } from "../components";

function Messages() {
    document.title = "Messages / X";

    return (
        <>
            <MessagesList />
            <MessageBox />
            <NavigationBottom />
        </>
    );
}

export default Messages;
