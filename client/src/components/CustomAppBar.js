import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppColors from "../constants/AppColors";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import CustomButton from "./CustomButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentLocation } from "../shared-services/SharedFunctions";
import { FontSizeStandards } from "../constants/FontSizeStandards";
import UploadVideo from "./UploadVideo";
import { CustomStyle } from "../constants/CustomStyle";

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "6px",
  color: AppColors.grey,
  borderColor: AppColors.grey,
  border: "1px solid",
  "&:hover": {
    borderColor: AppColors.primary,
  },
  "&:focused": {
    borderColor: AppColors.primary,
  },
  // marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    // marginLeft: theme.spacing(1),
    width: "40%",
  },
  [theme.breakpoints.up("lg")]: {
    // marginLeft: theme.spacing(3),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function CustomAppBar({ toggleDrawer, open }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const location = useLocation();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const userReducerState = useSelector((state) => state.userRed);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const afterUpload=()=>{
    navigate("/uploads");
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleModal = () => setIsModalOpen(!isModalOpen);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <CustomButton
          prefixIcon={AddCircleOutlineIcon}
          onTap={
            ()=>{
              handleModal();
            }
          }
          text={"upload video"}
          buttonStyle={{
            borderRadius: 50,
            backgroundColor: AppColors.tint,
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 600,
            color: AppColors.primary,
          }}
        />
      </MenuItem>
      <UploadVideo
            isModalOpen={isModalOpen}
            handleModal={handleModal}
            fetchVideos={afterUpload}
          />
      <MenuItem></MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: AppColors.primary }}>N</Avatar>
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{
                fontFamily: "Poppins",
                fontSize: 14,
                fontWeight: 500,
                color: AppColors.tertiary,
              }}
            >
              {userReducerState?.userDetail?.first_name}
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              style={{
                fontFamily: "Poppins",
                fontSize: 10,
                fontWeight: 400,
                color: AppColors.secondary,
              }}
            >
              {userReducerState?.userDetail?.email}
            </Typography>
          </Container>
        </Box>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: AppColors.white }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color={AppColors.primary}
            onClick={toggleDrawer}
            aria-label="open drawer"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: AppColors.tertiary,
              display: { xs: "none", sm: "block" },
              marginRight: { xs: 4, lg: 12 },
            }}
          >
            {getCurrentLocation(location)}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              fullWidth
              placeholder="Search…"
              width="inherit"
              inputProps={{ "aria-label": "search",}}
              style={
                {color: AppColors.tertiary,}
              }
            />
          </Search>
          <CustomButton
          onTap={()=>{handleModal();}}
            prefixIcon={AddCircleOutlineIcon}
            text={"upload video"}
            buttonStyle={{
              borderRadius: 50,
              backgroundColor: AppColors.tint,
              fontFamily: "Poppins",
              fontSize:   {
                typography: {
                  xs: FontSizeStandards.secondaryHeading.xs,
                  sm: FontSizeStandards.secondaryHeading.sm,
                  md: FontSizeStandards.secondaryHeading.md,
                  lg: FontSizeStandards.secondaryHeading.lg,
                },
              },
              fontWeight: 600,
              color: AppColors.primary,
              marginLeft: 6,
              display: { xs: "none", md: "flex" },
            }}
          />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 6,
            }}
          >
            <Avatar sx={{ bgcolor: AppColors.primary }}>
              {userReducerState?.userDetail?.name}
            </Avatar>
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  color: AppColors.tertiary,
                }}
                sx={{ fontSize: { xs: "12px", lg: "14px" } }}
              >
                {userReducerState?.userDetail?.first_name}
              </Typography>
              <Typography
                component="h1"
                variant="h5"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  color: AppColors.secondary,
                }}
                sx={{ fontSize: { xs: "10px", lg: "12px" } }}
              >
                {userReducerState?.userDetail?.email}
              </Typography>
            </Container>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color={AppColors.primary}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color={AppColors.primary}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}

export default CustomAppBar;
