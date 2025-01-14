import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { useGetMovieCastQuery } from "../../services/movie.api";
import { Recommend as RecommendIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Cast } from "../../interfaces/movie.interface";

const CastList = ({ movieId }: { movieId: string }) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetMovieCastQuery({ movieId });

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleClick = (cast: Cast) => {
    if (!cast) return;
    navigate(`/cast/${cast.id}`);
  };

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
          sx={{ mr: 0 }}
          variant="h5"
          component="h1"
          fontWeight="bold"
        >
          Cast
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
            <></>
          ) : (
            data?.map((cast) => (
              <div key={cast.id}
                className="text-center"
                onClick={() => {
                  handleClick(cast);
                }}
              >
                <Avatar
                  className="mx-auto cursor-pointer hover:scale-110 transition-transform duration-300"
                  alt={cast.name}
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  sx={{ width: 60, height: 60 }}
                />
                <Typography variant="body2" color="textSecondary">
                  {cast.name}
                </Typography>
              </div>
            ))
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default CastList;
