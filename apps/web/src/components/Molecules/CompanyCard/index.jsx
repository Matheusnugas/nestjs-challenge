import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function CompanyCard({ company }) {
  function sumInvestmentAmount(investments) {
    const total = investments
      .reduce((sum, investment) => sum + investment.amount, 0)
      .toFixed(2);
    return total.toString();
  }

  return (
    <Card className="mt-6 w-11/12 md:min-h-96 md:w-2/6 p-6 bg-challenge-dark-2">
      <CardBody>
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mb-4 h-12 w-12 text-challenge-purple-2"
          >
            <path
              fillRule="evenodd"
              d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
              clipRule="evenodd"
            />
            <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
          </svg>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-challenge-light-purple text-2xl font-bold font-league-spartan"
          >
            {company.name}
          </Typography>
        </div>

        <Typography className="mb-2 font-semibold font-league-spartan text-challenge-gray-purple text-lg">
          Ticker: {company.ticker}
        </Typography>
        <Typography className="font-semibold font-league-spartan text-white text-lg">
          {company.description}
        </Typography>
      </CardBody>
      <CardFooter className="mb-2 font-semibold flex flex-col items-center justify-center font-league-spartan text-challenge-gray-purple text-lg">
        Investment Received{" "}
        <span className="font-league-spartan text-white font-bold">
          $ {sumInvestmentAmount(company.investments)}
        </span>
      </CardFooter>
    </Card>
  );
}
