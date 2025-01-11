import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  CircularProgress,
  Box,
  Divider,
  Stack,
  Chip,
  Link,
} from "@mui/material";

import { motion } from "framer-motion";
import { useGetCastDetailQuery } from "../services/movie.api";

const CastPage = () => {
  const { castId } = useParams<{ castId: string }>();
  const { data, error, isLoading } = useGetCastDetailQuery({
    personId: castId || "",
  });

  if (isLoading) {
    return (
      <Container sx={{ textAlign: "center", marginTop: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6" color="error">
          Có lỗi xảy ra khi tải dữ liệu
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ padding: 3, boxShadow: 4, borderRadius: 2 }}
        className="md:flex"
      >
        <Avatar
          className="mx-auto md:mx-0"
          alt={data.name}
          src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
          sx={{ width: 180, height: 180, marginRight: 4 }}
        />
        <CardContent>
          <Typography variant="h3" component="div" gutterBottom>
            {data.name}
          </Typography>
          <Stack direction="row" spacing={1} mb={2}>
            {data.also_known_as.slice(0, 3).map((alias, index) => (
              <Chip key={index} label={alias} variant="outlined" />
            ))}
          </Stack>
          <Typography variant="body1" color="textSecondary" paragraph>
            {data.biography || "Không có tiểu sử"}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={3}>
            <Grid item md={6} lg={7}>
              <Typography variant="body2">
                <strong>Sinh nhật:</strong> {data.birthday}
              </Typography>
              <Typography variant="body2">
                <strong>Nơi sinh:</strong> {data.place_of_birth || "Không rõ"}
              </Typography>
            </Grid>
            <Grid item md={6} lg={5}>
              <Typography variant="body2">
                <strong>Giới tính:</strong> {data.gender === 1 ? "Nữ" : "Nam"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Phim nổi bật
        </Typography>
        <Grid container spacing={2}>
          {/* Duyệt qua các phim nổi bật */}
          {data.also_known_as.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">{movie}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={4} sx={{ textAlign: "center" }}>
        {data.homepage && (
          <Link
            href={data.homepage}
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            Truy cập trang web chính thức
          </Link>
        )}
      </Box>
    </Container>
  );
};

export default CastPage;
