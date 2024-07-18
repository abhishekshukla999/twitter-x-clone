import { Client, ID, Storage } from "appwrite";
import { config } from "../../config/config";

class ProfileMediaService {
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
                config.appwriteProfileBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error ", error);
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteProfileBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error ", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.appwriteProfileBucketId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite Service :: getFilePreview :: error ", error);
        }
    }

    getCustomFilePreview(fileId, width, height) {
        try {
            return this.storage.getFilePreview(
                config.appwriteProfileBucketId,
                fileId,
                width,
                height
            );
        } catch (error) {
            console.log("Appwrite Service :: getCustomFilePreview :: error ", error);
        }
    }
}

const profileMediaService = new ProfileMediaService();

export default profileMediaService;
