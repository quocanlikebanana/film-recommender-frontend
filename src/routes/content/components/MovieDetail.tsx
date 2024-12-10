import React from 'react';
import { Typography, Box, Rating } from '@mui/material';

interface MovieDetailsProps {
    title: string;
    tagline: string;
    overview: string;
    releaseDate: string;
    genres: string[];
    voteAverage: number;
    voteCount: number;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
    title,
    tagline,
    overview,
    releaseDate,
    genres,
    voteAverage,
    voteCount,
}) => (
    <Box>
        <Typography variant="h4" gutterBottom>
            {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {tagline}
        </Typography>
        <Typography variant="body1" paragraph>
            {overview}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Release Date:</strong> {releaseDate}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Genres:</strong> {genres.join(', ')}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Vote Average:</strong> {voteAverage} ({voteCount} votes)
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
                Rating:
            </Typography>
            <Rating
                value={voteAverage || 0}
                max={10}
                precision={0.5}
                readOnly
            />
        </Box>
    </Box>
);

export default MovieDetails;
