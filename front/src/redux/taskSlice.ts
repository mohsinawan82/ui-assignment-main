// taskSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddReviewAction,
  DeleteDrinkPictureAction,
  DeleteTaskAction,
  getReviewAction,
  IAddDrinkPicture,
  IAddReview,
  IDrink,
  IGetReview,
  IPicture,
  IRevew,
  UpdateTaskAction,
} from "../interface";
import {
  AddDrink,
  AddPicture,
  AddReview,
  drinks as FetchDrinks,
  delDrink,
  delDrinkPicture,
  getReviews,
  update_drink,
} from "../requests";

interface DrinksState {
  drinks: { items: IDrink[]; total: number };
  review: { items: IRevew[]; total: number };
  loading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  error: string | null;
}

const initialState: DrinksState = {
  drinks: { items: [], total: 0 },
  review: { items: [], total: 0 },
  loading: false,
  updateLoading: false,
  error: null,
  deleteLoading: false,
};

export const fetchDrinks = createAsyncThunk(
  "drinks/fetchDrinks",
  async (filter: string) => {
    const response = await FetchDrinks(filter);
    return response;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "api/deleteTask",
  async (data: DeleteTaskAction) => {
    const response = await delDrink(data.id);
    return response;
  }
);

export const updateTaskAsync = createAsyncThunk(
  "drinks/updateTask",
  async (data: UpdateTaskAction) => {
    const response: UpdateTaskAction = await update_drink(data.drink, data.id);
    return response;
  }
);
export const addDrinkPictureAsync = createAsyncThunk(
  "drinks/addPicture",
  async (data: IAddDrinkPicture) => {
    const response: IPicture = await AddPicture(data);
    return response;
  }
);

export const addDrinkReviewAsync = createAsyncThunk(
  "drink/addReview",
  async (data: AddReviewAction) => {
    const response: IAddReview = await AddReview(data.review, data.drinkId);
    return response;
  }
);
export const getDrinkReviewAsync = createAsyncThunk(
  "drink/getReviews",
  async (data: getReviewAction) => {
    const response: IGetReview = await getReviews(data.drinkId, data.filter);
    return response;
  }
);
export const deleteDrinkPictureAsync = createAsyncThunk(
  "drinks/deletePicture",
  async (data: DeleteDrinkPictureAction) => {
    const response = await delDrinkPicture(data.drinkId, data.pictureId);
    return response;
  }
);

const taskSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<IDrink>) => {
      AddDrink(action.payload);
      state.drinks.items.push(action.payload);
    },
    drinks: (
      state,
      action: PayloadAction<{ items: IDrink[]; total: number }>
    ) => {
      state.drinks = action.payload;
    },
    selectedDrink: (state, action: PayloadAction<IDrink>) => {
      state.drinks.items = [action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDrinks.fulfilled,
        (state, action: PayloadAction<{ items: IDrink[]; total: number }>) => {
          state.loading = false;
          state.drinks = action.payload;
        }
      )
      .addCase(fetchDrinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch drinks";
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.drinks.items = state.drinks.items.filter(
          (task) => task.id !== action.payload.message
        );
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error.message || "Failed to delete task";
      })
      .addCase(updateTaskAsync.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.drinks.items[0] = action.payload.drink;
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.error.message || "Failed to update drink";
      })
      .addCase(addDrinkPictureAsync.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(addDrinkPictureAsync.fulfilled, (state, action) => {
        state.drinks.items[0].Pictures?.push(action.payload);
      })
      .addCase(addDrinkPictureAsync.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.error.message || "Failed to upload picture";
      })
      .addCase(deleteDrinkPictureAsync.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(deleteDrinkPictureAsync.fulfilled, (state, action) => {
        state.drinks.items[0].Pictures = state.drinks.items[0].Pictures?.filter(
          (img) => img.id !== action.payload.message
        );
      })
      .addCase(deleteDrinkPictureAsync.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.error.message || "Failed to upload picture";
      })
      .addCase(addDrinkReviewAsync.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(addDrinkReviewAsync.fulfilled, (state, action) => {
        state.review.items.push(action.payload);
      })
      .addCase(addDrinkReviewAsync.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.error.message || "Failed to upload picture";
      })
      .addCase(getDrinkReviewAsync.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(getDrinkReviewAsync.fulfilled, (state, action) => {
        state.review = action.payload;
      })
      .addCase(getDrinkReviewAsync.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.error.message || "Failed to upload picture";
      });
  },
});

export const { addTask, drinks, selectedDrink } = taskSlice.actions;
export default taskSlice.reducer;
