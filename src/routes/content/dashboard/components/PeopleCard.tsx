import { Box, Avatar, Typography, IconButton, Card, CardContent } from "@mui/material";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from "react-router-dom";

export interface People {
    id: number;
    name: string;
    department: string;
    featuredMovieId: number;
    featuredMovie: string;
    description: string;
    image: string;
}

interface PeopleCardProps {
    person: People;
}

export default function PeopleCard({ person }: PeopleCardProps) {
    const navigate = useNavigate();

    const handleMovieClick = () => {
        navigate(`/movies/${person.featuredMovieId}`);
    }

    return (
        <Card key={person.id} >
            <CardContent sx={{ display: "flex", mb: 3 }}>
                {/* Avatar */}
                <Avatar
                    src={person.image}
                    alt={person.name}
                    sx={{ width: 60, height: 60, mr: 2 }}
                />

                {/* Details */}
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {person.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {person.department}
                    </Typography>
                    <Typography onClick={handleMovieClick} variant="body2" color="primary" sx={{
                        mb: 1,
                        cursor: "pointer",
                    }}>
                        {person.featuredMovie}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        {person.description}
                    </Typography>
                </Box>

                {/* Action Icon */}
                <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                    <IconButton sx={{
                        color: "primary.main",
                    }}>
                        <ReadMoreIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
}
