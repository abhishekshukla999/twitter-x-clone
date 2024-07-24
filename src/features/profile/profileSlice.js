import { createSlice } from "@reduxjs/toolkit";

// for user Profile data
const initialState = {};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addProfileData: (state, action) => {
            return action.payload;
        },
        removeProfileData: (state, action) => {
            return initialState;
        },
    },
});

export const { addProfileData, removeProfileData } = profileSlice.actions;

export default profileSlice.reducer;
