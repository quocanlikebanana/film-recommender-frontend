import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import heroBackground from "../../../../assets/hero-background.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
    const [searchString, setSearchString] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/movies/search`, { state: { query: searchString } });
    };

    return (
        <Box
            sx={{
                position: "relative",
                height: "400px",
                backgroundImage: `url(${heroBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                textAlign: "center",
                padding: "20px",
            }}
        >
            {/* Overlay for dark effect */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 1,
                }}
            ></Box>

            {/* Content */}
            <Box sx={{ position: "relative", zIndex: 2, maxWidth: "800px" }}>
                <Typography variant="h3" component="h1" fontWeight="bold">
                    Welcome
                </Typography>
                <Typography variant="h6" component="p" sx={{ mt: 2, mb: 4 }}>
                    Millions of movies, TV shows and people to discover. Explore now.
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: 6,
                    }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Search for a movie, tv show, person..."
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        fullWidth
                        sx={{
                            backgroundColor: "white",
                            "& .MuiOutlinedInput-root": {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderTopLeftRadius: 24,
                                borderBottomLeftRadius: 24,
                                fontSize: "16px",
                                padding: "10px",
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{
                            background: "linear-gradient(to right, #00c6ff, #0072ff)",
                            color: "white",
                            textTransform: "none",
                            fontWeight: "bold",
                            px: 4,
                            borderRadius: 0,
                            "&:hover": {
                                background: "linear-gradient(to right, #0072ff, #00c6ff)",
                            },
                        }}
                    >
                        Search
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default HeroSection;
