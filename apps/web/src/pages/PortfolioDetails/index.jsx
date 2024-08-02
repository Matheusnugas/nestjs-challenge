import { useEffect, useState } from "react";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AcceptBtn,
  AddBtn,
  AddInvestmentModal,
  CancelBtn,
  DeleteBtn,
  EditBtn,
  EditModal,
} from "../../components/Molecules";
import {
  EmptyLottieAnim,
  LoadingLottie,
  Tooltip,
} from "../../components/Atoms";
import { MyNavbar } from "../../components/Organisms";
import { NumericFormat } from "react-number-format";
import Select from "react-select";
import Setup from "./config";
import PortfolioApi from "../../services/portfolios";
import CompaniesApi from "../../services/companies";
import InvestmentsApi from "../../services/investments";
import Swal from "sweetalert2";

const { InitialState } = Setup;

function PortfolioDetails(props) {
  const [portfolio, setPortfolio] = useState(InitialState.portfolio);
  const [isModalOpen, setIsModalOpen] = useState(InitialState.isModalOpen);
  const [isEditModalOpen, setIsEditModalOpen] = useState(
    InitialState.isEditModalOpen
  );
  const [isTooltipVisible, setIsTooltipVisible] = useState(
    InitialState.isTooltipVisible
  );
  const [tooltipMessage, setTooltipMessage] = useState(
    InitialState.tooltipMessage
  );
  const [companies, setCompanies] = useState(InitialState.companies);
  const [investments, setInvestments] = useState(InitialState.investments);
  const [selectedCompany, setSelectedCompany] = useState(
    InitialState.selectedCompany
  );
  const [investmentAmount, setInvestmentAmount] = useState(
    InitialState.investmentAmount
  );
  const [loading, setIsLoading] = useState(true);
  const [updatePortfolioName, setUpdatePortfolioName] = useState(
    InitialState.portfolioName
  );
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchPortfolioById(id),
          fetchInvestments(id),
          fetchCompanies(),
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching portfolio details:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  async function fetchPortfolioById(portfolioId) {
    try {
      const response = await PortfolioApi.getPortfolioById(portfolioId);
      if (response && response.data) {
        setPortfolio(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching this portfolio:", error);
    }
  }

  function sumInvestmentAmount(investments) {
    const total = investments
      .reduce((sum, investment) => sum + investment.amount, 0)
      .toFixed(2);
    return total.toString();
  }

  async function fetchInvestments(portfolioId) {
    try {
      const response = await InvestmentsApi.getPortfolioInvestments(
        portfolioId
      );
      if (response && response.data) {
        setInvestments(response.data);
        console.log(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setInvestments(InitialState.investments);
      } else {
        console.error("Error fetching investments:", error);
      }
    }
  }

  async function fetchCompanies() {
    try {
      const response = await CompaniesApi.getCompanies();
      if (response && response.data) {
        setCompanies(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching Companies:", error);
    }
  }

  useEffect(() => {
    console.log(companies);
  }, [companies]);

  async function deletePortfolio(portfolioId) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this portfolio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6b46c1",
      cancelButtonColor: "#9f7aea",
      background: "#2d3748",
      color: "#ffffff",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const result = await PortfolioApi.deletePortfolioById(portfolioId);
        if (result.status == 200) {
          Swal.fire({
            title: "Deleted!",
            color: "#ffffff",
            text: "Your portfolio has been deleted.",
            background: "#2d3748",
            icon: "success",
            confirmButtonColor: "#6b46c1",
          });
        }
      } catch (error) {
        console.error("Can't Delete Portfolio");
        Swal.fire({
          title: "Error!",
          color: "#ffffff",
          text: "There was an error deleting your Portfolio.",
          background: "#2d3748",
          icon: "error",
          confirmButtonColor: "#6b46c1",
        });
      } finally {
        navigate("/portfolios");
      }
    }
  }

  async function deleteInvestment(investmentId) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this investment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6b46c1",
      cancelButtonColor: "#9f7aea",
      background: "#2d3748",
      color: "#ffffff",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await InvestmentsApi.deleteInvestment(investmentId);
        Swal.fire({
          title: "Deleted!",
          text: "Your investment has been deleted.",
          icon: "success",
          background: "#2d3748",
          color: "#ffffff",
          confirmButtonColor: "#4f46e5",
        });
        await fetchInvestments(portfolio.id);
      } catch (error) {
        console.error("Can't Delete Investment");
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting your investment.",
          icon: "error",
          background: "#2d3748",
          color: "#ffffff",
          confirmButtonColor: "#4f46e5",
        });
      }
    }
  }

  function openInvestmentModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  async function addNewInvestment() {
    try {
      const data = {
        amount: parseFloat(investmentAmount),
        portfolioId: portfolio.id,
        companyId: selectedCompany.value,
      };
      const response = await InvestmentsApi.createNewInvestment(data);
      if (response && response.data) {
        fetchInvestments(portfolio.id);
        closeModal();
        Swal.fire({
          title: "Success!",
          text: "New investment added.",
          icon: "success",
          background: "#2d3748",
          color: "#ffffff",
          confirmButtonColor: "#4f46e5",
        });
      }
    } catch (error) {
      console.error("Error adding new investment:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error adding your investment.",
        icon: "error",
        background: "#2d3748",
        color: "#ffffff",
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      setInvestmentAmount(InitialState.investmentAmount);
      setSelectedCompany(InitialState.selectedCompany);
    }
  }

  function openEditModal() {
    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
  }

  function handlePortfolioNameChange(e) {
    setUpdatePortfolioName({ name: e.target.value });
  }

  async function editPortfolio() {
    try {
      const response = await PortfolioApi.updatePortfolioById(
        portfolio.id,
        updatePortfolioName
      );
      if (response && response.data) {
        setPortfolio(response.data);
        closeEditModal();
        Swal.fire({
          title: "Success!",
          text: "Portfolio updated successfully.",
          icon: "success",
          background: "#2d3748",
          color: "#ffffff",
          confirmButtonColor: "#4f46e5",
        });
      }
    } catch (error) {
      console.error("Error updating portfolio:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating your portfolio.",
        icon: "error",
        background: "#2d3748",
        color: "#ffffff",
        confirmButtonColor: "#4f46e5",
      });
    }
  }

  function showTooltip() {
    setIsTooltipVisible(true);
    setTimeout(() => {
      setIsTooltipVisible(false);
    }, 3000);
  }

  return (
    <div className="bg-challenge-dark-3 flex flex-col min-h-screen">
      <MyNavbar />
      <main className="mt-8 px-6 flex flex-col flex-1 h-full animate-fadeIn ">
        <div className="flex mt-4 max-w-screen-xl mx-auto w-full gap-1 mb-4 items-center">
          <Link
            to={"/portfolios"}
            className="font-league-spartan text-white flex gap-2 items-center cursor-pointer hover:text-challenge-purple-2 "
          >
            <ArrowLeftIcon className="text-challenge-purple-1 h-4 w-4" /> Go
            back
          </Link>
        </div>
        {loading ? (
          <div className="flex items-center justify-center flex-1">
            <LoadingLottie />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mt-4 max-w-screen-xl mx-auto w-full md:h-24 h-28 md:flex-row bg-challenge-dark-4 rounded-md duration-100 p-4">
              <p className="font-league-spartan text-challenge-light-purple text-xl md:text-2xl font-semibold">
                {portfolio.name}
              </p>
              <div className="flex gap-2 md:gap-4">
                <DeleteBtn
                  btnText={"Delete"}
                  btnFn={() => deletePortfolio(portfolio.id)}
                />
                <EditBtn btnText={"Edit"} btnFn={openEditModal} />
              </div>
            </div>
            <div className="animate-fadeIn gap-3 md:p-4 flex flex-col rounded-md bg-challenge-dark-4 flex-1 my-4 mx-auto w-full max-w-screen-xl">
              <div className="p-4 flex flex-col justify-between h-full w-full">
                <div className="w-full">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="flex gap-1 font-league-spartan text-challenge-light-purple items-center font-bold text-2xl">
                        <span className="font-league-spartan text-challenge-purple-1 font-bold text-2xl">
                          #
                        </span>
                        {portfolio.id}
                      </p>
                      <p className="font-league-spartan font-bold text-challenge-light-purple text-xl">
                        {portfolio.name}
                      </p>
                    </div>
                    <div>
                      <AddBtn
                        addText={"New Investment"}
                        btnFn={openInvestmentModal}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-league-spartan font-medium text-challenge-light-purple text-lg">
                      {portfolio.username}
                    </p>
                    <p className="font-league-spartan font-medium text-challenge-light-purple text-lg">
                      <span className="font-league-spartan font-medium text-challenge-gray-purple">
                        Created at:
                      </span>{" "}
                      {portfolio.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 bg-challenge-dark-1 rounded-md">
                <div className="flex flex-col gap-2">
                  {investments ? (
                    investments &&
                    investments.map((investment, index) => (
                      <div
                        key={index}
                        className="w-full p-4 items-center text-white flex justify-between"
                      >
                        <div className="">
                          <p>
                            {
                              companies.find(
                                (company) => investment.companyId === company.id
                              ).name
                            }
                          </p>
                          <p className="text-challenge-gray-purple font-medium">
                            {" "}
                            Created at: {investment.createdAt.split("T")[0]}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <p className="font-bold self-center text-md md:text-lg font-league-spartan">
                            $ {investment.amount}
                          </p>
                          <TrashIcon
                            onClick={() => deleteInvestment(investment.id)}
                            className="w-6 h-6 hover:text-challenge-red cursor-pointer duration-100"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-ful h-full flex flex-col justify-end items-center flex-1 p-12">
                      <p className="font-league-spartan text-white font-bold text-xl">
                        No investments yet
                      </p>
                      <p className="font-league-spartan text-white text-lg flex gap-1">
                        How about you{" "}
                        <p
                          onClick={() => openInvestmentModal()}
                          className="text-challenge-purple-1 cursor-pointer hover:underline"
                        >
                          {` invest some money?`}
                        </p>
                      </p>
                    </div>
                  )}
                </div>
                <div className="bg-black p-4 mt-6 flex items-center justify-evenly rounded-b-md">
                  <div className="w-full flex justify-between p-4 items-center">
                    <p className="text-white font-league-spartan font-semibold text-2xl">
                      Total{" "}
                    </p>
                    <p className="font-league-spartan text-4xl text-white font-bold">
                      $ {investments ? sumInvestmentAmount(investments) : "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <AddInvestmentModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col h-full justify-between">
          <h2 className="text-xl font-league-spartan font-semibold text-white mb-4">
            Create New Investment
          </h2>
          <form className="flex-grow">
            <div className="mb-4 flex flex-col gap-4">
              <label
                className="block text-md font-bold text-white font-league-spartan"
                htmlFor="portfolioName"
              >
                Company
              </label>
              <Select
                classNamePrefix="react-select"
                options={
                  companies &&
                  companies.map((company) => ({
                    label: company.name,
                    value: company.id,
                  }))
                }
                placeholder="Select company"
                isClearable
                onChange={setSelectedCompany}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#252945",
                    borderColor: "#2c2c2c",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "#4f46e5",
                    },
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "white",
                    fontWeight: "bold",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#a0aec0",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#252945",
                  }),
                  menuList: (base) => ({
                    ...base,
                    backgroundColor: "#252945",
                  }),
                  option: (base, { isFocused, isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected
                      ? "#4f46e5"
                      : isFocused
                      ? "#2d3748"
                      : "#252945",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#9277FF",
                    },
                  }),
                }}
              />
              <label
                className="block text-md font-bold text-white font-league-spartan"
                htmlFor="investmentAmount"
              >
                Investment Amount
              </label>
              <NumericFormat
                className="form-input text-white bg-challenge-dark-2 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="investmentAmount"
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                placeholder="Enter amount"
                value={investmentAmount}
                onValueChange={(values) => setInvestmentAmount(values.value)}
              />
            </div>
          </form>
          <div className="flex justify-center gap-4 mb-12">
            <AcceptBtn btnText={"Add Investment"} btnFn={addNewInvestment} />
            <CancelBtn btnText={"Discard"} btnFn={closeModal} />
          </div>
        </div>
      </AddInvestmentModal>
      <EditModal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <div className="flex flex-col h-full justify-between">
          <h2 className="text-xl font-league-spartan font-semibold text-white mb-4">
            Edit Portfolio
          </h2>
          <div>
            <label
              className="block text-md font-bold text-white font-league-spartan"
              htmlFor="portfolioName"
            >
              Portfolio Name
            </label>
            <input
              className="form-input text-white bg-challenge-dark-2 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              value={updatePortfolioName.name}
              onChange={handlePortfolioNameChange}
            />
          </div>
          <div className="flex justify-center gap-2">
            <AcceptBtn btnText={"Update Portfolio"} btnFn={editPortfolio} />
            <CancelBtn btnText={"Discard"} btnFn={closeEditModal} />
          </div>
        </div>
      </EditModal>
      {isTooltipVisible && <Tooltip message={tooltipMessage} />}
    </div>
  );
}

export default PortfolioDetails;
