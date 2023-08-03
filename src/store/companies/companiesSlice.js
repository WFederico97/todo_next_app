 import { fetchCompanies } from "@/services/companies";
 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

 const initialState = {
    data: [],
    params: {}
 }

 export const getCompanies = createAsyncThunk('/company', async (params) => {
    const response = await fetchCompanies(params)

    return response
 })

 const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCompanies.fulfilled, (state, action) => {
            state.data = action.payload.companies
            state.params = action.payload.params
        })
    }
 })

 export default companiesSlice.reducer