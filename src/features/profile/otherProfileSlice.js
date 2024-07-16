import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    otherProfile: null,
};

const otherProfileSlice = createSlice({
    name: "otherProfile",
    initialState,
    reducers: {
        addOtherProfile: (state, action) => {
            state.status = true;
            state.otherProfile = action.payload.currentProfile;
        },
        removeOtherProfile: (state) => {
            state.status = false;
            state.otherProfile = null;
        },
    },
});

export const { addOtherProfile, removeOtherProfile } =
    otherProfileSlice.actions;

export default otherProfileSlice.reducer;
