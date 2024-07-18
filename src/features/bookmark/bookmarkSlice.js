import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    bookmarksCount: 0,
};

const bookmarkSlice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {
        addBookmarks: (state, action) => {
            state.data = action.payload.data;
            state.bookmarksCount = action.payload.bookmarksCount;
        },
        removeBookmarks: (state) => {
            state.data = [];
            state.bookmarksCount = 0;
        },
    },
});

export const { addBookmarks, removeBookmarks } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
