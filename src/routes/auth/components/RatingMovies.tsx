import { Box, Container, Typography, Stack } from "@mui/material";
import { Recommend as RecommendIcon } from "@mui/icons-material";
import LocalError from "../../content/components/LocalError";
import { toTmdbImageUrl } from "../../../app/image";
import MovieCard, {
  MovieCardProps,
} from "../../content/dashboard/components/MovieCard";
import { useGetUserRatingQueryQuery } from "../../content/services/user.api";
import { useEffect } from "react";

export default function RatingMovies() {
  const { data, isLoading, error, refetch } = useGetUserRatingQueryQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (error) {
    return <LocalError message="Error loading rating list!" />;
  }

  const movies = (data ?? []).map(
    (movie) =>
      ({
        id: movie.id.toString(),
        poster: toTmdbImageUrl(movie.poster_path),
        title: movie.title,
        rating: movie.vote_average,
        description: movie.overview,
      }) as MovieCardProps,
  );

  return (
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
        <RecommendIcon sx={{ mr: 2, fontSize: 36 }} color="primary" />
        <Typography
          sx={{ mr: 4 }}
          variant="h5"
          component="h1"
          fontWeight="bold"
        >
          Rating Movies
        </Typography>
      </Box>

      <Box
        sx={{
          paddingY: 3,
          paddingX: 2,
          display: "flex",
          overflowX: "auto",
          overflowY: "clip",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          sx={{
            height: "100%",
            minWidth: "fit-content",
          }}
        >
          {isLoading ? (
            <>
              <MovieCard key="loading1" movie={null} />
              <MovieCard key="loading2" movie={null} />
              <MovieCard key="loading3" movie={null} />
              <MovieCard key="loading4" movie={null} />
            </>
          ) : (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          )}
        </Stack>
      </Box>
    </Container>
  );
}
