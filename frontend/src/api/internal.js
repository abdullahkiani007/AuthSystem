import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const login = async (data) => {
  let response;
  console.log("login Data", data);
  try {
    response = await api.post("/login", data);
  } catch (error) {
    console.log("Axios error");
    return error.response.data;
  }

  return response;
};

const signUp = async (data) => {
  let response;

  try {
    response = await api.post("/signup", data);
  } catch (error) {
    return error.response.data;
  }
  return response;
};

const signOut = async () => {
  let response;

  try {
    response = await api.get("/signout");
  } catch (error) {
    return error;
  }
  return response;
};

const verify = async (data) => {
  let response;

  try {
    response = await api.post("/verify", data);
  } catch (error) {
    console.log("Axios error");
    return error.response.data;
  }
  return response;
};
export { login, signUp, signOut, verify };
