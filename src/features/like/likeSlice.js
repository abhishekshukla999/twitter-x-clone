import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    likesCount: 0,
};

const likeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        addLikes: (state, action) => {
            state.data = action.payload.data;
            state.likesCount = action.payload.likesCount;
        },
        removeLikes: (state) => {
            state.data = [];
            state.likesCount = 0;
        },
    },
});

export const { addLikes, removeLikes } = likeSlice.actions;

export default likeSlice.reducer;
