import { Box, Button, Modal, Rating, TextField, Typography } from "@mui/material";
import { IRevew } from "../../interface";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  review: IRevew;
  onReviewChange: (field: keyof IRevew, value: string | number) => void;
  onSubmit: () => void;
}

const ReviewModal = ({ open, onClose, review, onReviewChange, onSubmit }: ReviewModalProps) => (
  <Modal open={open} onClose={onClose} aria-labelledby="review-modal-title">
    <Box sx={modalStyle}>
      <Typography id="review-modal-title" textAlign={"center"} variant="h6">
        Leave a Review for this drink.
      </Typography>

      <Typography component="legend" textAlign={"center"}>
        How would you rate this product?
      </Typography>
      <Box display={"flex"} justifyContent={"center"}>
        <Rating
          name="product-rating"
          value={review.rating}
          onChange={(e: React.SyntheticEvent, newValue: number | null) =>
            onReviewChange("rating", newValue || 0)
          }
        />
      </Box>

      <TextField
        label="Write a review..."
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={review.description}
        onChange={(e) => onReviewChange("description", e.target.value)}
      />

      <TextField
        label="Your Name"
        fullWidth
        margin="normal"
        value={review.user_name}
        onChange={(e) => onReviewChange("user_name", e.target.value)}
      />

      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={onSubmit}>
        Submit Review
      </Button>
    </Box>
  </Modal>
);

export default ReviewModal;

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
