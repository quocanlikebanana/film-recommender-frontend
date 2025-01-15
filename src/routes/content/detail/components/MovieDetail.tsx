import React, { useEffect } from "react";
import { Typography, Box, Rating, IconButton, Alert } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppSelector } from "../../../../app/hooks";
import { selectAuthUser } from "../../../../stores/authSlice";
import { useNavigate } from "react-router-dom";
import {
  useLazyAddFavoriteQuery,
  useLazyAddWatchListQuery,
  useLazyGetTrackingQuery,
  useLazyRatingQuery,
} from "../../services/user.api";

interface MovieDetailsProps {
  movieId: string | number;
  title?: string;
  tagline?: string | null;
  overview?: string | null;
  releaseDate?: string;
  genres?: string[];
  voteAverage?: number;
  voteCount?: number;
}

const MovieDetail: React.FC<MovieDetailsProps> = ({
  movieId = "",
  title = "Unknown Title",
  tagline = "No Tagline Available",
  overview = "No Overview Available",
  releaseDate = "Unknown Release Date",
  genres = [],
  voteAverage = 0,
  voteCount = 0,
}) => {
  const user = useAppSelector(selectAuthUser);
  const navigate = useNavigate();

  const [addToWatchList, addToWatchListRsp] = useLazyAddWatchListQuery();
  const [addToFavorite, addToFavoriteRsp] = useLazyAddFavoriteQuery();
  const [ratingMovie, ratingMovieRsp] = useLazyRatingQuery();
  const [currentRating, setCurrentRating] = React.useState<number | null>(null);

  const [getUserTracking] = useLazyGetTrackingQuery();

  useEffect(() => {
    if (user) {
      setCurrentRating(null);
      getUserTracking({ movieId: movieId }).then((response) => {
        if (response.data && response.data.score_rated !== -1) {
          setCurrentRating(response.data.score_rated);
        }
      });
    }
  }, [user, movieId, getUserTracking]);

  const [customErr, setError] = React.useState<string | null>(null);
  const [successMss, setSuccessMss] = React.useState<string | null>(null);

  const handleRatingChange = (
    _: React.ChangeEvent<object>,
    newValue: number | null,
  ) => {
    if (!user) {
      navigate("/login");
    }
    if (newValue !== null) {
      setCurrentRating(newValue);
      ratingMovie({ movieId: movieId, rating: newValue });
      if (ratingMovieRsp.error) {
        handleErr("Error rating movie");
      } else {
        handleSuccesss("Rated movie successfully");
      }
    }
  };

  const handleAddFavorite = () => {
    if (!user) {
      navigate("/login");
    }
    addToFavorite({ movieId: movieId });
    if (addToFavoriteRsp.error) {
      handleErr("Error adding to favorite list");
    } else {
      handleSuccesss("Added to favorite list");
    }
  };

  const handleAddToWatchList = () => {
    if (!user) {
      navigate("/login");
    }
    addToWatchList({ movieId: movieId });
    if (addToWatchListRsp.error) {
      handleErr("Error adding to watch list");
    } else {
      handleSuccesss("Added to watch list");
    }
  };

  const handleErr = (err: string) => {
    setError(err);
    setTimeout(() => {
      setError(null);
    }, 2000); // 2 giây
  };

  const handleSuccesss = (mss: string) => {
    setSuccessMss(mss);
    setTimeout(() => {
      setSuccessMss(null);
    }, 2000); // 2 giây
  };
  return (
    <Box>
      {customErr && (
        <Alert className="fixed left-20 top-20" severity="error">
          {customErr}
        </Alert>
      )}
      {successMss && (
        <Alert className="fixed left-20 top-20" severity="success">
          {successMss}
        </Alert>
      )}
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
      <Box sx={{ display: "flex-col", alignItems: "center", mt: 2 }}>
        <Typography variant="body2" sx={{ mr: 1 }}>
          Rating:
        </Typography>
        <Rating value={voteAverage} max={10} precision={0.5} readOnly />
        <Typography variant="body2" sx={{ mr: 1 }}>
          Your rating:
        </Typography>
        {/* Rating component for user input */}
        <Rating
          name="customized-10"
          value={currentRating}
          onChange={handleRatingChange} // Update the rating when user selects a new value
          max={10}
        />
      </Box>
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <IconButton
          onClick={handleAddToWatchList}
          sx={{ cursor: "pointer" }}
          aria-label="add to watch list"
        >
          <AddCircleOutlineIcon />
        </IconButton>
        <IconButton
          onClick={handleAddFavorite}
          sx={{ cursor: "pointer" }}
          aria-label="add to favorites"
        >
          <FavoriteIcon color="error" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MovieDetail;
