import axios from "axios";
import { URL } from "../config/config";

export const AddToDoService = (value) => {
  return axios.post(`${URL}/to-do`, value);
};
export const EditToDoService = (value) => {
  return axios.put(`${URL}/to-do`, value);
};
export const GetAllToDoService = (params) => {
  let query = "";
  if (Object.keys(params).length > 0) {
    query =
      "?" +
      Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&");
  }
  return axios.get(`${URL}/to-do${query}`);
};
export const GetToDoByIdService = (id) => {
  return axios.get(`${URL}/to-do/${id}`);
};
export const DeleteToDoService = (id) => {
  return axios.delete(`${URL}/to-do/${id}`);
};
export const ClearCompletedToDoService = (type) => {
  return axios.post(`${URL}/to-do/clear`, { type });
};
