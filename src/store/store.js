import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../features/auth/authSlice";
import profileSlice from "../features/profile/profileSlice";
import tweetSlice from "../features/tweet/tweetSlice";
import otherProfileSlice from "../features/profile/otherProfileSlice";
import bookmarkSlice from "../features/bookmark/bookmarkSlice";
import likeSlice from "../features/like/likeSlice";
import tweetPageSlice from "../features/tweet/tweetPageSlice";
import followSlice from "../features/follow/follow";
import replySlice from "../features/replies/replySlice";
import mediaSlice from "../features/media/mediaSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice,
    otherProfile: otherProfileSlice,
    tweets: tweetSlice,
    bookmarks: bookmarkSlice,
    likes: likeSlice,
    tweetPage: tweetPageSlice,
    follows: followSlice,
    replies: replySlice,
    media: mediaSlice,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE],
            },
        }),
});

export default store;

export const persistor = persistStore(store);
