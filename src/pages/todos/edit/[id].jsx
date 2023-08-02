 import EditTodos from '@/views/todos/edit/editTodos'
import { useRouter } from 'next/router'

const Edit = () => {

    const router = useRouter()
    const id = router.query.id

    console.log(router.query.id)
    
    return (
        <div>
            <EditTodos id={router.query.id}/>
        </div>
    )
}

// export const getServerSideProps = async (context) => {
    
//     const id = context.params.id

//     const todo = await fetchOneTodo(id)
    
//     return {
//         props: {
//             todo
//         }
//     }
// }

export default Edit

