
export const getTodos = async () => {
    const token = window.localStorage.getItem('accessToken')
    const response = await axios.get('http://localhost:8000/token', { params: { page: 1, limit: 10 }, headers: { Authorization: `Bearer ${token}` }})
    
    return response.data
}

