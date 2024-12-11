import TrendingMovies from './components/TrendingMovies';
import HeroSection from './components/HeroSection';
import PopularPeople from './components/PopularPeople';


const Dashboard = () => {
	return (
		<div className='flex flex-col'>
			<HeroSection />
			<TrendingMovies />
			<PopularPeople />
		</div>
	);
};

export default Dashboard;