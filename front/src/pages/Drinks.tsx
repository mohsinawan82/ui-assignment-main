import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDrinks,
  deleteTaskAsync,
  getDrinkReviewAsync,
  selectedDrink,
} from "../redux/taskSlice";
import { AppDispatch, RootState } from "../redux/store";
import TablePaginationActions from "../components/DrinksTable/TablePaginationActions";
import TableHead from "../components/DrinksTable/filter-advance";
import TableBodyComponent from "../components/DrinksTable/TableBody";
import { Box, Container, TablePagination } from "@mui/material";
import ReviewsModal from "../components/DrinksTable/ReviewModal";
import { useNavigate } from "react-router-dom";

const DrinksTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const drinks = useSelector((state: RootState) => state.drinks.drinks);
  const loading = useSelector((state: RootState) => state.drinks.loading);
  const error = useSelector((state: RootState) => state.drinks.error);
  const reviews = useSelector((state: RootState) => state.drinks.review);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDrinkId, setSelectedDrinkId] = useState<string | null>(null);
  const [forceUpdate, setForceUpdate] = useState(false); // To trigger re-render

  const nameRef = useRef<string>("");
  const descriptionRef = useRef<string>("");
  const minRatingRef = useRef<number | undefined>(undefined);
  const maxRatingRef = useRef<number | undefined>(undefined);
  const descRef = useRef<string>("select");
  const sortRef = useRef<string>("select");

  const [reviewPage, setReviewPage] = useState(0);
  const [reviewsPerPage, setReviewsPerPage] = useState(4);

  const handleReviewPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setReviewPage(newPage);
    if (selectedDrinkId) {
      dispatch(
        getDrinkReviewAsync({
          drinkId: parseInt(selectedDrinkId),
          filter: `?offset=${
            newPage * reviewsPerPage
          }&length=${reviewsPerPage}`,
        })
      );
    }
  };

  const handleReviewRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReviewsPerPage(parseInt(event.target.value, 10));
    setReviewPage(0);
    if (selectedDrinkId) {
      dispatch(
        getDrinkReviewAsync({
          drinkId: parseInt(selectedDrinkId),
          filter: `?offset=0&length=${parseInt(event.target.value, 10)}`,
        })
      );
    }
  };

  const navigate = useNavigate();

  // This useEffect now uses the refs for filtering logic
  useEffect(() => {
    const newOffset = page * rowsPerPage;
    let filter = `?offset=${newOffset}&length=${rowsPerPage}`;

    if (nameRef.current) filter += `&name=${nameRef.current}`;
    if (descriptionRef.current)
      filter += `&description=${descriptionRef.current}`;
    if (descRef.current !== "select") filter += `&desc=${descRef.current}`;
    if (sortRef.current !== "select") filter += `&sort=${sortRef.current}`;
    if (minRatingRef.current !== undefined)
      filter += `&minRating=${minRatingRef.current}`;
    if (maxRatingRef.current !== undefined)
      filter += `&maxRating=${maxRatingRef.current}`;

    console.log(filter);

    dispatch(fetchDrinks(filter));
  }, [page, rowsPerPage, forceUpdate, dispatch]);

  const handleFilterUpdate = () => {
    setForceUpdate(!forceUpdate); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Container sx={{ backgroundColor: "#EAEAEA", paddingY: 5 }}>
        <Box aria-label="drinks table">
          <TableHead
            nameRef={nameRef}
            descriptionRef={descriptionRef}
            minRatingRef={minRatingRef}
            maxRatingRef={maxRatingRef}
            descRef={descRef}
            sortRef={sortRef}
            onFilterChange={handleFilterUpdate}
          />
          <TableBodyComponent
            drinks={drinks.items}
            onView={(drink) => {
              dispatch(selectedDrink(drink));
              navigate(`/drink/details`);
            }}
            onEdit={(drink) => {
              dispatch(selectedDrink(drink));
              navigate(`/drink/${drink.id}`);
            }}
            onDelete={(drinkId) => {
              const newOffset = page * rowsPerPage;
              const filter = `?offset=${newOffset}&length=${rowsPerPage}`;
              dispatch(deleteTaskAsync({ id: drinkId, type: "DELETE_TASK" }));
              dispatch(fetchDrinks(filter));
            }}
            onShowReviews={(drinkId) => {
              setModalOpen(true);
              setSelectedDrinkId(drinkId);
              dispatch(
                getDrinkReviewAsync({
                  drinkId: parseInt(drinkId),
                  filter: `?offset=0&length=4`,
                })
              );
            }}
          />

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            count={drinks.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            ActionsComponent={TablePaginationActions}
          />
        </Box>
      </Container>
      <ReviewsModal
        open={modalOpen}
        reviews={reviews}
        reviewsPerPage={reviewsPerPage}
        reviewPage={reviewPage}
        handleReviewPageChange={handleReviewPageChange}
        handleReviewRowsPerPageChange={handleReviewRowsPerPageChange}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default DrinksTable;
