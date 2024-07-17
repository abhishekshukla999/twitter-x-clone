import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const tweetSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {
        addTweets: (state, action) => {
            return action.payload;
        },
        removeTweets: () => {
            return [];
        },
    },
});

export const { addTweets, removeTweets } = tweetSlice.actions;

export default tweetSlice.reducer;
