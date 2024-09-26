export const url: string = "http://localhost:4000/api";

export const endpoint = {
  drinks: "/drinks",
  delete: "/drinks",
  update: "/drinks",
  create: "/drinks",
  uploadPicture: (id: number) => `/drinks/${id}/pictures`,
  deletePicture: (drinkId: number, pictureId: number) =>
    `/drinks/${drinkId}/pictures/${pictureId}`,
  createReview: (id: number) => `/drinks/${id}/reviews`,
  fetchReviews: (id: number) => `/drinks/${id}/reviews`,
};
