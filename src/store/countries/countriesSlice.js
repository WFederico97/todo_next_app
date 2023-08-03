import { fetchCountries } from "@/services/countries";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: [],
    params: {}
}

export const getCountries = createAsyncThunk('countries/getCountries', async (params) => {
    const response = await fetchCountries(params)

    return response
})

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCountries.fulfilled, (state,action) => {
            state.data = action.payload.countries
            state.params = action.payload.params
        })
    }
})

export default countriesSlice.reducer