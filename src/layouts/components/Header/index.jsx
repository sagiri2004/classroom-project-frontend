import React, { useState } from "react";
import {
  Box,
  SvgIcon,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Avatar,
  Divider,
  ListItemIcon,
  Button,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import LogoIcon from "~/assets/images/logo.svg?react";
import ContrastIcon from "@mui/icons-material/Contrast";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useColorScheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "~/api/userApi";

function Header() {
  // check user trong redux login currentUser
  const user = useSelector((state) => state?.auth?.login.currentUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isSubMenuOpen = Boolean(subAnchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mode, setMode } = useColorScheme();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleSubMenuClose();
  };

  const handleSubMenuOpen = (event) => {
    setSubAnchorEl(event.currentTarget);
  };

  const handleSubMenuClose = () => {
    setSubAnchorEl(null);
  };

  const handleChangeMode = (event) => {
    const modeValue = event.currentTarget.getAttribute("value");
    setMode(modeValue);
    handleSubMenuClose();
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logoutUser(dispatch, navigate);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      open={isMenuOpen}
      onClose={handleMenuClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleMenuClose}>
        <Avatar /> {user?.username}
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={handleSubMenuOpen}>
        <ListItemIcon>
          <ContrastIcon fontSize="small" />
        </ListItemIcon>
        Theme
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const subMenuId = "theme-submenu";
  const renderSubMenu = (
    <Menu
      anchorEl={subAnchorEl}
      id={subMenuId}
      open={isSubMenuOpen}
      onClose={handleSubMenuClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem value={"light"} onClick={handleChangeMode}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <LightModeIcon fontSize="small" />
          Light
        </Box>
      </MenuItem>
      <MenuItem value={"dark"} onClick={handleChangeMode}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <DarkModeIcon fontSize="small" />
          Dark
        </Box>
      </MenuItem>
      <MenuItem value={"system"} onClick={handleChangeMode}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <SystemUpdateAltIcon fontSize="small" />
          System
        </Box>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        bgcolor: "bg-header",
        height: (theme) => theme.custom.headerHeight,
        width: "100%",
        padding: 2,
        zIndex: 1000,
        position: "sticky",
        py: 1,
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "primary.dark",
      }}
    >
      {/* Logo và tên ứng dụng */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          height: "100%",
        }}
      >
        <SvgIcon
          component={LogoIcon}
          inheritViewBox
          sx={{ height: "100%", width: "auto" }}
        />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            display: { xs: "none", sm: "block" },
            fontWeight: "600",
            fontSize: "1rem",
          }}
          color="#007CC2"
        >
          Sagiri
        </Typography>
      </Box>

      {/* Thông báo và tài khoản người dùng */}

      {user ? (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
          }}
        >
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          {renderMenu}
          {renderSubMenu}
        </Box>
      ) : (
        <Box>
          <Link to="/login">
            <Button
              startIcon={<AccountCircleIcon />}
              variant="contained"
              sx={{
                textTransform: "none",
              }}
            >
              Login
            </Button>
          </Link>
          <IconButton
            size="large"
            edge="end"
            aria-label="mode"
            color="inherit"
            onClick={handleSubMenuOpen}
          >
            <ContrastIcon />
          </IconButton>

          {renderSubMenu}
        </Box>
      )}
    </Box>
  );
}

export default Header;
