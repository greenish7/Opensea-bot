import { Axios } from "axios";
import env from "react-dotenv";

let defaultConfig = {
  isProduction: process.env.NODE_ENV === "production",
};

// WEBSOCKET_URL
const REACT_APP_SOCKET_URL = defaultConfig.isProduction
  ? "http://3.88.83.159/api"
  : "http://3.88.83.159/api";

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
const REACT_APP_OPENSEA_API_KEY = env.REACT_APP_OPENSEA_API_KEY;
const REACT_APP_SUPPORTED_CHAIN_IDS = [1, 3, 4, 5, 42];
export const config = {
  ...defaultConfig,
  REACT_APP_SOCKET_URL,
  axios,
  REACT_APP_OPENSEA_API_BASE_URL,
  REACT_APP_OPENSEA_BASE_URL,
  REACT_APP_OPENSEA_API_KEY,
  REACT_APP_SUPPORTED_CHAIN_IDS,
};
