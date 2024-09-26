import { url, endpoint } from "./endpoint";
import {
  IAddDrink,
  IAddDrinkPicture,
  IAddReview,
  IDrink,
  IPicture,
} from "./interface";

export const drinks = async (filter: string) => {
  const get_drinks = await fetch(`${url}/${endpoint.drinks}${filter}`);
  const response = await get_drinks.json();

  return response;
};
export const AddDrink = async (drink: IAddDrink) => {
  const add_drink = await fetch(`${url}/${endpoint.create}`, {
    method: "POST",
    body: JSON.stringify(drink),
    headers: { "Content-Type": "application/json" },
  });
  const response = await add_drink.json();

  return response;
};
export const AddReview = async (review: IAddReview, drinkId: number) => {
  const add_review = await fetch(`${url}/${endpoint.createReview(drinkId)}`, {
    method: "POST",
    body: JSON.stringify(review),
    headers: { "Content-Type": "application/json" },
  });
  const response = await add_review.json();

  return response;
};
export const getReviews = async (drinkId: number, filter: string) => {
  const add_review = await fetch(
    `${url}${endpoint.fetchReviews(drinkId)}${filter}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const response = await add_review.json();

  return response;
};

export const AddPicture = async ({
  drinkId,
  file,
}: IAddDrinkPicture): Promise<any> => {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  const formData = new FormData();
  formData.append("file", file);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow" as RequestRedirect,
  };

  const response = await fetch(
    `${url}${endpoint.uploadPicture(drinkId)}`,
    requestOptions
  );
  const result: IPicture = await response.json();
  return result;
};

export const delDrinkPicture = async (drinkId: number, pictureId: number) => {
  await fetch(`${url}${endpoint.deletePicture(drinkId, pictureId)}`, {
    method: "DELETE",
  });

  return { message: pictureId };
};

export const delDrink = async (id: string) => {
  await fetch(`${url}${endpoint.delete}/${id}`, {
    method: "DELETE",
  });

  return { message: id };
};
export const update_drink = async (data: IDrink, id: string) => {
  const updte_drink = await fetch(`${url}${endpoint.update}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const response = await updte_drink.json();
  // console.log(response, "update response");
  return response;
};
