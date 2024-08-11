import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const mediaSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
        addMedia: (state, action) => {
            return action.payload;
        },
        removeMedia: (state, action) => {
            return initialState;
        },
    },
});

export const { addMedia, removeMedia } = mediaSlice.actions;

export default mediaSlice.reducer;
