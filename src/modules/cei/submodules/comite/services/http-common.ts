import axios from 'axios';
import Cookies from 'js-cookie';

const url = process.env.API_CEI;
export default axios.create({
  baseURL: url,
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + Cookies.get('ecosurToken'),
  },
});
