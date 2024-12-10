import {
	Box,
	Typography,
	Button,
	Container,
	Stack,
} from '@mui/material';
import {
	Recommend as RecommendIcon
} from '@mui/icons-material';
import MovieCard from './components/MovieCard';
import { mockTrendingMovies } from './services/mock';


const MovieRecommenderDashboard = () => {

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
				<RecommendIcon sx={{ mr: 2, fontSize: 40 }} color="primary" />
				<Typography variant="h4" component="h1" fontWeight="bold">
					Movie Trendings
				</Typography>
			</Box>

			<Stack direction="row" spacing={2} sx={{ mb: 4 }}>
				<Button variant="contained">All</Button>
				<Button variant="outlined">Sci-Fi</Button>
				<Button variant="outlined">Action</Button>
				<Button variant="outlined">Thriller</Button>
			</Stack>

			<Box sx={{
				paddingY: 3,
				display: 'flex',
				justifyContent: 'center',
				overflowX: "auto",
				overflowY: "clip",
				width: '100%',
			}}>
				<Stack direction="row" spacing={3} sx={{
					height: '100%',
					minWidth: 'fit-content',
				}}>
					{mockTrendingMovies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</Stack>
			</Box>
		</Container>
	);
};

export default MovieRecommenderDashboard;