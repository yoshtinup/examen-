import axios from 'axios';
import Cookies from 'js-cookie';
import { SnackBarUtilities } from '@shared/utilities/snackbar-manager';
import { getValidationError } from '@shared/utilities/get-validation-error';

const updateHeader = request => {
  const headerCEI = {
    Authorization: 'Bearer ' + Cookies.get('ecosurToken'),
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
      console.log(error.response);
      SnackBarUtilities.error([
        error.response.config.baseURL + error.response.config.url,
        getValidationError(error.response.statusText),
      ]);
      return Promise.reject(error);
    }
  );

  return instance;
};

export default HttpClient();
