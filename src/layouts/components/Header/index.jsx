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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import LogoIcon from "~/assets/images/logo.svg?react";
import ContrastIcon from "@mui/icons-material/Contrast";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useColorScheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "~/redux/authSlice";
import apiClient from "~/api/apiClient";

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

  const handeSettings = () => {
    setAnchorEl(null);
    navigate("/settings");
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
    dispatch(logoutUser(navigate));

    // ve trang login
    window.location.href = "/login";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ zIndex: 1000 }}
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
        <Avatar
          alt="123"
          src={user?.profile?.avatar}
          sx={{ width: "32px", height: "32px" }}
        />
        <Typography variant="subtitle1" noWrap>
          {user?.profile?.firstName} {user?.profile?.lastName}
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handeSettings}>
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

  const [addFlashcardFormOpen, setAddFlashcardFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const handleClickOpen = () => {
    setAddFlashcardFormOpen(true);
  };

  const handleClose = () => {
    setAddFlashcardFormOpen(false);
  };

  const handleCreateFlashcard = async () => {
    if (title === "") {
      setIsTouched(true);
      return;
    }

    // call api create flashcard
    const res = await apiClient.post("/flashcards/create", {
      title,
      description,
    });

    if (res.status === 200) {
      // redirect to flashcard detail
      navigate(`/flashcards/${res.data.data.id}/edit`);
    }

    setAddFlashcardFormOpen(false);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const [anchorElCreate, setAnchorElCreate] = useState(null);
  const isCreateMenuOpen = Boolean(anchorElCreate);

  const handleCreateMenuOpen = (event) => {
    setAnchorElCreate(event.currentTarget);
  };

  const handleCreateMenuClose = () => {
    setAnchorElCreate(null);
  };

  const createMenuId = "create-menu";

  const renderAddFlashcardForm = (
    <Dialog open={addFlashcardFormOpen} onClose={handleClose}>
      <DialogTitle>Create new flashcard</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new flashcard, please enter the title and description
          here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          onBlur={handleBlur}
          error={isTouched && title === ""}
          helperText={isTouched && title === "" ? "Title is required" : ""}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreateFlashcard}>Create</Button>
      </DialogActions>
    </Dialog>
  );

  const [addFolderFormOpen, setAddFolderFormOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isFolderTouched, setIsFolderTouched] = useState(false);

  const handleClickOpenFolder = () => {
    setAddFolderFormOpen(true);
  };

  const handleCloseFolder = () => {
    setAddFolderFormOpen(false);
  };

  const handleCreateFolder = async () => {
    if (folderName === "") {
      setIsFolderTouched(true);
      return;
    }

    // call api create folder
    try {
      const res = await apiClient.post("/library/folder", {
        name: folderName,
      });
      if (res.status === 200) {
        // redirect to folder detail
        navigate(`/folders/${res.data.data.id}`);
      }
    } catch (error) {
      console.error("Create folder error", error);
    }

    setAddFolderFormOpen(false);
  };

  const handleBlurFolder = () => {
    setIsFolderTouched(true);
  };

  const renderAddFolderForm = (
    <Dialog open={addFolderFormOpen} onClose={handleCloseFolder}>
      <DialogTitle>Create new folder</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new folder, please enter the name here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setFolderName(e.target.value)}
          value={folderName}
          onBlur={handleBlurFolder}
          error={isFolderTouched && folderName === ""}
          helperText={
            isFolderTouched && folderName === "" ? "Name is required" : ""
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseFolder}>Cancel</Button>
        <Button onClick={handleCreateFolder}>Create</Button>
      </DialogActions>
    </Dialog>
  );
  const renderCreateMenu = (
    <Menu
      anchorEl={anchorElCreate}
      id={createMenuId}
      open={isCreateMenuOpen}
      onClose={handleCreateMenuClose}
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
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <AddCircleIcon fontSize="small" />
        </ListItemIcon>
        Create new flashcard
      </MenuItem>
      <MenuItem onClick={handleClickOpenFolder}>
        <ListItemIcon>
          <AddCircleIcon fontSize="small" />
        </ListItemIcon>
        Create new folder
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
        position: "fixed",
        zIndex: 1000,
        py: 1,
        px: 3,
        paddingLeft: 10,
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
        onClick={() => (window.location.href = "/")}
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

      {user.id ? (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
          }}
        >
          {/* <IconButton
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
          </IconButton> */}
          <IconButton
            size="large"
            color="inherit"
            onClick={handleCreateMenuOpen}
          >
            <AddCircleIcon />
          </IconButton>
          {renderCreateMenu}
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{
              p: "8px",
              px: "12px",
            }}
          >
            {/* Avatar user */}
            <Avatar
              alt="Remy Sharp"
              src={user?.profile?.avatar}
              sx={{ width: "40px", height: "40px" }}
            />
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
      {renderAddFlashcardForm}
      {renderAddFolderForm}
    </Box>
  );
}

export default Header;
