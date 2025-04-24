import axios from "axios";

const API_URL = "http://localhost:8000/api/tasks/";

export const get = () => axios.get(API_URL);
export const create = (data: { title: string; description: string }) =>
  axios.post(API_URL, data);
export const remove = (id: number) => axios.delete(`${API_URL}${id}/`);
export const toggle = (id: number, completed: boolean) =>
  axios.patch(`${API_URL}${id}/`, { completed });
