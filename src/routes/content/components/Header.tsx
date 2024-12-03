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
import { ListItemButton } from "@mui/material";

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

const Header: React.FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = (open: boolean) => () => {
		setDrawerOpen(open);
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
					<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
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
				<Typography variant="h6" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
					MovieTime
				</Typography>

				{/* Search Bar */}
				<Search sx={{ flexGrow: 1 }}>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search movies…"
						inputProps={{ "aria-label": "search" }}
					/>
				</Search>

				{/* Navigation Links for Larger Screens */}
				<Box sx={{ display: { xs: "none", md: "flex" } }}>
					<Button color="inherit">Now Showing</Button>
					<Button color="inherit">Coming Soon</Button>
					<Button color="inherit">Offers</Button>
				</Box>

				{/* User Profile or Login */}
				<IconButton edge="end" color="inherit" aria-label="account">
					<AccountCircle />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
