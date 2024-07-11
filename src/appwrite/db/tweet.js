import { config } from "../../config/config";
import { Client, Databases, ID } from "appwrite";

class TweetService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createTweet({ name, username, author, content, ...rest }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteTweetsCollectionId,
                ID.unique(),
                {
                    name,
                    username,
                    author,
                    content,
                    ...rest,
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: createTweet :: error ", error);
        }
    }

    async getTweet(docId) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteTweetsCollectionId,
                docId
            );
        } catch (error) {
            console.log("Appwrite Service :: getTweet :: error ", error);
        }
    }

    async updateTweet(docId, { ...data }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteTweetsCollectionId,
                docId,
                {
                    ...data,
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: updateTweet :: error ", error);
        }
    }

    async deleteTweet(docId) {
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteTweetsCollectionId,
                docId
            );
        } catch (error) {
            console.log("Appwrite Service :: deleteTweet :: error ", error);
        }
    }
}

const tweetService = new TweetService();

export default tweetService;
