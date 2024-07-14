import { Client, Databases, ID } from "appwrite";
import { config } from "../../config/config";

class LikeService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createLike({ userId, tweetId }) {
        try {
            return this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteLikesCollectionId,
                ID.unique(),
                { userId, tweetId }
            );
        } catch (error) {
            console.log("Appwrite Service :: createLike :: error ", error);
        }
    }

    async getLikes(queries = []) {
        try {
            return this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteLikesCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite Service :: getLikes :: error ", error);
        }
    }

    async deleteLike(docId) {
        try {
            return this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteLikesCollectionId,
                docId
            );
        } catch (error) {
            console.log("Appwrite Service :: deleteLike :: error ", error);
        }
    }
}

const likeService = new LikeService();

export default likeService;
