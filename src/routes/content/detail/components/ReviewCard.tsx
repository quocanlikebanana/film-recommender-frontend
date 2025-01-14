import { Box, Avatar, Typography, Card, CardContent } from "@mui/material";
import { Review } from "../../interfaces/movie.interface";
import { toTmdbImageUrl } from "../../../../app/image";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card key={review.id}>
      <CardContent sx={{ display: "flex", mb: 3 }}>
        {/* Avatar */}
        <Avatar
          src={toTmdbImageUrl(review.author_details.avatar_path)}
          alt={review.author_details.username}
          sx={{ width: 60, height: 60, mr: 2 }}
        />

        {/* Details */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            {review.author_details.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {review.author_details.username}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{
              mb: 1,
              cursor: "pointer",
            }}
          >
            {review.author_details.rating}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {review.content}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
