import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        // get all users
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.users = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        getUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // delete user
        deleteUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUserSuccess: (state, action) => {
            state.users.splice(
                state.users.findIndex(item => item._id === action.payload),
                1
            );
            state.isFetching = false;
            state.error = false;
        },
        deleteUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // update user
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.users[state.users.findIndex(item => item._id === action.payload.id)] = action.payload.user;
            state.isFetching = false;
            state.error = false;
        },
        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // create a user
        createUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        createUserSuccess: (state, action) => {
            state.users.push(action.payload);
            state.isFetching = false;
            state.error = false;
        },
        createUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, updateUserStart, updateUserSuccess, updateUserFailure, createUserStart, createUserSuccess, createUserFailure } = userSlice.actions;

export default userSlice.reducer;