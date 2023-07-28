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
import { updateTodo } from '@/store/todos/todoslice';
import { useEffect } from 'react';

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
        .required("Campo Obligatorio"),
    priority: yup
        .number()
        .required("Campo Obligatorio"),
    complete: yup
        .boolean()
        .required("Campo Obligatorio"),
});

export default function TodosUpdateModal({ open, handleCloseUpdate, todo }) {
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
      setValue,                                //metodo de RHF para establecer los valores de los campos controlados en el formulario                               
    } = useForm({
      defaultValues,
      mode: "all",
      resolver: yupResolver(formSchema),
    });

    const dispatch = useDispatch();
  
    useEffect(() => {
      if (todo) {
        setValue('title', todo.title || '');              // Se etablecen los valores predeterminados del form con los del todo
        setValue('description', todo.description || '');
        setValue('priority', todo.priority || '');
        setValue('complete', todo.complete );
      }
    }, [todo, setValue]);

    const handleOnSubmit = async (data) => {
        try {
            const updatedTodo = { ...data, id: todo.id };
            dispatch(updateTodo(updatedTodo));
            reset();
            handleCloseUpdate();
        } catch (error) {
          console.error('Error updating todo:', error);
        }
      };

    return (
        <div>
            <Dialog open={open} onClose={handleCloseUpdate}>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <DialogTitle>Update todo</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill all the fields
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
                                <Checkbox onChange={onChange} checked={value} />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseUpdate}>Cancel</Button>
                        <Button type='submit'>Edit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}