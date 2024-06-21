import { createSlice } from "@reduxjs/toolkit";

// for user Profile data
const initialState = {
    state: false,
    userData: null,
    tweets: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        profileData: (state, action) => {},
    },
});

export const { profileData } = profileSlice.actions;

export default profileSlice.reducer;
