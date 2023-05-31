import { configureStore } from '@reduxjs/toolkit'
import authSlice, { authInitialState } from './authSlice'
import chatSlice from './chatSlice'
import localStorage from '../utils/localStorage'


const authStorage = localStorage.getStorage("auth");

const preloadedState = {
    auth: authStorage,
};


export const rootReducer = {
    auth: authSlice,
    chat: chatSlice,
};


export const store = configureStore({
    reducer: rootReducer,
    preloadedState
})


store.subscribe(() => {
    localStorage.setStorage("auth", store.getState().auth);
});

