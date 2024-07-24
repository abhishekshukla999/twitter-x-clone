import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    followersData: [],
    followingData: [],
};

const followSlice = createSlice({
    name: "follows",
    initialState,
    reducers: {
        addFollowData: (state, action) => {
            state.followersData = action.payload.followersData;
            state.followingData = action.payload.followingData;
        },
        removeFollowData: (state) => {
            state.followersData = [];
            state.followingData = [];
        },
    },
});

export const { addFollowData, removeFollowData } = followSlice.actions;

export default followSlice.reducer;
