import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    profileData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData || state.userData;
            state.profileData = action.payload.profileData || state.profileData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.profileData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
