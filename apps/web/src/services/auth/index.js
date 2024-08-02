import API from "..";
import Keys from "../../constants/keys";

const AuthApi = {
  registerNewUser: async (data) =>
    API.post(`${Keys.VITE_API_URL}/api/auth/register`, data),

  //   resendContract: async (token, id, data) =>
  //     API.post(
  //       `${}`,
  //       data,
  //       handleRequestConfig(token, { id })
  //     ),

  // getAllContracts: async () =>
  //   API.get(
  //     `${await RemoteConfigAPI.BASE_URL()}/${
  //       apiRoutes.contracts
  //     }/getAllContracts`
  //   ),
};

export default AuthApi;
