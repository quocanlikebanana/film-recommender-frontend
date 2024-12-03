import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useRouteError } from "react-router-dom";
import resolveErrorMessage from "../error/resolve.error";
import background from "../assets/background.jpg";

const ErrorPage: React.FC = () => {
	const error = useRouteError();
	const errorMessage = resolveErrorMessage(error);

	return (
		<Container sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			minHeight: '100vh',
			minWidth: '100%',
			backgroundImage: `url(${background})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			margin: 0,
			padding: 0,
		}}>
			<Container
				maxWidth="sm"
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					textAlign: "center",
					backgroundColor: "#f5f5f5",
					borderRadius: 2,
					boxShadow: 3,
					padding: 4,
				}}
			>
				{/* Error Icon */}
				<ErrorOutlineIcon
					sx={{ fontSize: 80, color: "error.main", mb: 2 }}
				/>

				{/* Error Message */}
				<Typography variant="h4" gutterBottom>
					Oops! Something Went Wrong
				</Typography>
				<Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
					{errorMessage}
				</Typography>

				{/* Retry or Home Button */}
				<Box sx={{ mt: 2 }}>
					<Button
						variant="contained"
						color="primary"
						sx={{ mr: 2 }}
						onClick={() => window.location.reload()}
					>
						Retry
					</Button>
					<Button
						variant="outlined"
						color="primary"
						href="/"
					>
						Go to Homepage
					</Button>
				</Box>
			</Container>
		</Container>
	);
};

export default ErrorPage;
