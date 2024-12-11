import React, { useState } from "react";
import { Box, Divider, Button, Container, Typography } from "@mui/material";
import PeopleCard, { People } from "./PeopleCard";
import { useGetPopularPeopleQuery } from "../services/popular-people.api";
import { toTmdbImageUrl } from "../../../../app/image";
import StarsIcon from '@mui/icons-material/Stars';

const PopularPeople: React.FC = () => {
    const [visibleCount, setVisibleCount] = useState(3);

    const handleSeeMore = () => {
        setVisibleCount((prevCount) => prevCount + 3);
    };

    const { data, isLoading, error } = useGetPopularPeopleQuery({ page: 1 });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (!data) return null;

    const peopleList: People[] = data.results.map((person) => ({
        id: person.id,
        name: person.name,
        department: person.known_for_department,
        featuredWork: person.known_for[0].title,
        description: person.known_for[0].overview,
        image: toTmdbImageUrl(person.profile_path),
    } as People));

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
                <StarsIcon sx={{ mr: 2, fontSize: 36 }} color="primary" />
                <Typography sx={{ mr: 4 }} variant="h5" component="h1" fontWeight="bold">
                    Popular People
                </Typography>
            </Box>
            <Box sx={{
                maxWidth: "800px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}>
                {peopleList.slice(0, visibleCount).map((people) => (
                    <PeopleCard key={people.id} person={people} />
                ))}

                <Divider sx={{ my: 3 }} />

                <Button
                    variant="outlined"
                    onClick={handleSeeMore}
                    sx={{ display: "block", mx: "auto" }}
                >
                    See More
                </Button>
            </Box>
        </Container>
    );
};

export default PopularPeople;
