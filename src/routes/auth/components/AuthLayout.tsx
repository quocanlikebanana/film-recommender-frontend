import React from 'react';
import { Box, Slide } from '@mui/material';
import background from '/src/assets/background.jpg';
import { Outlet } from 'react-router-dom';


const AuthLayout: React.FC = () => {
	return (
		<Slide in>
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
				backgroundImage: `url(${background})`,
				backgroundSize: 'auto',
				backgroundPosition: 'center',
				paddingY: 3
			}}>
				<Outlet />
			</Box>
		</Slide>
	);
};

export default AuthLayout;