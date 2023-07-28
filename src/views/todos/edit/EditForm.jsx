import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Checkbox, MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '@/store/todos/todoslice';


const formSchema = yup.object({
    title: yup
        .string()
        .trim()
        .required("Campo Obligatorio"),

    description: yup
        .string()
        .trim()
        // .min(6, "La contraseña debe ser minimo 8 caracteres")
        .required("Campo Obligatorio"),
    priority: yup
        .number()
        // .min(6, "La contraseña debe ser minimo 8 caracteres")
        .required("Campo Obligatorio"),
    complete: yup
        .boolean()
        // .min(6, "La contraseña debe ser minimo 8 caracteres")
        .required("Campo Obligatorio"),
});

const EditForm = () => {
    const dispatch = useDispatch()
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title:todo.title,
            description: todo.description,
            priority: todo.priority,
            complete: todo.complete
        },
        mode: "all",
        resolver: yupResolver(formSchema),
    });

    const handleOnSubmit = (data) => {
        dispatch(updateTodo(data))
        reset()
        handleClose()
    }

    return (
        <div>
            <Dialog open={true} onClose={handleClose}>
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

export default EditForm