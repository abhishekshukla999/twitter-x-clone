import { Client, Databases, ID } from "appwrite";
import { config } from "../../config/config";

class FollowService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createFollow({ followerId, followingId }) {
        try {
            return this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteFollowsCollectionId,
                ID.unique,
                {
                    followerId,
                    followingId,
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: createFollow :: error ", error);
        }
    }

    async getFollows(queries = []) {
        try {
            return this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteFollowsCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite Service :: getFollows :: error ", error);
        }
    }

    async deleteFollow(docId) {
        try {
            return this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteFollowsCollectionId,
                docId
            );
        } catch (error) {
            console.log("Appwrite Service :: deleteFollow :: error ", error);
        }
    }
}

const followService = new FollowService();

export default followService;
