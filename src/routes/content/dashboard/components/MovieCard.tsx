import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface MovieCardProps {
    title: string;
    posterPath: string;
    releaseDate: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterPath, releaseDate }) => (
    <Card>
        <CardMedia
            component="img"
            height="300"
            image={`https://image.tmdb.org/t/p/w300${posterPath}`}
            alt={title}
        />
        <CardContent>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
                {releaseDate}
            </Typography>
        </CardContent>
    </Card>
);

export default MovieCard;