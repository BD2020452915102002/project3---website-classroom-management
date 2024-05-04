import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo_hust from '../assets/image/logo-hust.png'
import {Link, Route, Routes} from "react-router-dom";
import News from "./student/News.jsx";
import Nav from "../layouts/Nav.jsx";
import Statistic from "./student/Statistic.jsx";
import {Avatar, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'center',
}));
const settings = ['Thông tin', 'Tài khoản','Đăng xuất'];

function Home() {
    const [open, setOpen] = React.useState(true);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };



    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open} className={'!bg-white !shadow-[0px_0px_20px] !shadow-gray-300'}>
                <Toolbar className={'flex items-center justify-between'}>
                    <IconButton
                        color="info"
                        aria-label="open drawer"
                        onClick={!open ? handleDrawerOpen : handleDrawerClose}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'flex'}), height: '50px', width: '50px'}}
                        className={'justify-center items-center'}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Bemy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                                <MenuItem  >
                                    <Typography textAlign="center" className={'!px-4'}>Thông tin</Typography>
                                </MenuItem>
                            <MenuItem>
                                <Typography textAlign="center" className={'!px-4'}>Tài khoản</Typography>
                            </MenuItem>
                            <MenuItem>
                                <Link to={'/login'}>
                                    <Typography textAlign="center" className={'!px-4'}>Đăng xuất</Typography>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
                className={'!outline-0 !border-0 !bg-red-400'}
            >
                <DrawerHeader>
                    <a href={'/'} className={'flex items-center justify-center hover:cursor-pointer'}>
                        <img src={logo_hust} alt="" className={'h-[40px]'}/>
                        <div className={' ml-2'}>
                            <h1 className={'font-bold text-gray-600'}><span
                                className={'text-red-600'}>HUST</span> / <span
                                className={'text-blue-600'}>PROJECT</span></h1>
                            <p className={'text-gray-500 -mt-1 text-[10px] italic'}>One love, one future</p>
                        </div>
                    </a>
                </DrawerHeader>
                <Divider/>
               <Nav/>
            </Drawer>
            <Main open={open} className={'!bg-[#F4F4F4]'}>
                <DrawerHeader/>
                <Routes>
                    <Route path={'/news'} element={<News/>}/>
                    <Route path={'/statistic'} element={<Statistic/>}/>
                </Routes>
            </Main>
        </Box>
    );
}

export default Home;