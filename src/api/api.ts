import axios from "axios";
import { API_URL } from "../lib/config.ts";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})