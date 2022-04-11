import axios from 'axios';

export default axios.create({
  withCredentials: false,
  baseURL: 'http://140.116.154.113:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});