import { createSlice } from '@reduxjs/toolkit'

const account = {
    phoneNumber: null,
    messages: []
}
const initialstate = {
    addedAccounts: [],
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState: initialstate,
    reducers: {
        addAccount: (state, action) => {
            state.addedAccounts.push({ ...account, phoneNumber: action.payload})
        },
        addMessage: (state, action) => {
            state.addedAccounts.find((account, index) => {
                if (account.phoneNumber === action.payload.phoneNumber) {
                    state.addedAccounts[index].messages.push(action.payload.message)
                }
                else {
                    state.addedAccounts.push(action.payload)
                }
            })
        }
    },
})

// Action creators are generated for each case reducer function
export const { addAccount, addMessage } = chatSlice.actions

export default chatSlice.reducer