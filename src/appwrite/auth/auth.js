import { Client, Account, ID } from "appwrite";
import { config } from "../../config/config";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (user) {
                return user;
            }
        } catch (error) {
            console.log("Appwrite Service :: createAccount :: error ", error);
        }
    }

    async getCurrentUser() {
        try {
            const currentUser = await this.account.get();

            if (currentUser) {
                return currentUser;
            }
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error ", error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        } catch (error) {
            console.log("Appwrite Service :: login :: error ", error);
        }
    }

    // logout from current device
    async logout() {
        try {
            return await this.account.deleteSession("current");
        } catch (error) {
            console.log("Appwrite Service :: logout :: error ", error);
        }
    }
}

const authService = new AuthService();

export default authService;
