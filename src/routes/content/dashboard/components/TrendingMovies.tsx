import { Box, Container, Typography, Stack } from '@mui/material'
import MovieCard, { MovieCardProps } from './MovieCard'
import TrendingSwitch from './ToggleButton';
import { useEffect, useState } from 'react';
import { toTmdbImageUrl } from '../../../../app/image';
import { Recommend as RecommendIcon } from '@mui/icons-material';
import LocalError from '../../components/LocalError';
import { useLazyGetTrendingMoviesQuery } from '../../services/movie.api';

export default function TrendingMovies() {
    const [getTrendingMovies, { data, isLoading, error }] = useLazyGetTrendingMoviesQuery();
    const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day');

    useEffect(() => {
        getTrendingMovies({ time: timeWindow, page: 1 });
    }, [timeWindow, getTrendingMovies]);

    if (error) {
        return <LocalError message="Error loading trending movies!" />;
    }

    const movies = (data?.results ?? []).map((movie) => ({
        id: movie.id.toString(),
        poster: toTmdbImageUrl(movie.poster_path),
        title: movie.title,
        rating: movie.vote_average,
        description: movie.overview,
    }) as MovieCardProps);

    return (
        <Container sx={{
            paddingY: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: "flex-start",
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
            }}>
                <RecommendIcon sx={{ mr: 2, fontSize: 36 }} color="primary" />
                <Typography sx={{ mr: 4 }} variant="h5" component="h1" fontWeight="bold">
                    Trending Movies
                </Typography>
                <TrendingSwitch timeWindow={timeWindow} onSwitchChanged={setTimeWindow}>
                </TrendingSwitch>
            </Box>

            <Box sx={{
                paddingY: 3,
                paddingX: 2,
                display: 'flex',
                overflowX: "auto",
                overflowY: "clip",
                width: '100%',
            }}>
                <Stack direction="row" spacing={3} sx={{
                    height: '100%',
                    minWidth: 'fit-content',
                }}>
                    {isLoading ? (
                        <>
                            <MovieCard key="loading1" movie={null} />
                            <MovieCard key="loading2" movie={null} />
                            <MovieCard key="loading3" movie={null} />
                            <MovieCard key="loading4" movie={null} />
                        </>
                    ) : movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </Stack>
            </Box>
        </Container>
    )
}
