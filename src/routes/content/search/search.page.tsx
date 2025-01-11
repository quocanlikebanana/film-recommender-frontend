import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  useSearchMoviesQuery,
  SearchMoviesMovieRequest,
} from "../services/movie.api";
import { Alert, CircularProgress, Container, Typography } from "@mui/material";
import useInfiniteScroll from "./hook/infiniteScroll";
import { MovieDetailResponse } from "../interfaces/movie.interface";
import Filter from "./components/Filter";
import MovieGrid from "./components/MovieGrid";
import ChatButton from "../../components/ChatButton";

export default function SearchPage() {
  const location = useLocation();
  const initialQuery = location.state?.query || "";

  const [filters, setFilters] = useState<SearchMoviesMovieRequest>({
    query: initialQuery,
    page: 1,
  });
  const [movies, setMovies] = useState<MovieDetailResponse[]>([]);
  const [tempFilters, setTempFilters] = useState({ ...filters });

  useInfiniteScroll(updatePageIndex, 200);
  const { data, error, isLoading } = useSearchMoviesQuery(filters);

  function updatePageIndex() {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1,
    }));
  }

  useEffect(() => {
    if (data?.results) {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    }
  }, [data]);

  const handleTempFilterChange =
    (key: keyof typeof tempFilters) => (value: string) => {
      setTempFilters((prev) => ({
        ...prev,
        [key]: value || "",
      }));
    };

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    setMovies([]); // Reset movies khi áp dụng bộ lọc mới
  };

  return (
    <Container>
      <Typography className="p-5 font-bold" variant="h3" color="initial">
        Search: <span className="font-light">"{filters.query}"</span>{" "}
      </Typography>

      {/* Loading or Error states */}
      {(isLoading && filters.page === 1) || error ? (
        <Container className="flex justify-center items-center h-[40rem]">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Alert severity="error">Error while searching movies!</Alert>
          )}
        </Container>
      ) : (
        <>
          <Filter
            filters={filters}
            onFilterChange={handleTempFilterChange}
            onApplyFilters={handleApplyFilters}
          />
          <MovieGrid movies={movies} />
        </>
      )}
      <ChatButton />
    </Container>
  );
}
