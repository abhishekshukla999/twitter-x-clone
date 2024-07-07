import { config } from "../../config/config";
import { Client, Storage, ID } from "appwrite";

class TweetMediaService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteTweetsBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error ", error);
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.appwriteTweetsBucketId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error ", error);
        }
    }

    getFilePreview(fileId) {
        try {
            return this.getFilePreview(config.appwriteTweetsBucketId, fileId);
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error ", error);
        }
    }
}

const tweetMediaService = new TweetMediaService();

export default tweetMediaService;
