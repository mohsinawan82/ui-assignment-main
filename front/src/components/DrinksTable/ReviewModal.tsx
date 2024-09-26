import React from "react";
import { Modal, Box, Typography, TablePagination } from "@mui/material";
import { IRevew } from "../../interface";

interface ReviewsModalProps {
  open: boolean;
  reviews: { items: IRevew[]; total: number };
  onClose: () => void;
  reviewsPerPage: number;
  reviewPage: number;
  handleReviewPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  handleReviewRowsPerPageChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({
  open,
  reviews,
  onClose,
  reviewsPerPage,
  reviewPage,
  handleReviewPageChange,
  handleReviewRowsPerPageChange,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{ p: 4, backgroundColor: "white", maxWidth: 600, margin: "auto" }}
      >
        <Typography variant="h6">Reviews</Typography>
        {reviews.items.map((review) => (
          <Box key={review.id} sx={{ mt: 2 }}>
            <Typography variant="body1">{review.description}</Typography>
            <Typography variant="body2" color="textSecondary">
              Rating: {review.rating}
            </Typography>
          </Box>
        ))}
        <TablePagination
          count={reviews.total}
          rowsPerPage={reviewsPerPage}
          page={reviewPage}
          onPageChange={handleReviewPageChange}
          onRowsPerPageChange={handleReviewRowsPerPageChange}
        />
      </Box>
    </Modal>
  );
};

export default ReviewsModal;
