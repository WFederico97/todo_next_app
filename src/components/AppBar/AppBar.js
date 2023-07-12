// **  React Imports
import { useState } from 'react';


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
import LogoutIcon from '@mui/icons-material/Logout';

// ** Next Imports
import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';



export default function ButtonAppBar(s) {


    const {logOut, show} = useAuth()

    const logOutHandler = () => {
        logOut()
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid sx={{ display: 'flex', alignItems: "center" }}>
                        <List sx={{ display: "inline-flex" }}  >
                            <ListItem >
                                <Link style={{ textDecoration: "none", color: "#fff" }} href="/">Home</Link>
                            </ListItem>
                            <ListItem>
                                <Link style={{ textDecoration: "none", color: "#fff" }} href="/register">Register</Link>
                            </ListItem>
                            <ListItem>
                                <Link style={{ textDecoration: "none", color: "#fff" }} href="/login">Login</Link>
                            </ListItem>
                        </List>
                        {
                            show && <Button onClick={logOutHandler} ><LogoutIcon  color='action' /></Button>
                        }
                    </Grid>
                    <Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}