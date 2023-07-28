import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos/todoslice";

export const store = configureStore({
    reducer: { todos: todosSlice }
})