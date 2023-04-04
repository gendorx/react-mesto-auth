import Api from "./api";

/** config for api */

const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "3c12d929-d321-40f7-9ea5-47a9cc856981",
    "Content-Type": "application/json",
  },
};

export const api = new Api(apiConfig)
