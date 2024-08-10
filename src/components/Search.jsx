import { useCallback, useEffect, useState } from "react";
import { UserSearchCard } from "./";
import { profileService } from "../appwrite";
import { Query } from "appwrite";

function Search() {
    const [searchText, setSearchtext] = useState("");
    const [usersList, setUsersList] = useState([]);

    const handleSearch = useCallback(async () => {
        const usersDocs = await profileService.getProfiles([
            Query.search("username", searchText),
        ]);

        setUsersList(usersDocs.documents);
    }, [searchText]);

    useEffect(() => {
        handleSearch();
    }, [searchText, handleSearch]);

    return (
        <div className="relative">
            <div className="max-w-md mx-0.5 p-1">
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-5 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-2 ps-10 text-base text-gray-900 border border-gray-300 rounded-full bg-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchtext(e.target.value)}
                    />
                </div>
            </div>
            {usersList.length !== 0 && (
                <div className="absolute top-16 left-3 bg-white w-[90%] border shadow-2xl rounded-lg">
                    {usersList.map((user) => (
                        <UserSearchCard
                            key={user.$id}
                            name={user.name}
                            username={user.username}
                            media={user.avatar}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
