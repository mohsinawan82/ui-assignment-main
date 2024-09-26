import { Box, Rating, Typography } from "@mui/material";

interface ReviewSummaryProps {
  rating: number;
}

const ReviewSummary = ({ rating }: ReviewSummaryProps) => (
  <Box
    mt={1}
    sx={{
      backgroundColor: "#F7F8FA",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingY: 1,
      width: "fit-content",
      paddingX: 2,
      marginTop: 2,
    }}
  >
    <Rating name="read-only" value={rating} readOnly />
    <Typography sx={{ color: "#687D94", fontSize: 12, fontWeight: 400, paddingLeft: 1 }}>
      {rating}/5
    </Typography>
  </Box>
);

export default ReviewSummary;
