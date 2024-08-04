import axios from "axios";
import DeviceUtils from "../utils/device";
import LocalStorage from "../storage";
import Keys from "../constants/keys";
import { auth } from "../lib/configs/firebase.config";

export const httpMethodTypes = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
};

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  isAxiosError(error) {
    return axios.isAxiosError(error);
  },
};

export const handleRequestConfig = (token, params, data) => {
  const obj = {
    headers: {
      Authorization: token,
    },
    params,
    data,
  };

  Object.keys(obj).forEach((key) =>
    obj[key] === undefined ? delete obj[key] : {}
  );

  return obj;
};

export const api = axios.create({
  baseURL: Keys.VITE_API_URL || "",
  timeout: 60 * 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    let token, userId;

    const deviceInfo = DeviceUtils.getDeviceInfo();

    if (auth.currentUser) {
      token = await auth.currentUser.getIdToken();
      userId = auth.currentUser.uid;
    }

    console.log(`Bearer ${token}`);

    return {
      ...config,
      headers: {
        ...config.headers,
        ...deviceInfo,
        Authorization: `Bearer ${token}`,
        credentials: userId,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
