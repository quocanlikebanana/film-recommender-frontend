import React from "react";
import { Grid2 as Grid } from "@mui/material";
import MovieCard from "./MovieCard";
import { MovieDetailResponse } from "../../interfaces/movie.interface";
import { DEFAULT_POSTER_PATH } from "../../../../assets/onl-src";

interface MovieGridProps {
    movies: MovieDetailResponse[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => (
    <Grid container spacing={3}>
        {movies.map((movie) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
                <MovieCard
                    title={movie.title}
                    posterPath={movie.poster_path ?? DEFAULT_POSTER_PATH}
                    releaseDate={movie.release_date}
                />
            </Grid>
        ))}
    </Grid>
);

export default MovieGrid;