import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos/todoslice";
import companiesSlice from "./companies/companiesSlice";
import countriesSlice from "./countries/countriesSlice";
import languagesSlice from "./languages/languagesSlice";

export const store = configureStore({
    reducer: {
        todos: todosSlice,
        companies: companiesSlice,
        countries: countriesSlice,
        languages: languagesSlice
    }
})