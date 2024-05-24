import axios from 'axios';
const api = axios.create({
    baseURL: 'https://intra-social-api-node.onrender.com/',
});
export default api;