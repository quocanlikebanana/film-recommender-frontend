import React, { useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert, CircularProgress, Slide, Fade, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from './services/authApi';
import { useAppSelector } from '../../app/hooks';
import { selectIsAuth } from '../../stores/authSlice';
import { toErrorMessage } from '../../error/fetchBaseQuery.error';
import GoogleLogin from './components/GoogleLogin';


const formSchema = z.object({
	email: z.string().email('Invalid email'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type FormFields = z.infer<typeof formSchema>;

const LoginPage: React.FC = () => {
	const [login, { isLoading, error }] = useLoginMutation();
	const isAuth = useAppSelector(selectIsAuth);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: {
			errors,
		},
	} = useForm<FormFields>({
		resolver: zodResolver(formSchema),
	});

	const errorMessage = toErrorMessage(error);

	const onSubmit: SubmitHandler<FormFields> = async (data, e) => {
		e?.preventDefault();
		await login(data);
	}

	function handleNavigateRegister() {
		navigate('/register');
	}

	useEffect(() => {
		if (isAuth) {
			navigate('/');
		}
	}, [isAuth, navigate]);

	return (
		<Fade in>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Box
						sx={{
							width: 400,
							padding: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							boxShadow: 3,
							borderRadius: 2,
							backgroundColor: '#fff',
						}}
					>
						{/* Gradient Title */}
						<Typography
							variant="h4"
							component="h1"
							sx={{
								background: 'linear-gradient(45deg, #ff4545 10%, #edaa37 90%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								fontWeight: 'bold',
								mb: 5,
							}}
						>
							Login
						</Typography>

						{/* Announcement */}
						<Slide in={isLoading} direction="up" mountOnEnter unmountOnExit>
							<CircularProgress sx={{ my: 1 }} color='primary' />
						</Slide>
						{(errorMessage) &&
							<Alert
								sx={{
									width: '100%',
									mt: 1,
									mb: 3,
								}} severity="error">
								{errorMessage}
							</Alert>
						}

						{/* Form */}
						<TextField
							{...register('email')}
							label="Email"
							size="small"
							variant="outlined"
							name="email"
							error={Boolean(errors.email != null)}
							helperText={errors.email?.message}
							fullWidth
							sx={{ mb: 2 }}
						/>
						<TextField
							{...register('password')}
							label="Password"
							size="small"
							variant="outlined"
							name="password"
							type="password"
							error={Boolean(errors.password != null)}
							helperText={errors.password?.message}
							fullWidth
							sx={{ mb: 2 }}
						/>

						{/* Submit Button */}
						<Button
							type='submit'
							variant="contained"
							color="primary"
							disabled={isLoading}
							fullWidth
							sx={{
								mt: 2,
								fontWeight: 'bold',
								py: 1,
							}}>
							Login
						</Button>

						{/*Google Login*/}
						<Divider
							sx={{
								'&::before, &::after': {
									borderColor: 'rgba(0, 0, 0, 0.5)',
								},
								my: 2,
								width: '100%',
								color: 'rgba(0, 0, 0, 0.5)',
							}}>
							OR
						</Divider>

						<GoogleLogin />

						{/* Register Link */}
						<Box textAlign="left" sx={{
							mt: 2,
							width: '100%',
						}}>
							<Typography variant="body2">
								Don't have an account?
								<Button
									size="small"
									onClick={handleNavigateRegister}
									sx={{
										color: '#1e88e5',
										'&:hover': {
											backgroundColor: 'transparent',
											textDecoration: 'underline'
										}
									}}
								>
									Sign Up
								</Button>
							</Typography>
						</Box>
					</Box>
				</Box >
			</form>
		</Fade>
	);
};

export default LoginPage;
