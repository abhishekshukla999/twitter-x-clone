import { config } from "../../config/config";
import { Client, Databases, ID } from "appwrite";

class ReplyService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createReply({ userId, tweetId, content, media = "" }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteRepliesCollectionId,
                ID.unique(),
                {
                    userId,
                    tweetId,
                    content,
                    media,
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: createReply :: error ", error);
        }
    }

    async getReply(docId, queries = []) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteRepliesCollectionId,
                docId,
                queries
            );
        } catch (error) {
            console.log("Appwrite Service :: getReply :: error ", error);
        }
    }

    async getReplies(queries = []) {
        try {
            return this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteRepliesCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite Service :: getReplies :: error ", error);
        }
    }

    async updateReply(docId, { ...data }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteRepliesCollectionId,
                docId,
                {
                    ...data,
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: updateReply :: error ", error);
        }
    }

    async deleteReply(docId) {
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteRepliesCollectionId,
                docId
            );
        } catch (error) {
            console.log("Appwrite Service :: deleteReply :: error ", error);
        }
    }
}

const replyService = new ReplyService();

export default replyService;
