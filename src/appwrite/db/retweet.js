import { Client, Databases, ID } from "appwrite";
import { config } from "../../config/config";

class RetweetService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createRetweet({ userId, tweetId }) {
        try {
            return this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteRetweetsCollectionId,
                ID.unique(),
                { userId, tweetId }
            );
        } catch (error) {
            console.log("Appwrite Service :: createRetweet :: error ", error);
        }
    }

    async getRetweets(queries = []) {
        try {
            return this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteRetweetsCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite Service :: getRetweets :: error ", error);
        }
    }

    async deleteRetweet(docId) {
        try {
            return this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteRetweetsCollectionId,
                docId
            );
        } catch (error) {
            console.log("Appwrite Service :: deleteRetweets :: error ", error);
        }
    }
}

const retweetService = new RetweetService();

export default retweetService;
