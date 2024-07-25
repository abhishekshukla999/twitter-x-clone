import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const tweetSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {
        addTweets: (state, action) => {
            return action.payload;
        },
        removeTweets: (state, action) => {
            return initialState;
        },
    },
});

export const { addTweets, removeTweets } = tweetSlice.actions;

export default tweetSlice.reducer;
