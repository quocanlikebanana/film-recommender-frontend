import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  useSearchMoviesQuery,
  SearchMoviesMovieRequest,
} from "../services/movieApi";
import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import MovieCard from "../dashboard/components/MovieCard";
import LangInput from "./components/LangInput";
import CountryInput from "./components/CountryInput";
import useInfiniteScroll from "./hook/infiniteScroll";
import { MovieDetailResponse } from "../interfaces/movie.interface";

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

  if (isLoading && filters.page === 1) {
    return (
      <Container className="flex justify-center items-center h-[40rem]">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">Error while searching movies!</Alert>
      </Container>
    );
  }

  return (
    <>
      <form className="flex">
        <Typography className="p-5 font-bold" variant="h3" color="initial">
          Search: <span className="font-light">"{filters.query}"</span>{" "}
        </Typography>
        <CountryInput onFilterChange={handleTempFilterChange}></CountryInput>
        <LangInput onFilterChange={handleTempFilterChange}></LangInput>
        <div className="p-5">
          <TextField
            id="demo-helper-text-misaligned"
            type="number"
            label="Release Year"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleTempFilterChange("primary_release_year")(
                event.target.value,
              );
            }}
          />
        </div>
        <div className="flex items-center p-5">
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply
          </Button>
        </div>
      </form>

      <Grid className="p-5" container spacing={2}>
        {movies.map((movie) => (
          <Grid
            className="flex justify-center"
            item
            xs={12}
            sm={4}
            md={3}
            key={movie.id}
          >
            <MovieCard
              movie={{
                id: movie.id.toString(),
                poster: `https://image.tmdb.org/t/p/w200/${movie.poster_path || ""}`,
                title: movie.title,
                rating: movie.vote_average,
                description: movie.overview || "",
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
