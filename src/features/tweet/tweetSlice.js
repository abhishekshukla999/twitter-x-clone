import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    tweetData: null,
};

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {
        addTweets: (state, action) => {
            state.status = true;
            state.tweetData = action.payload.tweetData;
        },

        removeTweets: (state) => {
            state.status = false;
            state.tweetData = null;
        },
    },
});

export const { addTweets, removeTweets } = tweetSlice.actions;

export default tweetSlice.reducer;
