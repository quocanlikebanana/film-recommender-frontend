import TrendingMovies from './components/TrendingMovies';
import HeroSection from './components/HeroSection';
import PopularPeople from './components/PopularPeople';
import axios from 'axios';
import React from 'react';
import { Button } from '@mui/material';
import LocalStorageService from '../../../services/localstorage.service';

import TrendingMovies from "./components/TrendingMovies";
import HeroSection from "./components/HeroSection";
import PopularMovies from "./components/PopularMovies";
import ChatButton from "../../components/ChatButton";
import Trailers from "./components/Trailers";

const Dashboard = () => {
	const [isVerify, setIsVerify] = React.useState(false);

	async function isVerified() {
		console.log('FE token', LocalStorageService.getAccessToken());
		const res = await axios.get('http://localhost:3000/api/auth/isVerify', {
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
		await axios.get('http://localhost:3000/api/auth/verify');

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
