import axios from "axios";

const BASE_URL_API = process.env.REACT_APP_HOST

const rankAPI = axios.create({
  baseURL: BASE_URL_API,
});

export { rankAPI };