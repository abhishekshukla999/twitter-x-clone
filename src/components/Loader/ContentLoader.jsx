import LoadCardContainer from "./LoadCardContainer";

function ContentLoader() {
    return (
        <LoadCardContainer>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 dim:bg-gray-800 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 dim:bg-gray-800 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 dim:bg-gray-800 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 dim:bg-gray-800"></div>
        </LoadCardContainer>
    );
}

export default ContentLoader;
