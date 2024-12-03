import React from "react";
import { Box, Typography, Grid2 as Grid, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer: React.FC = () => {
	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: "primary.main",
				color: "white",
				p: 4,
				mt: "auto",
			}}
		>
			<Grid container spacing={4}>
				{/* Quick Links Section */}
				<Grid size={{ xs: 12, md: 4 }}>
					<Typography variant="h6" gutterBottom>
						Quick Links
					</Typography>
					<Box>
						<Link href="#" color="inherit" underline="hover" display="block">
							Now Showing
						</Link>
						<Link href="#" color="inherit" underline="hover" display="block">
							Coming Soon
						</Link>
						<Link href="#" color="inherit" underline="hover" display="block">
							Offers
						</Link>
					</Box>
				</Grid>

				{/* Contact Section */}
				<Grid size={{ xs: 12, md: 4 }}>
					<Typography variant="h6" gutterBottom>
						Contact Us
					</Typography>
					<Typography variant="body2">Phone: (123) 456-7890</Typography>
					<Typography variant="body2">Email: support@movietime.com</Typography>
					<Typography variant="body2">Address: 123 Movie Lane, Filmtown, USA</Typography>
				</Grid>

				{/* Social Media Section */}
				<Grid size={{ xs: 12, md: 4 }}>
					<Typography variant="h6" gutterBottom>
						Follow Us
					</Typography>
					<Box>
						<IconButton href="#" color="inherit" aria-label="Facebook">
							<FacebookIcon />
						</IconButton>
						<IconButton href="#" color="inherit" aria-label="Twitter">
							<TwitterIcon />
						</IconButton>
						<IconButton href="#" color="inherit" aria-label="Instagram">
							<InstagramIcon />
						</IconButton>
					</Box>
				</Grid>
			</Grid>

			{/* Bottom Footer Section */}
			<Box mt={4} textAlign="center">
				<Typography variant="body2">
					© {new Date().getFullYear()} MovieTime. All Rights Reserved.
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;