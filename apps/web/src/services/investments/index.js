import API from "..";
import Keys from "../../constants/keys";

const InvestmentsApi = {
  getPortfolioInvestments: async (portfolioId) =>
    API.get(`${Keys.VITE_API_URL}/api/investments/portfolio/${portfolioId}`),

  createNewInvestment: async (data) =>
    API.post(`${Keys.VITE_API_URL}/api/investments/`, data),

  deleteInvestment: async (id) =>
    API.delete(`${Keys.VITE_API_URL}/api/investments/${id}`),
};

export default InvestmentsApi;
