import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweetData: {},
    commentsData: [],
    commentsCount: 0,
};

const tweetPageSlice = createSlice({
    name: "tweetPage",
    initialState,
    reducers: {
        addTweetPageData: (state, action) => {
            state.tweetData = action.payload.tweetData;
            state.commentsData = action.payload.commentsData;
            state.commentsCount = action.payload.commentsCount;
        },
        removeTweetPageData: (state) => {
            state.tweetData = {};
            state.commentsData = [];
            state.commentsCount = 0;
        },
    },
});

export const { addTweetPageData, removeTweetPageData } = tweetPageSlice.actions;

export default tweetPageSlice.reducer;
