import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AppColors from '../constants/AppColors';
import { appImage } from '../assets/images';
import CustomButton from './CustomButton';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { Container } from '@mui/material';

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
            icon : HomeIcon,
        },
        {
            id : 1,
            name : 'My Uploads',
            route : '/uploads',
            icon : UploadFileIcon,
        },
        {
            id : 2,
            name : 'Settings',
            route : '/settings',
            icon : SettingsIcon,
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
            <Container style={{height: 30}}/>
            {navigation.map((item, index)=>{
                return (
                    <CustomButton key={index} onTap={()=>{navigate(item.route)}} prefixIcon={item.icon} text={open && item.name} buttonStyle={{
                        borderRadius: open && 50,
                        backgroundColor: location.pathname === item.route && open ? AppColors.primary : AppColors.white,
                        fontFamily: 'Poppins',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: location.pathname === item.route && open ? AppColors.white : location.pathname === item.route ? AppColors.primary :  AppColors.tertiary,
                        marginY: 1,
                        marginX : open && 2,
                        display: 'flex',
                        justifyContent: open ? 'start' : 'center'
                      }} />
                )
            })}
        </Drawer>
    )
}

export default CustomSideBar