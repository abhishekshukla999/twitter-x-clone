import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweetData: {},
    repliesData: [],
    repliesCount: 0,
};

const tweetPageSlice = createSlice({
    name: "tweetPage",
    initialState,
    reducers: {
        addTweetPageData: (state, action) => {
            state.tweetData = action.payload.tweetData;
            state.repliesData = action.payload.repliesData;
            state.repliesCount = action.payload.repliesCount;
        },
        removeTweetPageData: (state, action) => {
            return initialState;
        },
    },
});

export const { addTweetPageData, removeTweetPageData } = tweetPageSlice.actions;

export default tweetPageSlice.reducer;
