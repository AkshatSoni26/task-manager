import axios from 'axios';
import { base } from './routes';

const axiosClient = axios.create({
  baseURL: base, // Replace this with your API base URL
//   timeout: 5000, // Timeout duration in milliseconds
  headers: {
    'Content-Type': 'application/json', // Setting the default Content-Type
  },
});

export default axiosClient;
