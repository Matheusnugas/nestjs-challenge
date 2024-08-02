import { useEffect, useState } from "react";
import CompanyCard from "../../components/Molecules/CompanyCard";
import { MyNavbar } from "../../components/Organisms/";
import Setup from "./config";
import CompaniesApi from "../../services/companies";
import LoadingLottie from "../../components/Atoms/LoadingLottie";

const { InitialState } = Setup;

function Companies(props) {
  const [companies, setCompanies] = useState(InitialState.companies);
  const [loading, setIsLoading] = useState(InitialState.loading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await CompaniesApi.getCompanies();
        setCompanies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching companies", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-challenge-dark-3 flex flex-col min-h-screen">
      <MyNavbar />
      <main className="mt-8 px-6 flex flex-col flex-1 h-full animate-fadeIn">
        <div className="flex justify-between items-center w-full mt-4 max-w-screen-xl mx-auto text-white md:gap-80">
          <div className="w-full">
            <p className="text-white font-league-spartan text-2xl md:text-4xl font-semibold">
              Companies
            </p>
            <p className="text-challenge-light-purple font-league-spartan text-sm md:text-lg max-w-screen-xl mx-auto">
              These are the companies available for investing.
            </p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center flex-1">
            <LoadingLottie />
          </div>
        ) : (
          <div className="animate-fadeIn gap-12 flex flex-col md:flex-row flex-wrap justify-center items-center flex-1 my-4 mx-auto w-full max-w-screen-xl">
            {companies &&
              companies.map((company) => {
                return <CompanyCard key={company.id} company={company} />;
              })}
          </div>
        )}
      </main>
    </div>
  );
}

export default Companies;
