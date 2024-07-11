import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    tweetsData: null,
};

const tweetSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {
        addTweets: (state, action) => {
            state.status = true;
            state.tweetsData = action.payload.tweetsData;
        },
        deleteTweet: (state, action) => {
            state.tweetsData = state.tweetsData.filter(
                (tweet) => tweet.$id !== action.payload.tweetId
            );
        },
        updateTweets: (state, action) => {
            state.tweetsData = state.tweetsData.map((tweet) => {
                return tweet.$id === action.payload.tweetId
                    ? action.payload.tweet
                    : tweet;
            });
        },
        removeTweets: (state) => {
            state.status = false;
            state.tweetsData = null;
        },
    },
});

export const { addTweets, deleteTweet, updateTweets, removeTweets } =
    tweetSlice.actions;

export default tweetSlice.reducer;
