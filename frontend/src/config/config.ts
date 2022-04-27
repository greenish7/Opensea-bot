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

// OPENSEA_BASE_URL
const REACT_APP_OPENSEA_API_BASE_URL = "https://api.opensea.io/api/v1";
const REACT_APP_OPENSEA_BASE_URL = "https://opensea.io";
export const config = {
  ...defaultConfig,
  REACT_APP_SOCKET_URL,
  axios,
  REACT_APP_OPENSEA_API_BASE_URL,
  REACT_APP_OPENSEA_BASE_URL,
};
