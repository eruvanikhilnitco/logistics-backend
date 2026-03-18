import axios from "axios";

const API = axios.create({
  baseURL: "https://logistics-backend-0zah.onrender.com/",
});

export const getDeliveries = () => API.get("/api/deliveries");