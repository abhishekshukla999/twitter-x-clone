export const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUsersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    appwriteTweetsCollectionId: String(import.meta.env.VITE_APPWRITE_TWEETS_COLLECTION_ID),
    appwriteBookmarkssCollectionId: String(import.meta.env.VITE_APPWRITE_BOOKMARKS_COLLECTION_ID),
    appwriteProfileBucketId: String(import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID),
    appwriteTweetsBucketId: String(import.meta.env.VITE_APPWRITE_TWEETS_BUCKET_ID),
};
