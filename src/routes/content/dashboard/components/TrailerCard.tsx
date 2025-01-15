import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import { Trailer } from "../../interfaces/movie.interface";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function TrailerCard({ trailer }: { trailer: Trailer | null }) {
  const getYouTubeThumbnail = (videoKey: string) =>
    `https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`;

  if (!trailer)
    return (
      <Card
        sx={{
          width: {
            md: 250,
            lg: 350,
          },
          minWidth: 250,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        elevation={4}
      >
        <Skeleton variant="rectangular" width="100%" height={200} />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </CardContent>
      </Card>
    );

  return (
    <Card
      sx={{
        width: {
          md: 250,
          lg: 350,
        },
        minWidth: 250,
        height: "auto",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      elevation={4}
    >
      <CardMedia
        component="img"
        image={
          trailer.site === "YouTube"
            ? getYouTubeThumbnail(trailer.key)
            : undefined
        }
        onClick={() => window.open(trailer.link, "_blank")}
        alt={trailer.name}
        sx={{
          height: 200,
          width: "100%",
          objectFit: "cover",
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            {trailer.name}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {formatDate(trailer.published_at)}
        </Typography>
      </CardContent>
    </Card>
  );
}
