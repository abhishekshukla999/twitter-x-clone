import { Client, Databases } from "appwrite";
import { config } from "../../config/config";

class ProfileService {
    client = new Client();
    databases;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    // userId to match id created during auth and userId stored in profile collection should be same
    // note: as appwrite methods returns a promise already, if any promise is not fulfilled it will
    // throw an error automatically (due any network failure or any reason that promise is rejected)
    // you can use the if-else when you need to perform other task, otherwise no use
    async createProfile({ userId, username, email, name, dob, ...rest }) {
        try {
            const profile = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                userId,
                { userId, username, email, name, dob, ...rest }
            );

            if (profile) {
                return profile;
            }
        } catch (error) {
            console.log("Appwrite Service :: createProfile :: error ", error);
        }
    }

    async getProfile(userId) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                userId
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
            console.log("Appwrite Service :: getProfile :: updateProfile ", error);
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
            console.log("Appwrite Service :: deleteProfile :: updateProfile ", error);
        }
    }
}

const profileService = new ProfileService();

export default profileService;
