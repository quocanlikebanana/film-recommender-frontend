import {
	Container,
} from '@mui/material';
import MovieHorizontalStack from './components/MovieHorizontalStack';


const Dashboard = () => {
	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<MovieHorizontalStack />
		</Container>
	);
};

export default Dashboard;