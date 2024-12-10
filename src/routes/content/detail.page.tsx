import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieDetailQuery } from './services/movie.api';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';

const MovieRecommenderDetail = () => {
    const { movieId } = useParams<{ movieId: string }>();

    const { data, error, isLoading } = useGetMovieDetailQuery({ movieId: movieId! });

    if (isLoading) {
        return (
            <Container>
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
        <Container>
            <Typography variant="h4" gutterBottom>
                {data?.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {data?.tagline}
            </Typography>
            <Typography variant="body1" paragraph>
                {data?.overview}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Release Date: {data?.release_date}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Genres: {data?.genres.map((genre) => genre.name).join(', ')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Vote Average: {data?.vote_average} ({data?.vote_count} votes)
            </Typography>
        </Container>
    );
};

export default MovieRecommenderDetail;
