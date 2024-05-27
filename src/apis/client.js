import axios from "axios";

const client = axios.create({baseURL:import.meta.env.VITE_APP_API_END_POINT});

export default client
