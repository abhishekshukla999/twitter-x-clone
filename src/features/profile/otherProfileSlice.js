import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const otherProfileSlice = createSlice({
    name: "otherProfile",
    initialState,
    reducers: {
        addOtherProfile: (state, action) => {
            return action.payload;
        },
        removeOtherProfile: (state, action) => {
            return initialState;
        },
    },
});

export const { addOtherProfile, removeOtherProfile } =
    otherProfileSlice.actions;

export default otherProfileSlice.reducer;
