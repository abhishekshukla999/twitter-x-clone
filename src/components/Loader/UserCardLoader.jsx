import LoadCardContainer from "./LoadCardContainer";

function UserCardLoader() {
    return (
        <LoadCardContainer>
            <div className="flex items-center">
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 dim:bg-text-gray-800 w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700 dim:bg-text-gray-800"></div>
                </div>
            </div>
        </LoadCardContainer>
    );
}

export default UserCardLoader;
