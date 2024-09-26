import React, { ReactNode } from "react";

export interface IDrink {
  id?: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  reviewCount?: number;
  reviewAverageRating?: number;
  Pictures?: IPicture[];
}

export interface IRevew {
  id?: number;
  user_name: string;
  description: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
  DrinkId?: number;
}

export interface IPicture {
  id: number;
  name: string;
  mimetype: string;
  path: string;
  createdAt: string;
  updatedAt: string;
  DrinkId: number;
}

export interface IAddDrink {
  name: string;
  description: string;
}

export interface IAddDrinkPicture {
  drinkId: number;
  file: File;
}
export interface IAddReview {
  user_name: string;
  description: string;
  rating: number;
}
export interface IGetReview {
  items: IRevew[];
  total: number;
}

export interface AddReviewAction {
  review: IAddReview;
  drinkId: number;
}
export interface getReviewAction {
  filter: string;
  drinkId: number;
}

export interface ITaskMethod {
  // drinks: IDrink[];
  drinks: (drinks: IDrink[]) => void;
  deleteTask: (_id: string) => void;
  addTask: (task: IDrink) => void;
  updateTask: (data: IDrink, id: string) => void;
}

export interface TaskProviderProps {
  children: ReactNode;
}

export interface DeleteDrinkPictureAction {
  drinkId: number;
  pictureId: number;
}

export interface DeleteTaskAction {
  type: "DELETE_TASK";
  id: string;
}

export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => void;
}

export interface UpdateTaskAction {
  type: "UPDATE_TASK";
  id: string;
  drink: IDrink;
}

export interface CreateTaskAction {
  type: "ADD_TASK";
  payload: IDrink;
}
export interface FetchDrinks {
  type: "GET_ALL_TASKS";
  payload: IDrink[];
}

export type TaskAction =
  | DeleteTaskAction
  | UpdateTaskAction
  | CreateTaskAction
  | FetchDrinks;
