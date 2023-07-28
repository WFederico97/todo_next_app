import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, getOneTodo } from '@/store/todos/todoslice';





const EditTodos = ({id}) => {
    const dispatch = useDispatch()
    const todo = useSelector(state => state.todos.activeTodo)

    useEffect(()=>{
        const getTodoById = async =>{
            dispatch(getOneTodo(id))
        }
        getTodoById()
    },[id])
  return (
    <div>EditTodos</div>
  )
}

export default EditTodos







 function TodosModal({ open, handleClose }) {
    
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "all",
        resolver: yupResolver(formSchema),
    });

    const handleOnSubmit = (data) => {
        dispatch(addTodo(data))
        reset()
        handleClose()
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <TextField sx={{ m: 1 }} label="title" {...field} />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField sx={{ m: 1 }} label="description" {...field} />
                            )}
                        />
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={value}
                                    label="Age"
                                    onChange={onChange}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            )}
                        />
                        <Controller
                            name="complete"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Checkbox onChange={onChange} value={value} />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Subscribe</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}