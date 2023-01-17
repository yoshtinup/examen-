import axios from 'axios';
import Cookies from 'js-cookie';

export default axios.create({
  baseURL: process.env.API_CEI,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + Cookies.get('ecosurToken'),
  },
});
