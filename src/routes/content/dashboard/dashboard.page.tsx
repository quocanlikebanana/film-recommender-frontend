import TrendingMovies from './components/TrendingMovies';
import HeroSection from './components/HeroSection';
import axios from 'axios';
import React from 'react';
import { Button } from '@mui/material';
import LocalStorageService from '../../../services/localstorage.service';

import PopularMovies from "./components/PopularMovies";
import ChatButton from "../../components/ChatButton";
import Trailers from "./components/Trailers";
import { backendURL } from '../../../app/env';


const Dashboard = () => {
	const [isVerify, setIsVerify] = React.useState(false);

	async function isVerified() {
		console.log('FE token', LocalStorageService.getAccessToken());
		const res = await axios.get(backendURL + 'auth/isVerify', {
			headers: {
				Authorization: `Bearer ${LocalStorageService.getAccessToken()}`,
			}
		});
		if (res.status === 200) {
			setIsVerify(true);
		}
	}

	React.useEffect(() => {
		isVerified();
	}, []);

	async function resendVerifyEmail() {
		await axios.get(backendURL + 'auth/verify');

	}

	return (
		<>
			{isVerify ? (
				<div className="flex flex-col">
					<HeroSection />
					<TrendingMovies />
					<PopularMovies />
					<Trailers />
					<ChatButton />
				</div>
			) : <div style={{ textAlign: 'center', marginTop: '100px' }}>
				"Please verify your email"
				<Button onClick={resendVerifyEmail}>Resend verify email</Button>
			</div>}
		</>
	);
};

export default Dashboard;
