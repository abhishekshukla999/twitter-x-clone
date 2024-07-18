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

const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice,
    otherProfile: otherProfileSlice,
    tweets: tweetSlice,
    bookmarks: bookmarkSlice,
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
