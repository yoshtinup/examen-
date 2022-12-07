import axios from 'axios';

export default axios.create({
  baseURL: process.env.LOGIN_ALUMNOS_POSGRADO,
  headers: {
    'Content-type': 'application/json',
  },
});
