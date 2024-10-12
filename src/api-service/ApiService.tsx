import axios, { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

// import helperFunctions from './HelperService';
export interface AxiosErrorResponse {
  message: string;
  response?: {
    status: number;
    data: any;
    headers: any;
  };
  request?: any;
  config?: any;
  code?: string;
}

axios.interceptors.response.use(
  (response) =>
    new Promise((resolve) => {
      resolve(response);
    }),
  (error) => {
    if (error.response.status === 422) {
      toast.error(error.response.data?.error?.message);
    }
    if (error.response.status === 400) {
      toast.error(error.response.data?.msg);
    }
    if (!error.response) {
      return new Promise((reject) => {
        reject(error);
      });
    }
    if (error.response.status === 401) {
      // localStorage.removeItem('access-token');
      // localStorage.removeItem('refresh-token');
      // window.location.href = '/login';
      return new Promise((reject) => {
        reject(error);
      });
    } else {
      return new Promise((reject) => {
        reject(error);
      });
    }
  }
);

export function setToken(token: string | null, refreshToken: string | null) {
  if (token && refreshToken) {
    localStorage.setItem('access-token', token);
    localStorage.setItem('refresh-token', refreshToken);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function removeToken() {
  delete axios.defaults.headers.common.Authorization;
  localStorage.removeItem('access-token');
  localStorage.removeItem('refresh-token');
}

export function getHeaders() {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken) {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }
  return undefined;
}

const apiFunctions = {
  get: async (url: string): Promise<AxiosResponse['data']> => {
    return axios.get(url, getHeaders());
  },
  post: async (url: string, data: object): Promise<AxiosResponse['data']> => {
    return axios.post(url, data, getHeaders());
  },
  put: async (url: string, data: object): Promise<AxiosResponse['data']> => {
    return axios.put(url, data, getHeaders());
  },
  patch: async (url: string, data: object): Promise<AxiosResponse['data']> => {
    return axios.patch(url, data, getHeaders());
  },
  delete: async (url: string) => {
    return axios.delete(url, getHeaders());
  },
  uploadFile: async (
    url: string,
    data: object
  ): Promise<AxiosResponse['data']> => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    return axios.post(url, data, headers);
  },
};

export function isTokenValid(token: string) {
  try {
    const decoded_jwt: any = jwtDecode(token);
    return decoded_jwt || false; // unlimited expiry
  } catch (error: any) {
    return false;
  }
}

export function errorAxiosResponse(error: any) {
  console.log('statuscode new', error.response.status);
  console;
  let msg = '';
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response);
    msg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.msg;
    // status = error.response?.status;
    // console.log(error.response);
    // console.log(error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    msg = error.request;
    // console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    msg = error.message;
    // console.log('Error', error.message);
  }
  return msg;
}

// export default axios;
export default apiFunctions;
