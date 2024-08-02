const Strings = {};

const InitialState = {
  isModalOpen: false,
  isTooltipVisible: false,
  investments: undefined,
  portfolio: undefined,
  isEditModalOpen: undefined,
  tooltipMessage: undefined,
  companies: undefined,
  investmentAmount: "",
  selectedCompany: null,
  portfolioName: { name: "" },
};

const Setup = {
  Strings,
  InitialState,
};

export default Setup;
