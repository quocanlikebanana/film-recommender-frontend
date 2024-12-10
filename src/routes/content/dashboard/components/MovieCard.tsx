import { Card, CardMedia, CardContent, Box, Typography, Button } from '@mui/material'
import {
    Star as StarIcon,
    PlayCircleOutline as PlayIcon,
} from '@mui/icons-material';

export interface MovieCardProps {
    id: string;
    poster: string;
    title: string;
    rating: number;
    description: string;
}

export default function MovieCard({ movie }: { movie: MovieCardProps }) {
    return (
        <Card key={movie.id}
            sx={{
                width: {
                    md: 250,
                    lg: 350,
                },
                height: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': {
                    transform: 'scale(1.05)'
                }
            }}
            elevation={4}
        >
            <CardMedia
                component="img"
                image={movie.poster}
                alt={movie.title}
                sx={{
                    height: '100%',
                    width: '100%',
                }}
            />
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}>
                    <Typography variant="h6" component="h2">
                        {movie.title}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <StarIcon color="warning" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            {movie.rating.toFixed(1)}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{
                    mb: 2,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                }}>
                    {movie.description}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<PlayIcon />}
                    fullWidth
                >
                    Watch
                </Button>
            </CardContent>
        </Card>
    )
}
