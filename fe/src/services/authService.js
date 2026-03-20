import { requestAPI } from "./api.js";

export const loginService = async (payload) => {
  return await requestAPI({
    method: "POST",
    url: "/login",
    data: payload,
  });
};
