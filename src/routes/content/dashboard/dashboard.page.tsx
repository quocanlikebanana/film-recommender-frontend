import TrendingMovies from "./components/TrendingMovies";
import HeroSection from "./components/HeroSection";
import PopularMovies from "./components/PopularMovies";
import ChatButton from "../../components/ChatButton";
import Trailers from "./components/Trailers";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TrendingMovies />
      <PopularMovies />
      <Trailers />
      <ChatButton />
    </div>
  );
};

export default Dashboard;
