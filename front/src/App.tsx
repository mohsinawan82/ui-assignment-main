// import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import TaskProvider from "./redux/TaskProvider";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Avatar } from "@mui/material";

const drawerWidth = 240;

interface Props {
  /**
   *
   *
   */
  window?: () => Window;
}

export default function App(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        <img width={40} height={40} src="/logo.png" alt="logo" />
      </Toolbar>
      <Divider />
      <List>
        {[
          { name: "Drinks", route: "/" },
          { name: "Create Drink", route: "/drink/new" },
        ].map((data, index) => (
          <ListItem key={data.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <Link to={data.route}>
                <ListItemText primary={data.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TaskProvider>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                backgroundColor: "white",
              }}
            >
              <Toolbar
                sx={{ display: "flex", justifyContent: { xs: "space-between", md:'flex-end' } }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { md: "none" }, color: "black" }}
                >
                  <MenuIcon />
                </IconButton>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Avatar
                    sx={{ border: "1px solid black", width: 50, height: 50 }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQExWQXLvg3Hq_4jXTBDltCQjNAarU4omKHaA&s"
                  />
                  <Box>
                    <Typography
                      sx={{ fontSize: 12, fontWeight: 500, color: "#64748B" }}
                    >
                      Welcome back 👋
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 500, color: "#081021" }}
                    >
                      Bilal Khalid
                    </Typography>
                  </Box>
                </Box>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", md: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: { md: 3, xs: 1 },
                width: { md: `calc(100% - ${drawerWidth}px)` },
              }}
            >
              <Toolbar />
              <Outlet />
            </Box>
          </Box>
        </TaskProvider>
      </PersistGate>
    </Provider>
  );
}
