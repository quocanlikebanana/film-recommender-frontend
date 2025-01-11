import TrendingMovies from "./components/TrendingMovies";
import HeroSection from "./components/HeroSection";
import PopularPeople from "./components/PopularPeople";
import PopularMovies from "./components/PopularMovies";
import UpcomingMovies from "./components/UpcomingMovies";
import ChatButton from "../../components/ChatButton";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TrendingMovies />
      <PopularMovies />
      <PopularPeople />
      <UpcomingMovies />
      <ChatButton />
    </div>
  );
};

export default Dashboard;
