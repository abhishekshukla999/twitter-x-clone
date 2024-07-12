import { Client, Databases } from "appwrite";
import { config } from "../../config/config";

class ProfileService {
    client = new Client();
    databases;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createProfile({ userId, username, email, name, dob, ...rest }) {
        try {
            const profile = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                userId,
                { username, email, name, dob, ...rest }
            );

            if (profile) {
                return profile;
            }
        } catch (error) {
            console.log("Appwrite Service :: createProfile :: error ", error);
        }
    }

    async getProfile(docId) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                docId
            );
        } catch (error) {
            console.log("Appwrite Service :: getProfile :: error ", error);
        }
    }

    async updateProfile(docId, { ...data }) {
        try {
            return this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                docId,
                { ...data }
            );
        } catch (error) {
            console.log("Appwrite Service :: updateProfile :: error ", error);
        }
    }

    async deleteProfile(docId) {
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                docId
            );
        } catch (error) {
            console.log("Appwrite Service :: deleteProfile :: error ", error);
        }
    }
}

const profileService = new ProfileService();

export default profileService;
