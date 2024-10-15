import axios from "axios";

const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
    auth: {
        username: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD
    }
});

export default api;
