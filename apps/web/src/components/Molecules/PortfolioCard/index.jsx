import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import InvestmentsApi from "../../../services/investments";
import { useEffect, useState } from "react";

function PortfolioCard({ portfolio }) {
  const [investments, setInvestments] = useState(undefined);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/portfolios/${portfolio.id}`);
  };

  async function fetchInvestments(portfolio) {
    try {
      const response = await InvestmentsApi.getPortfolioInvestments(
        portfolio.id
      );
      if (response && response.data) {
        setInvestments(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setInvestments(undefined);
      } else {
        console.error("Error fetching investments:", error);
      }
    }
  }

  useEffect(() => {
    fetchInvestments(portfolio);
    console.log("alo");
  });

  function sumInvestmentAmount(investments) {
    const total = investments
      .reduce((sum, investment) => sum + investment.amount, 0)
      .toFixed(2);
    return total.toString();
  }

  return (
    <div
      key={portfolio.id}
      className="w-full md:h-20 h-28 flex flex-col md:flex-row bg-challenge-dark-2 rounded-md cursor-pointer duration-100 hover:border hover:border-challenge-purple-1 p-4"
      onClick={handleClick}
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="flex w-11/12 justify-between md:justify-start md:gap-4 md:items-center">
          <p className="font-league-spartan font-bold text-white">
            <span className="font-league-spartan mr-1 text-challenge-purple-2 font-bold text-lg">
              #
            </span>
            {portfolio.id}
          </p>
          <p className="font-league-spartan font-semibold text-lg text-challenge-light-purple">
            {portfolio.name}
          </p>
        </div>
        <div className="flex w-11/12 justify-between items-center">
          <div className="flex flex-col md:flex-row md:gap-28 md:items-center">
            <p className="font-league-spartan text-sm text-challenge-gray-purple">
              Created at: {portfolio.createdAt.split("T")[0]}
            </p>
            <p className="font-league-spartan font-bold text-white text-lg">
              <span className="text-sm md:text-lg text-challenge-medium-purple font-medium">
                Investments:{" "}
              </span>
              $ {investments ? sumInvestmentAmount(investments) : "0"}
            </p>
          </div>
          <ArrowRightCircleIcon className="text-challenge-purple-1 h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default PortfolioCard;
