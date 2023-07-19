
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchData = createAsyncThunk('todo/fetchData', async params => {
    
    

    return
    })
  

    export const todoSlice = createSlice({
        name: 'todo',
        initialState: {
          data: [],
          params: {}
        },
        reducers: {},
        extraReducers: builder => {
          builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload
          })
        }
      })
     
export default todoSlice.reducer
  