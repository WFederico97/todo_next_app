// ** MUI imports
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';



// ** Next Imports
import Link from 'next/link';


export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid xs={12} sm={12}>
                        <List  sx={{display:'flex'}}>
                            <ListItem >
                                <Link style={{textDecoration: "none", color:"#fff"}}  href="/">Home</Link>
                            </ListItem>
                            <ListItem>
                                <Link style={{textDecoration: "none", color:"#fff"}} href="/register">Register</Link>
                            </ListItem>
                            <ListItem>
                                <Link style={{textDecoration: "none", color:"#fff"}} href="/login">Login</Link>
                            </ListItem>
                        </List>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}