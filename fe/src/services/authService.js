import { instance } from "./api/axios.js";

export const loginService = async (payload) => {
  const response = await instance.post("/login", payload);
  return response.data;
};
