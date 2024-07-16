import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    tweetsData: [],
};

const tweetSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {
        addTweets: (state, action) => {
            state.status = true;
            state.tweetsData = action.payload.tweetsData;
        },
        removeTweets: (state) => {
            state.status = false;
            state.tweetsData = [];
        },
    },
});

export const { addTweets, removeTweets } = tweetSlice.actions;

export default tweetSlice.reducer;
