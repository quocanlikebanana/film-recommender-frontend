import { Container, Paper, Typography, Avatar, Grid, Box, Skeleton } from "@mui/material";
import FavoriteMovies from "./components/FavoriteMovies";
import WatchList from "./components/WatchList";
import RatingMovies from "./components/RatingMovies";
import { useNavigate } from "react-router-dom";
import { useGetUserProfileQuery } from "../content/services/user.api";
import LocalError from "../content/components/LocalError";
import { useEffect } from "react";

const ProfilePage = () => {
  const { data: user, isLoading, error } = useGetUserProfileQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      console.log('User not found, redirecting to login page');
      navigate("/login");
    }
  }, [user, navigate, isLoading]);

  if (!user) return null;

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4 }} className="m-5">
        <Grid container spacing={3} alignItems="center">
          {error ? (
            <>
              <Typography variant="h5" color="error" gutterBottom>
                Error loading user profile!
              </Typography>
              <LocalError message="No user profile found with provided credentials!" />
            </>
          ) : isLoading ? (
            <>
              <Grid item xs={12} sm={4}>
                <Skeleton variant="circular" width={100} height={100} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </Box>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={4}>
                <Avatar alt={user.first_name.charAt(0) + user.last_name.charAt(0)}
                  src={user.avatar_path}
                  sx={{
                    bgcolor: "primary.main",
                    width: 100,
                    height: 100,
                    fontSize: 40,
                  }}
                >
                  {user.first_name.charAt(0)}
                  {user.last_name.charAt(0)}
                </Avatar>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                  <Typography variant="h5" component="div" gutterBottom>
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    {user?.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {'Joined date: ' + new Date(user.createdAt).toDateString()}
                  </Typography>

                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
      <FavoriteMovies />
      <WatchList />
      <RatingMovies />
    </Container>
  );
};

export default ProfilePage;
