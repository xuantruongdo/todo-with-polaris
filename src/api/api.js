import axios from "axios";

const URL = "http://localhost:5001/api";

export const callGetAll = async () => {
  return await axios.get(`${URL}/todos`);
};

export const callGetOne = async (id) => {
  return await axios.get(`${URL}/todo/${id}`);
};

export const callAdd = async (data) => {
  return await axios.post(`${URL}/todos`, data);
};

export const callUpdate = async (id, data) => {
  return await axios.put(`${URL}/todo/${id}`, data);
};

export const callDelete = async (id) => {
  return await axios.delete(`${URL}/todo/${id}`);
};

export const callMultipleUpdate = async (data) => {
  return await axios.put(`${URL}/todos/update-multiple`, data);
};

export const callMultipleDelete = async (data) => {
  return await axios.delete(`${URL}/todos/delete-multiple`, {data: data});
};