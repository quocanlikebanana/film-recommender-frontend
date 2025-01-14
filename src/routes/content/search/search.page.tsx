import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  SearchMoviesMovieRequest,
  useLazySearchMoviesQuery,
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

  const { doneFetching } = useInfiniteScroll(updatePageIndex, 200);
  const [searchMovie, { data, error, isLoading }] = useLazySearchMoviesQuery();

  function updatePageIndex() {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1,
    }));
  }

  useEffect(() => {
    if (data?.results) {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      doneFetching(); // Reset trạng thái sau khi dữ liệu đã được thêm vào
    }
  }, [data]);

  useEffect(() => {
    searchMovie(filters);
  }, [filters]);

  const handleTempFilterChange =
    (key: keyof typeof tempFilters) => (value: string) => {
      setTempFilters((prev) => ({
        ...prev,
        [key]: value || "",
      }));
    };

  const compareFilters = (
    a: SearchMoviesMovieRequest,
    b: SearchMoviesMovieRequest,
  ) => {
    return (
      a.query === b.query &&
      a.language === b.language &&
      a.region === b.region &&
      a.year === b.year
    );
  };

  const handleApplyFilters = () => {
    if (!compareFilters(filters, tempFilters)) {
      setMovies([]);
    }
    setFilters({ ...tempFilters, page: 1 });
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
