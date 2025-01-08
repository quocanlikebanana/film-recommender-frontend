import { useLocation } from "react-router-dom";
import { useSearchMoviesQuery } from "../services/movieApi";
import {
  Alert,
  Autocomplete,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import MovieCard from "../dashboard/components/MovieCard";

export default function SearchPage() {
  const location = useLocation();
  const searchQuery = location.state?.query || "";

  const { data, error, isLoading } = useSearchMoviesQuery({
    query: searchQuery,
    page: 1,
  });

  if (isLoading) {
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
      <div className="flex ">
        <Autocomplete
          className="p-5"
          disablePortal
          options={[]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Regregion" />}
        />

        <Autocomplete
          className="p-5"
          disablePortal
          options={[]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Release Year" />}
        />
        <Autocomplete
          className="p-5"
          disablePortal
          options={[]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Language" />}
        />
      </div>

      <Grid className="p-5" container spacing={2}>
        {data?.results.map((movie) => (
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
