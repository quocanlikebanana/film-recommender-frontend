import React from 'react';
import { Card, CardMedia } from '@mui/material';

interface MoviePosterProps {
    posterPath: string;
    title: string;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ posterPath, title }) => (
    <Card elevation={2}>
        <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title}
        />
    </Card>
);

export default MoviePoster;
