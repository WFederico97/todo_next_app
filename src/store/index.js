import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos/todoslice";
import companiesSlice from "./companies/companiesSlice";

export const store = configureStore({
    reducer: { todos: todosSlice, companies: companiesSlice }
})