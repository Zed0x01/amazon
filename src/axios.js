import axios from "axios";

const baseUrl = "https://chestnut-positive-saguaro.glitch.me/api";

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
