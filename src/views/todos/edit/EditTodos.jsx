import { getOneTodo } from '@/store/todos/todoslice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Router, useRouter } from 'next/router'
import EditForm from './EditForm'
import { fetchOneTodo } from '@/services/todos'



const EditTodos = ({id}) => {

    const router = useRouter()
    const [todo, setTodo] = useState()

    useEffect(() => {
        if(router.isReady) {
            const getTodoById = async () => {
                const todoFromServer = await fetchOneTodo(id)
                setTodo(todoFromServer)
              }
                getTodoById()
        }
    }, [id])
    
    

    if (todo) {
        return (
            <div>
                <EditForm todo={todo}/>
            </div>
        )
    } else if (router.isFallback) {
        return <div>Loading...</div>
    } else {
        return <div>No funca</div>
    }
    

}

export default EditTodos