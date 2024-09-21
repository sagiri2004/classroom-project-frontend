import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import SchoolIcon from "@mui/icons-material/School";

const openedMixin = (theme) => ({
  width: theme.custom.drawerWidthMax,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  width: theme.custom.drawerWidthMin,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  height: theme.custom.headerHeight,
  borderBottom: "1px solid",
  borderColor: theme.palette.primary.dark,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: theme.custom.drawerWidthMax,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.sidebar,
    borderRight: 0,
  },

  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState(null);

  React.useEffect(() => {
    setCurrentUrl(window.location.pathname);
  }, []);

  const handleListItemClick = (url) => {
    // tai lai trang
    window.location.href = url;
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        borderRight: 0,
      }}
    >
      <DrawerHeader>
        {open ? (
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        ) : (
          <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <List>
        {["Home", "Library", "Class"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon
                onClick={() => {
                  if (index === 0) {
                    handleListItemClick("/");
                  } else if (index === 1) {
                    handleListItemClick("/library");
                  } else if (index === 2) {
                    handleListItemClick("/class");
                  }
                }}
              >
                {index === 0 && (
                  <HomeIcon
                    color={currentUrl === "/" ? "primary" : "inherit"}
                  />
                )}
                {index === 1 && (
                  <FolderSharedIcon
                    color={currentUrl === "/library" ? "primary" : "inherit"}
                  />
                )}
                {index === 2 && (
                  <SchoolIcon
                    color={currentUrl === "/class" ? "primary" : "inherit"}
                  />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
