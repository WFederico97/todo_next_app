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
import { addTodo } from '@/store/todos/todoslice';

const defaultValues = {
    title: "",
    description: "",
    priority: "",
    complete: true
};

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

export default function TodosModal({ open, handleClose }) {
    const dispatch = useDispatch()
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
                    <DialogTitle>Add a new todo</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill the form below to add a new todo to your todo list.
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
                        <Button type='submit'>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}