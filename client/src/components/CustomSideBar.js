import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AppColors from '../constants/AppColors';
import { appImage } from '../assets/images';
import { Navigate } from "react-router-dom";
import CustomButton from './CustomButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function CustomSideBar({ theme, open, handleDrawerClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname);
    const navigation = [
        {
            id : 0,
            name : 'Home',
            route : '/',
            icon : AddCircleOutlineIcon,
        },
        {
            id : 1,
            name : 'My Uploads',
            route : '/uploads',
            icon : AddCircleOutlineIcon,
        },
        {
            id : 2,
            name : 'Settings',
            route : '/settings',
            icon : AddCircleOutlineIcon,
        }
    ]

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        width: 30,
                    }}
                    src={appImage}
                />
                <Typography component="h1" variant="h5" style={{ fontFamily: 'Rajdhani', fontSize: 36, fontWeight: 600, color: AppColors.primary }}>
                    Rostraa
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            {navigation.map((item, index)=>{
                return (
                    <CustomButton key={index} onTap={()=>{navigate(item.route)}} prefixIcon={item.icon} text={item.name} buttonStyle={{
                        borderRadius: 50,
                        backgroundColor: location.pathname == item.route ? AppColors.primary : AppColors.white,
                        fontFamily: 'Poppins',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: location.pathname == item.route ? AppColors.white : AppColors.primary,
                        marginY: 1,
                        marginX : 2,
                        display: 'flex',
                        justifyContent: 'start'
                      }} />
                )
            })}
        </Drawer>
    )
}

export default CustomSideBar