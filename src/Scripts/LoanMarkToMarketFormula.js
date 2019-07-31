import { amortSchedCA } from "./Amort";

// TODO: Finish this function
const loanMarkToMarket = (
  markToMarketDate,
  loanAmount,
  term,
  amortization,
  interestRate,
  startDate,
  newLoanAmountOption
) => {
  const market_Date = new Date(markToMarketDate);
  const start_Date = new Date(startDate);

  let numberOfMonths =
    Math.abs(market_Date.getMonth() - start_Date.getMonth()) +
    (market_Date.getDay() >= startDate.getDay() ? 1 : 0);

  const amort = amortSchedCA(loanAmount, interestRate, term, amortization);

  const principleBalanceRemaining =
    amort[numberOfMonths]["principal remaining"];

  // For now, the option is either 1 or 2
  if (newLoanAmountOption == 1) {
    const usedBalance = loanAmount;
  } else {
    const usedBalance = principleBalanceRemaining;
  }

  const usedTerm = term;
};
