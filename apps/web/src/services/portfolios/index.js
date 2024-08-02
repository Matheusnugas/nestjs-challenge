import API from "..";
import Keys from "../../constants/keys";

const PortfolioApi = {
  getUserPortfolios: async (authId) =>
    API.get(`${Keys.VITE_API_URL}/api/portfolios/user/${authId}`),

  createNewPortfolio: async (authId, data) =>
    API.post(`${Keys.VITE_API_URL}/api/portfolios/${authId}`, data),

  getPortfolioById: async (id) =>
    API.get(`${Keys.VITE_API_URL}/api/portfolios/${id}`),

  updatePortfolioById: async (id, data) =>
    API.put(`${Keys.VITE_API_URL}/api/portfolios/${id}`, data),

  deletePortfolioById: async (id) =>
    API.delete(`${Keys.VITE_API_URL}/api/portfolios/${id}`),
};

export default PortfolioApi;
