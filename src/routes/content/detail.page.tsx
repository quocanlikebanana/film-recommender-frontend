import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieDetailQuery } from './services/movieApi';
import {
    Container,
    Typography,
    CircularProgress,
    Alert,
    Card,
    CardMedia,
    CardContent,
    Box,
    Grid,
    Rating,
} from '@mui/material';

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
                            <Card elevation={2}>
                                <CardMedia
                                    component="img"
                                    image={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                                    alt={data?.title}
                                />
                            </Card>
                        </Grid>

                        {/* Movie Details */}
                        <Grid item xs={12} md={8}>
                            <Box>
                                <Typography variant="h4" gutterBottom>
                                    {data?.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                    {data?.tagline}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {data?.overview}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    <strong>Release Date:</strong> {data?.release_date}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    <strong>Genres:</strong>{' '}
                                    {data?.genres.map((genre) => genre.name).join(', ')}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    <strong>Vote Average:</strong> {data?.vote_average} ({data?.vote_count} votes)
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <Typography variant="body2" sx={{ mr: 1 }}>
                                        Rating:
                                    </Typography>
                                    <Rating
                                        value={data?.vote_average || 0} // Sử dụng thang điểm 0-10
                                        max={10} // Số sao tối đa là 10
                                        precision={0.5} // Hiển thị nửa sao
                                        readOnly
                                    />
                                </Box>

                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Production Companies
                        </Typography>
                        <Grid container spacing={2}>
                            {data?.production_companies.map((company) => (
                                <Grid item xs={6} md={3} key={company.id}>
                                    <Card elevation={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        {company.logo_path ? (
                                            <CardMedia
                                                component="img"
                                                image={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                alt={company.name}
                                                sx={{ height: 120, objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <Typography variant="body2" color="textSecondary" sx={{ height: 120, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                {company.name}
                                            </Typography>
                                        )}
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default MovieRecommenderDetail;
