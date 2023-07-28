import EditTodos from '@/views/todos/edit/EditTodos'
import { useRouter } from 'next/router'
import React from 'react'

const Edit = () => {
    const router = useRouter()
    const {id} = router.query.id

    return (
        <div>
            <EditTodos id={id}/>
        </div>
    )
}

export default Edit