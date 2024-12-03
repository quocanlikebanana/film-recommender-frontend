import React, { useState } from 'react';
import {
	Box,
	Grid2 as Grid,
	Typography,
	Card,
	CardMedia,
	CardContent,
	Button,
	Container,
	Chip,
} from '@mui/material';
import {
	Star as StarIcon,
	PlayCircleOutline as PlayIcon,
	Recommend as RecommendIcon
} from '@mui/icons-material';

// Sample movie data (you would replace this with actual API data)
const sampleRecommendations = [
	{
		id: 1,
		title: 'Inception',
		poster: '/api/placeholder/200/300',
		rating: 8.8,
		genres: ['Sci-Fi', 'Action', 'Thriller'],
		description: 'A mind-bending thriller about dream infiltration and reality manipulation.'
	},
	{
		id: 2,
		title: 'The Matrix',
		poster: '/api/placeholder/200/300',
		rating: 8.7,
		genres: ['Sci-Fi', 'Action'],
		description: 'A computer programmer discovers the hidden truth about his reality.'
	},
	{
		id: 3,
		title: 'Interstellar',
		poster: '/api/placeholder/200/300',
		rating: 8.6,
		genres: ['Sci-Fi', 'Drama', 'Adventure'],
		description: 'A team of explorers travel through a wormhole in space in search of a new home for humanity.'
	}
];

const MovieRecommenderDashboard = () => {
	const [recommendations, setRecommendations] = useState(sampleRecommendations);

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
				<RecommendIcon sx={{ mr: 2, fontSize: 40 }} color="primary" />
				<Typography variant="h4" component="h1" fontWeight="bold">
					Movie Recommendations
				</Typography>
			</Box>

			<Grid container spacing={3}>
				{recommendations.map((movie) => (
					<Grid size={{ xs: 12, sm: 6, md: 4 }} key={movie.id}>
						<Card
							sx={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								transition: 'transform 0.3s',
								'&:hover': {
									transform: 'scale(1.05)'
								}
							}}
							elevation={4}
						>
							<CardMedia
								component="img"
								height="300"
								image={movie.poster}
								alt={movie.title}
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
									<Typography variant="h6" component="h2">
										{movie.title}
									</Typography>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<StarIcon color="warning" sx={{ mr: 1 }} />
										<Typography variant="body2" color="text.secondary">
											{movie.rating}
										</Typography>
									</Box>
								</Box>
								<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
									{movie.description}
								</Typography>
								<Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
									{movie.genres.map((genre) => (
										<Chip
											key={genre}
											label={genre}
											size="small"
											color="primary"
											variant="outlined"
										/>
									))}
								</Box>
								<Button
									variant="contained"
									startIcon={<PlayIcon />}
									fullWidth
								>
									Watch Trailer
								</Button>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default MovieRecommenderDashboard;