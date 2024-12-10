import React from 'react';
import { Typography, Box, Rating } from '@mui/material';

interface MovieDetailsProps {
    title?: string;
    tagline?: string | null;
    overview?: string | null;
    releaseDate?: string;
    genres?: string[];
    voteAverage?: number;
    voteCount?: number;
}

const MovieDetail: React.FC<MovieDetailsProps> = ({
    title = 'Unknown Title',
    tagline = 'No Tagline Available',  // Giá trị mặc định nếu tagline là null hoặc undefined
    overview = 'No Overview Available',  // Giá trị mặc định nếu overview là null hoặc undefined
    releaseDate = 'Unknown Release Date',
    genres = [],
    voteAverage = 0,
    voteCount = 0,
}) => (
    <Box>
        <Typography variant="h4" gutterBottom>
            {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {tagline ?? 'No Tagline Available'}  {/* Nếu tagline là null hoặc undefined, sử dụng giá trị mặc định */}
        </Typography>
        <Typography variant="body1" paragraph>
            {overview ?? 'No Overview Available'}  {/* Nếu overview là null hoặc undefined, sử dụng giá trị mặc định */}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Release Date:</strong> {releaseDate}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Genres:</strong> {genres.length > 0 ? genres.join(', ') : 'No genres available'}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Vote Average:</strong> {voteAverage} ({voteCount} votes)
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
                Rating:
            </Typography>
            <Rating
                value={voteAverage}
                max={10}
                precision={0.5}
                readOnly
            />
        </Box>
    </Box>
);

export default MovieDetail;
