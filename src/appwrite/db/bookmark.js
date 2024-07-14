import { Client, Databases, ID } from "appwrite";
import { config } from "../../config/config";

class BookmarksService {
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
                config.appwriteBookmarkssCollectionId,
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
                config.appwriteBookmarkssCollectionId,
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
                config.appwriteBookmarkssCollectionId,
                docId
            );
        } catch (error) {
            console.log("Appwrite Service :: deleteBookmark :: error ", error);
        }
    }
}

const bookmarksService = new BookmarksService();

export default bookmarksService;
