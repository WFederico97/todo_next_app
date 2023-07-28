import axios from "axios"

// const token = JSON.parse(localStorage.getItem('accessToken'))
let token = null;

if (typeof window !== "undefined") {
  token = JSON.parse(localStorage.getItem('accessToken'));
}

export const fetchTodos = async (params) => {
    const response = await axios.get('http://localhost:8000/', { params: { page: params.page, limit: params.limit }, headers: { Authorization: 'Bearer ' + token } })

    return { todos: response.data, params }
}

export const fetchOneTodo = async (id) => {
    const response = await axios.get(`http://localhost:8000/todo/${id}`, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
}

export const fetchAddTodo = async (todo) => {
    const response = await axios.post('http://localhost:8000/todo', todo, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
}

export const fetchDeleteTodo = async (id) => {
    const response = await axios.delete(`http://localhost:8000/todo/${id}`, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
}

export const fetchUpdateTodo = async (id, data) => {
    const response = await axios.put(`http://localhost:8000/todo/${id}`, data, { headers: { Authorization: 'Bearer ' + token } })
    return response.data
}