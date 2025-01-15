import { Container, Paper, Typography, Avatar, Grid, Box } from "@mui/material";
import FavoriteMovies from "./components/FavoriteMovies";
import WatchList from "./components/WatchList";
import RatingMovies from "./components/RatingMovies";
import { useAppSelector } from "../../app/hooks";
import { selectAuthUser } from "../../stores/authSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useAppSelector(selectAuthUser);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }
  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4 }} className="m-5">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 100,
                height: 100,
                fontSize: 40,
              }}
            >
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography variant="h5" component="div" gutterBottom>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <FavoriteMovies />
      <WatchList />
      <RatingMovies />
    </Container>
  );
};

export default ProfilePage;
