import { getTodos } from '@/store/todos/todoslice'
import Todos from '@/views/todos/TodosTable'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function index() {


    return (
        <div>
            <Todos />
        </div>
    )
}
