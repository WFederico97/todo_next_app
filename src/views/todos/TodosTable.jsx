import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getTodos } from '@/store/todos/todoslice';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import TodosModal from './TodosModal';



export default function Todos() {
    const rows = useSelector((state) => state.todos.data);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const dispatch = useDispatch();
    // Función para eliminar una fila
    const handleRowDelete = (id) => {
        dispatch(deleteTodo(id))
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'title',
            headerName: 'Title',
            width: 150,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
            editable: true,
        },
        {
            field: 'priority',
            headerName: 'Priority',
            type: 'number',
            width: 110,
            editable: true,
        },
        // Columna personalizada para mostrar el botón de eliminar
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button variant="outlined" color="error" onClick={() => handleRowDelete(params.row.id)}>
                    X
                </Button>
            ),
        },
    ];

    React.useEffect(()=>{
        dispatch(getTodos({page:1, limit:10}))
    },[])



    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Button size="small" onClick={handleClickOpen}>
                    Add a row
                </Button>
            </Stack>
            <TodosModal open={open} handleClose={handleClose}/>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}