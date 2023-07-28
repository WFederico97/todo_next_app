import { fetchAddTodo, fetchDeleteTodo, fetchOneTodo, fetchTodos, fetchUpdateTodo } from "@/services/todos"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    params: {},
    activeTodo: {}
}

export const getTodos = createAsyncThunk('todos/getTodos', async (params) => {
    const response = await fetchTodos(params)
    return response
})

export const getOneTodo = createAsyncThunk('todos/getOneTodo', async (id) => {
    const response = await fetchOneTodo(id)
    return response
})

export const addTodo = createAsyncThunk('todos/addTodo', async (data, { dispatch, getState }) => {
    await fetchAddTodo(data)
    await dispatch(getTodos(getState().todos.params))
    return data
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, { dispatch, getState }) => {
    await fetchDeleteTodo(id)
    await dispatch(getTodos(getState().todos.params))
    return id
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async (data, { dispatch, getState }) => {
    const { id } = data; 
    await fetchUpdateTodo(id, data);
    await dispatch(getTodos(getState().todos.params));
    return data;
  });

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getTodos.fulfilled, (state, action) => {
            state.data = action.payload.todos
            state.params = action.payload.params
        })
            .addCase(getOneTodo.fulfilled, (state, action) => {
                state.activeTodo = action.payload
            })
    }
})

export default todosSlice.reducer