import { Client, Databases, ID } from "appwrite";
import { config } from "../../config/config";

class BookmarkService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createBookmark({ userId, tweetId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteBookmarksCollectionId,
                ID.unique(),
                {
                    userId,
                    tweetId,
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: createBookmarks :: error ", error);
        }
    }

    async getBookmarks(queries = []) {
        try {
            return this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteBookmarksCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite Service :: getBookmarks :: error ", error);
        }
    }

    async deleteBookmark(docId) {
        try {
            return this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteBookmarksCollectionId,
                docId
            );
        } catch (error) {
            console.log("Appwrite Service :: deleteBookmark :: error ", error);
        }
    }
}

const bookmarkService = new BookmarkService();

export default bookmarkService;
