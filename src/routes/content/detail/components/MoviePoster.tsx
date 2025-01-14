import React from "react";
import { Card, CardMedia } from "@mui/material";

interface MoviePosterProps {
  posterPath?: string | null;
  title?: string;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ posterPath, title }) => (
  <Card elevation={2}>
    <CardMedia
      component="img"
      image={
        posterPath
          ? `https://image.tmdb.org/t/p/w500${posterPath}`
          : "/default_poster.png"
      }
      alt={title || "Movie Poster"}
    />
  </Card>
);

export default MoviePoster;
