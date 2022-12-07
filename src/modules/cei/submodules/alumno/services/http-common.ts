import axios from 'axios';
import { getValidationError } from '../utilities/get-validation-error';
import { SnackBarUtilities } from '../utilities/snackbar-manager';
import Cookies from 'js-cookie';

const updateHeader = request => {
  const headerCEI = {
    Authorization: 'Bearer ' + Cookies.get('EcosurToken'),
    'Content-Type': 'application/json',
  };

  request.headers = headerCEI;
  return request;
};

const HttpClient = () => {
  const url = process.env.API_CEI;
  console.log('apiceii', url);
  const instance = axios.create({
    baseURL: url,
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ',
    },
  });

  instance.interceptors.request.use(request => {
    if (request.baseURL.includes('api-cei')) return updateHeader(request);
    return request;
  });

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      SnackBarUtilities.error(getValidationError(error.response.statusText));
      console.log('Error', getValidationError(error.response.statusText));
      return Promise.reject(error.response.statusText);
    }
  );

  return instance;
};

export default HttpClient();
