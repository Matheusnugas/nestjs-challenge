import API from "..";
import Keys from "../../constants/keys";

const AuthApi = {
  registerNewUser: async (data) =>
    API.post(`${Keys.VITE_API_URL}/api/auth/register`, data),

  sendTokenToApi: async (data) =>
    API.post(`${Keys.VITE_API_URL}/api/auth/test-token`, data),
};

export default AuthApi;
