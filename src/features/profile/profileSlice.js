import { createSlice } from "@reduxjs/toolkit";

// for user Profile data
const initialState = {
    profileData: {},
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addProfileData: (state, action) => {
            state.profileData = action.payload.profileData;
        },
        removeProfileData: (state) => {
            state.profileData = {};
        },
    },
});

export const { addProfileData, removeProfileData } = profileSlice.actions;

export default profileSlice.reducer;
