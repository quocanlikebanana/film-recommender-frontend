import React from "react";
import { Typography, Box, Rating, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface MovieDetailsProps {
  title?: string;
  tagline?: string | null;
  overview?: string | null;
  releaseDate?: string;
  genres?: string[];
  voteAverage?: number;
  voteCount?: number;
}

const MovieDetail: React.FC<MovieDetailsProps> = ({
  title = "Unknown Title",
  tagline = "No Tagline Available",
  overview = "No Overview Available",
  releaseDate = "Unknown Release Date",
  genres = [],
  voteAverage = 0,
  voteCount = 0,
}) => (
  <Box>
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
      {tagline ?? "No Tagline Available"}
    </Typography>
    <Typography variant="body1" paragraph>
      {overview ?? "No Overview Available"}
    </Typography>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      <strong>Release Date:</strong> {releaseDate}
    </Typography>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      <strong>Genres:</strong>{" "}
      {genres.length > 0 ? genres.join(", ") : "No genres available"}
    </Typography>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      <strong>Vote Average:</strong> {voteAverage} ({voteCount} votes)
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <Typography variant="body2" sx={{ mr: 1 }}>
        Rating:
      </Typography>
      <Rating value={voteAverage} max={10} precision={0.5} readOnly />
    </Box>
    <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
      <IconButton sx={{ cursor: "pointer" }} aria-label="add to watch list">
        <AddCircleOutlineIcon />
      </IconButton>
      <IconButton sx={{ cursor: "pointer" }} aria-label="add to favorites">
        <FavoriteIcon color="error" />
      </IconButton>
    </Box>
  </Box>
);

export default MovieDetail;
