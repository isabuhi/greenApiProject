import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        setAccount: (state, action) => {
            return { ...state, ...action.payload }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAccount } = authSlice.actions

export default authSlice.reducer