import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputBase from "@mui/material/InputBase";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ListItemButton, Menu, MenuItem } from "@mui/material";
import { useLogoutMutation } from "../services/logout.api";
import { useContentContext } from "../context/Content.hook";
import { useNavigate } from "react-router-dom";
import { useDeleteAccMutation } from "../services/deleteAcc.api";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState, selectIsAuth } from "../../../stores/authSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "auto",
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const drawerWidth = 240;

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [searchString, setSearchString] = useState("");
  const [logout] = useLogoutMutation();
  const [deleteAcc] = useDeleteAccMutation();
  const { handleOpenBackdrop, handleCloseBackdrop } = useContentContext();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuth);

  const redirectToProfile = () => {
    navigate("/profile");
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    dispatch(clearAuthState());
    navigate("/login");
  }

  const handleLogout = async () => {
    handleOpenBackdrop();
    await logout();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleCloseBackdrop();
    handleCloseUserMenu();
    navigate("/login");
  };

  const handleDeleteAcc = async () => {
    handleOpenBackdrop();
    await deleteAcc();
    await new Promise(resolve => setTimeout(resolve, 1000));
    handleCloseBackdrop();
    handleCloseUserMenu();
    navigate("/login");
  }

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate("/");
  };

  // Hàm tìm kiếm
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchString.trim()) {
      navigate(`/movies/search`, {
        state: { query: searchString },
        replace: true,
      });
    }
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Menu Icon for Smaller Screens */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <List>
              <ListItemButton>
                <ListItemText primary="Now Showing" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Coming Soon" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Offers" />
              </ListItemButton>
            </List>
          </Drawer>
        </Box>

        {/* Logo */}
        <Typography
          variant="h6"
          component="a"
          href="#/"
          onClick={handleLogoClick}
          noWrap
          sx={{
            fontFamily: "fantasy",
            fontWeight: 400,
            textDecoration: "none",
            flexGrow: 1,
            letterSpacing: "0rem",
            display: { xs: "none", sm: "block" },
          }}
        >
          Film Recommender
        </Typography>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ flexGrow: 1 }}>
          <Search
            sx={{
              flexGrow: 1,
              marginX: {
                xs: "1rem",
                md: "0",
              },
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search movies…"
              inputProps={{ "aria-label": "search" }}
              value={searchString} // Lưu giá trị input vào state
              onChange={(e) => setSearchString(e.target.value)} // Cập nhật state khi nhập
            />
          </Search>
        </form>

        {/* Navigation Links for Larger Screens */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit">Now Showing</Button>
          <Button color="inherit">Coming Soon</Button>
          <Button color="inherit">Offers</Button>
        </Box>

        {/* User Profile or Login - Signup */}
        {isAuthenticated == false ?
          (<Button color="inherit" onClick={handleLogin}>Login</Button>)
          : (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                id="user-icon-button"
                edge="end"
                color="inherit"
                aria-label="account"
                onClick={handleOpenUserMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="user-menu"
                sx={{ mt: "40px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={redirectToProfile}>
                  <Typography sx={{ textAlign: "left" }}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleDeleteAcc}>
                  <Typography sx={{ textAlign: "left" }}>Delete Account</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: "left" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
