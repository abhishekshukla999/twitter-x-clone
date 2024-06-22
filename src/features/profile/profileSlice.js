import { createSlice } from "@reduxjs/toolkit";

// for user Profile data
const initialState = {
    status: false,
    profileData: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addProfileData: (state, action) => {
            state.status = true;
            state.profileData = action.payload.profileData
        },
        removeProfileData: (state) => {
            state.status = false;
            state.profileData = null;
        },
    },
});

export const { addProfileData, removeProfileData } = profileSlice.actions;

export default profileSlice.reducer;
