import { Axios } from "axios";

let defaultConfig = {
  isProduction: process.env.NODE_ENV === "production",
};

// WEBSOCKET_URL
const REACT_APP_SOCKET_URL = defaultConfig.isProduction
  ? "https://api.cappedrange.gg"
  : "http://localhost:5000";

const axios = new Axios({
  baseURL: REACT_APP_SOCKET_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const config = {
  ...defaultConfig,
  REACT_APP_SOCKET_URL,
  axios,
};
