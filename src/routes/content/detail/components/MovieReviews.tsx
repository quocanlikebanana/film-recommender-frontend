import { useState } from "react";
import { Box, Divider, Button, Container, Typography } from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import LocalError from "../../components/LocalError";
import { useGetMovieReviewsQuery } from "../../services/user.api";
import ReviewCard from "./ReviewCard";

const MovieReviews = ({ movieId }: { movieId: string }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const { data, isLoading, error } = useGetMovieReviewsQuery({
    movieId: movieId,
  });

  if (error) {
    return <LocalError message="Error loading review!" />;
  }
  if (isLoading || !data) return null;

  return (
    <>
      {data.length > 0 && (
        <Container
          sx={{
            paddingY: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <StarsIcon sx={{ mr: 2, fontSize: 36 }} color="primary" />
            <Typography
              sx={{ mr: 4 }}
              variant="h5"
              component="h1"
              fontWeight="bold"
            >
              Review
            </Typography>
          </Box>
          <Box
            sx={{
              maxWidth: "800px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {data.slice(0, visibleCount).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            <Divider sx={{ my: 3 }} />

            {visibleCount < data.length && (
              <Button
                variant="outlined"
                onClick={handleSeeMore}
                sx={{ display: "block", mx: "auto" }}
              >
                See More
              </Button>
            )}
          </Box>
        </Container>
      )}
    </>
  );
};

export default MovieReviews;
