import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    repliesCount: 0,
};

const replySlice = createSlice({
    name: "likeSlice",
    initialState,
    reducers: {
        addReplies: (state, action) => {
            state.data = action.payload.data;
            state.repliesCount = action.payload.repliesCount;
        },
        removeReplies: (state) => {
            return initialState;
        },
    },
});

export const { addReplies, removeReplies } = replySlice.actions;

export default replySlice.reducer;
