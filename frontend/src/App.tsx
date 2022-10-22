import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import SearchIcon from "@mui/icons-material/Search";
import FaceIcon from '@mui/icons-material/Face';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptIcon from '@mui/icons-material/Receipt';

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import YouTubeIcon from "@mui/icons-material/YouTube";

import Home from "./components/Home";
import Admins from "./components/Admins";
import AdminrCreate from "./components/AdminCreate";
import SliplistCreate from "./components/SliplistCreate";
import Sliplist from "./components/Sliplist";

import SignIn from "./components/Signin";
import AdminCreate from "./components/AdminCreate";


const drawerWidth = 340;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const menu = [
 { name: "หน้าหลัก", icon: <HomeIcon color="primary" />, path: "/" },
 { name: "ลงทะเบียนข้อมูลนักศึกษา", icon: <SearchIcon color="primary" />, path: "/UserFind" },
 { name: "ลงทะเบียนขอทุนการศึกษาศึกษา", icon: <AppRegistrationIcon color="primary"/>, path: "/syndicate" },
 { name: "คัดเลือกนักศึกษา", icon: <HowToRegIcon color="primary" />, path: "/MemberFind" },
 { name: "การจัดการทุน", icon: <PaidIcon color="primary" />, path: "/member" },
 { name: "ผู้ให้ทุน", icon: <BusinessCenterIcon color="primary" />, path: "/TraderFind" },
 { name: "บันทึกข้อมูลธุรกรรมการเงินทุนการศึกษา", icon: <ReceiptIcon color="primary" />, path: "/sliplist" },
];

function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                G02 : ระบบทุนการศึกษา
              </Typography>
              <Button variant="outlined" color="inherit" onClick={signout}>
                Log out
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              {menu.map((item, index) => (
                <Link
                  to={item.path}
                  key={item.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route  path="/" element={<Home />} />
              <Route  path="/admins" element={<Admins />} />
              <Route  path="/admin/create" element={<AdminCreate />} />
              <Route  path="/sliplist/create" element={<SliplistCreate />} />
              <Route  path="/sliplist" element={<Sliplist />} />  
              </Routes>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;

// import Home from "./components/Home";
// import Admins from "./components/Admins";
// import AdminrCreate from "./components/AdminCreate";
// import SliplistCreate from "./components/SliplistCreate";
// import SignIn from "./components/Signin";
// import AdminCreate from "./components/AdminCreate";

// { name: "หน้าหลัก", icon: <HomeIcon color="primary" />, path: "/" },
// { name: "ระบบลงทะเบียนข้อมูลนักศึกษา", icon: <SearchIcon color="secondary" />, path: "/UserFind" },
// { name: "ระบบลงทะเบียนขอทุนการศึกษาศึกษา", icon: <AppRegistrationIcon color="secondary"/>, path: "/syndicate" },
// { name: "ระบบคัดเลือกนักศึกษา", icon: <HowToRegIcon color="secondary" />, path: "/MemberFind" },
// { name: "ระบบการจัดการทุน", icon: <PaidIcon color="secondary" />, path: "/member" },
// { name: "ระบบผู้ให้ทุน", icon: <BusinessCenterIcon color="secondary" />, path: "/TraderFind" },
// { name: "ระบบบันทึกข้อมูลธุรกรรมการเงินทุนการศึกษา", icon: <ReceiptIcon color="secondary" />, path: "/sliplist" },

              // <Route  path="/" element={<Home />} />
              // <Route  path="/admins" element={<Admins />} />
              // <Route  path="/admin/create" element={<AdminCreate />} />
              // <Route  path="/sliplist/create" element={<SliplistCreate />} />