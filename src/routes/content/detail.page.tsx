import { useParams } from 'react-router-dom';
import { useGetMovieDetailQuery } from './services/movieApi';
import { Container, CircularProgress, Alert, Card, CardContent, Grid } from '@mui/material';
import MoviePoster from './components/MoviePoster';
import MovieDetails from './components/MovieDetail';
import ProductionCompanies from './components/ProductionCompanies';

const MovieRecommenderDetail = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const { data, error, isLoading } = useGetMovieDetailQuery({ movieId: movieId! });

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
                <Alert severity="error">Error loading movie details!</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Card elevation={3} sx={{ p: 3 }}>
                <CardContent>
                    <Grid container spacing={4}>
                        {/* Poster Image */}
                        <Grid item xs={12} md={4}>
                            <MoviePoster posterPath={data?.poster_path} title={data?.title} />
                        </Grid>

                        {/* Movie Details */}
                        <Grid item xs={12} md={8}>
                            <MovieDetails
                                title={data?.title}
                                tagline={data?.tagline}
                                overview={data?.overview}
                                releaseDate={data?.release_date}
                                genres={data?.genres.map((genre) => genre.name)}
                                voteAverage={data?.vote_average}
                                voteCount={data?.vote_count}
                            />
                        </Grid>
                    </Grid>

                    {/* Production Companies */}
                    <ProductionCompanies companies={data?.production_companies} />
                </CardContent>
            </Card>
        </Container>
    );
};

export default MovieRecommenderDetail;
