// src/components/MovieGrid.tsx
import React from "react";
import { Grid } from "@mui/material";
import { MovieDetailResponse } from "../../interfaces/movie.interface";
import MovieCard from "../../dashboard/components/MovieCard";

interface MovieGridProps {
  movies: MovieDetailResponse[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  return (
    <Grid container spacing={2}>
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
  );
};

export default MovieGrid;
