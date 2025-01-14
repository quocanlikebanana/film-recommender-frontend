import { Box, Container, Typography, Stack } from "@mui/material";
import { Recommend as RecommendIcon } from "@mui/icons-material";
import LocalError from "../../components/LocalError";
import { useGetLatestTrailersQuery } from "../../services/movie.api";
import { Trailer } from "../../interfaces/movie.interface";
import TrailerCard from "./TrailerCard";

export default function Trailers() {
  const { data, isLoading, error } = useGetLatestTrailersQuery({ page: 1 });
  if (error) {
    return <LocalError message="Error loading latest trailer!" />;
  }

  const trailers: Trailer[] = data || [];

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
          Latest trailers
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
              <TrailerCard key="loading1" trailer={null} />
              <TrailerCard key="loading2" trailer={null} />
              <TrailerCard key="loading3" trailer={null} />
              <TrailerCard key="loading4" trailer={null} />
            </>
          ) : (
            trailers.map((trailer) => (
              <TrailerCard key={trailer.id} trailer={trailer} />
            ))
          )}
        </Stack>
      </Box>
    </Container>
  );
}
