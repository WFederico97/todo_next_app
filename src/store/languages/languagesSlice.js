import { fetchLanguages } from "@/services/languages";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    params: {}
}

export const getLanguages = createAsyncThunk('languages/getLanguages', async (params) => {

    const response = await fetchLanguages(params)

    console.log(response)
    
    return response
})

const languagesSlice = createSlice({
    name: 'languages',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getLanguages.fulfilled, (state, action) => {
            state.data = action.payload.languages
            state.params = action.payload.params
        })
    }
})

export default languagesSlice.reducer