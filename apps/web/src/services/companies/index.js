import API from "..";
import Keys from "../../constants/keys";

const CompaniesApi = {
  getCompanies: async () => API.get(`${Keys.VITE_API_URL}/api/companies`),
};

export default CompaniesApi;
