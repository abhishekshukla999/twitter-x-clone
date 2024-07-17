import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    tweets: 0,
    followers: 0,
    following: 0,
};

const otherProfileSlice = createSlice({
    name: "otherProfile",
    initialState,
    reducers: {
        addOtherProfile: (state, action) => {
            state.data = action.payload.data;
            state.tweets = action.payload.tweets;
            state.followers = action.payload.followers;
            state.following = action.payload.following;
        },
        removeOtherProfile: (state) => {
            state.data = {};
            state.tweets = 0;
            state.followers = 0;
            state.following = 0;
        },
    },
});

export const { addOtherProfile, removeOtherProfile } =
    otherProfileSlice.actions;

export default otherProfileSlice.reducer;
