import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDrinkReviewAsync } from "../redux/taskSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IRevew } from "../interface";
import BackButton from "../components/drink-details/back-button";
import DrinkImageGrid from "../components/drink-details/drink-image-grid";
import DrinkInfo from "../components/drink-details/drink-info";
import ReviewSummary from "../components/drink-details/review-summary";
import ReviewModal from "../components/drink-details/review-modal";

const DrinkDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const drinks = useSelector((state: RootState) => state.drinks.drinks);




  const navigate = useNavigate();
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [review, setReview] = useState<IRevew>({
    user_name: "",
    description: "",
    rating: 0,
  });

  const handleReviewChange = (field: keyof IRevew, value: string | number) => {
    setReview({ ...review, [field]: value });
  };

  const handleReviewSubmit = () => {
    dispatch(
      addDrinkReviewAsync({
        drinkId: parseInt(drinks.items[0].id || "0"),
        review: review,
      })
    );
    setOpenReviewModal(false);
  };

  return (
    <>
      <Container
        sx={{
          backgroundColor: "#EAEAEA",
          paddingY: 5,
          paddingX: { md: 5, xs: 1 },
        }}
      >
        <BackButton navigate={navigate} />
        <Box
          sx={{
            backgroundColor: "white",
            padding: 2,
            marginTop: 2,
            borderRadius: 3,
          }}
        >
          {drinks.items[0].Pictures && (
            <DrinkImageGrid pictures={drinks.items[0].Pictures} />
          )}
          <DrinkInfo
            name={drinks.items[0].name}
            description={drinks.items[0].description}
          />
          <ReviewSummary
            rating={
              (drinks.items[0].reviewAverageRating &&
                Number(drinks.items[0].reviewAverageRating.toFixed(1))) ||
              0
            }
          />
          <Box marginTop={2} display={"flex"} justifyContent={"flex-end"}>
            <Button variant="outlined" onClick={() => setOpenReviewModal(true)}>
              <Typography color={"#4F46E5"}>Add a Review</Typography>
            </Button>
          </Box>
        </Box>
        <ReviewModal
          open={openReviewModal}
          onClose={() => setOpenReviewModal(false)}
          review={review}
          onReviewChange={handleReviewChange}
          onSubmit={handleReviewSubmit}
        />
      </Container>
    </>
  );
};

export default DrinkDetails;
