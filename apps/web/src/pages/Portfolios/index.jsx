import React, { useEffect, useState } from "react";
import {
  AddBtn,
  AddPortfolioDrawer,
  AcceptBtn,
  PortfolioCard,
  CancelBtn,
} from "../../components/Molecules/";
import EmptyLottieAnim from "../../components/Atoms/EmptyLottieAnim";
import { Tooltip } from "../../components/Atoms";
import Setup from "./config";
import { MyNavbar } from "../../components/Organisms/";
import PortfolioApi from "../../services/portfolios";
import LocalStorage from "../../storage";

const { InitialState } = Setup;

function Portfolios() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(InitialState.isDrawerOpen);
  const [isTooltipVisible, setIsTooltipVisible] = useState(
    InitialState.isTooltipVisible
  );
  const [portfolios, setPortfolios] = useState(InitialState.portfolios);
  const [userId, setUserId] = useState(InitialState.userId);
  const [newPortfolio, setNewPortfolio] = useState(InitialState.newPortfolio);
  const [isNameValid, setIsNameValid] = useState(true);

  useEffect(() => {
    const uid = LocalStorage.getStorageData("userUid");
    if (uid) {
      setUserId(uid);
      fetchUserPortfolios(uid);
    }
  }, []);

  function openPortfolioDrawer() {
    setIsDrawerOpen(true);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNewPortfolio((prevPortfolio) => ({
      ...prevPortfolio,
      [name]: value,
    }));
    setIsNameValid(value.trim() !== "");
  }

  async function addNewPortfolio() {
    try {
      const response = await PortfolioApi.createNewPortfolio(
        userId,
        newPortfolio
      );
      if (response) {
        fetchUserPortfolios(userId);
        closeDrawer();
        showTooltip();
        setNewPortfolio(InitialState.newPortfolio);
      }
    } catch (error) {
      console.error("Error adding new portfolio:", error);
    }
  }

  function showTooltip() {
    setIsTooltipVisible(true);
    setTimeout(() => {
      setIsTooltipVisible(false);
    }, 3000);
  }

  async function fetchUserPortfolios(uid) {
    try {
      const response = await PortfolioApi.getUserPortfolios(uid);
      if (response && response.data) {
        setPortfolios(response.data);
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  }

  return (
    <div className="bg-challenge-dark-3 flex flex-col min-h-screen">
      <MyNavbar />
      <main className="mt-8 px-6 flex flex-col flex-1 h-full animate-fadeIn">
        <div className="flex justify-between items-center w-full mt-4 max-w-screen-xl mx-auto text-white md:gap-80">
          <div className="w-1/2">
            <p className="text-white font-league-spartan text-2xl md:text-4xl font-semibold">
              Portfolios
            </p>
            <p className="text-challenge-light-purple font-league-spartan text-sm md:text-lg">
              {!portfolios || portfolios.length === 0
                ? "No Portfolios."
                : `You have ${portfolios.length} Portfolios.`}
            </p>
          </div>
          <div>
            <AddBtn addText={"New Portfolio"} btnFn={openPortfolioDrawer} />
          </div>
        </div>
        {(!portfolios || portfolios.length === 0) && (
          <div className="animate-fadeIn gap-12 flex flex-col justify-center items-center flex-1 my-4 mx-auto w-full max-w-screen-xl">
            <EmptyLottieAnim />
            <div className="flex flex-col justify-center items-center">
              <h2 className="font-league-spartan font-bold text-xl md:text-2xl text-white">
                There is nothing here.
              </h2>
              <p className="font-league-spartan text-white text-lg">
                How about you{" "}
                <span
                  onClick={() => openPortfolioDrawer()}
                  className="text-challenge-purple-1 cursor-pointer"
                >
                  create a new Portfolio?
                </span>
              </p>
            </div>
          </div>
        )}
        {portfolios && portfolios.length > 0 && (
          <div className="animate-fadeIn gap-4 flex flex-col justify-start items-center flex-1 mb-4 mt-6 mx-auto w-full max-w-screen-xl">
            {portfolios.map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
          </div>
        )}
      </main>
      <AddPortfolioDrawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <div className="flex flex-col h-full justify-between">
          <h2 className="text-xl font-league-spartan font-semibold text-white mb-4">
            Create New Portfolio
          </h2>
          <form className="flex-grow">
            <div className="mb-4 flex flex-col gap-2">
              <label
                className="block text-md font-bold mb-2 text-white font-league-spartan"
                htmlFor="portfolioName"
              >
                Portfolio Name
              </label>
              <input
                className="text-white bg-challenge-dark-2 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder:font-league-spartan"
                type="text"
                id="portfolioName"
                name="name"
                placeholder="Enter portfolio name"
                value={newPortfolio.name}
                onChange={handleChange}
              />
              {!isNameValid && (
                <p className="text-red-500 text-sm font-league-spartan">
                  Name cannot be empty.
                </p>
              )}
            </div>
          </form>
          <div className="flex justify-center gap-4 mb-12">
            <AcceptBtn
              btnText={"Save Portfolio"}
              btnFn={addNewPortfolio}
              disabled={!isNameValid}
            />
            <CancelBtn btnText={"Cancel"} btnFn={closeDrawer} />
          </div>
        </div>
      </AddPortfolioDrawer>
      {isTooltipVisible && <Tooltip message="New Portfolio Added" />}
    </div>
  );
}

export default Portfolios;
