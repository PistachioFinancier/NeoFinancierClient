import { amortSchedCA } from "./Amort";
import { number } from "prop-types";

// TODO: Check this formula
const loanMarkToMarket = (
  markToMarketDate,
  loanAmount,
  term,
  amortization,
  interestRate,
  startDate,
  newLoanAmountOption,
  newAmortization,
  newInterestRate,
  newAdditionalRefinanceFee
) => {
  const market_Date = new Date(markToMarketDate);
  const start_Date = new Date(startDate);

  let usedBalance;

  const numberOfMonths =
    12 *
      Math.abs(
        market_Date.getFullYear() -
          start_Date.getFullYear() -
          (market_Date.getMonth() < start_Date.getMonth() ? 1 : 0)
      ) +
    ((market_Date.getMonth() - start_Date.getMonth() < 0
      ? market_Date.getMonth() - start_Date.getMonth() + 12
      : market_Date.getMonth() - start_Date.getMonth()) +
      (market_Date.getDate() >= start_Date.getDate() ? 1 : 0));

  const amort = amortSchedCA(
    loanAmount,
    interestRate,
    term * 12,
    amortization * 12
  );

  //console.log(amort);

  const principleBalanceRemaining =
    amort[numberOfMonths]["principal remaining"];

  // For now, the option is either 1 or 2
  if (newLoanAmountOption === 1) {
    usedBalance = loanAmount;
  } else {
    usedBalance = principleBalanceRemaining;
  }

  usedBalance = usedBalance.toFixed(2);

  let expiry_Date = new Date(startDate);
  expiry_Date.setMonth(expiry_Date.getMonth() + 12 * term - 1);

  const remainingTermPayments = term * 12 - numberOfMonths;

  const usedTerm = (remainingTermPayments / 12).toFixed(2);

  /*
  const usedTerm = (
    (30 *
      (12 * Math.abs(expiry_Date.getYear() - market_Date.getYear()) +
        Math.abs(expiry_Date.getMonth() - market_Date.getMonth()) +
        (expiry_Date.getDay() >= market_Date.getDay() ? 1 : 0))) /
    360
  ).toFixed(2);
  */

  const newAmort = amortSchedCA(
    usedBalance,
    newInterestRate,
    remainingTermPayments,
    newAmortization * 12
  );

  //console.log(newAmort);

  const newLoanInterestPaymentsRemaining =
    newAmort[newAmort.length - 1]["accrued interest"];

  const currentLoanInterestPaymentsRemaining =
    amort[amort.length - 1]["accrued interest"] -
    amort[numberOfMonths]["accrued interest"];

  const netAdjustmentToPrice = (
    newLoanInterestPaymentsRemaining +
    usedBalance * (newAdditionalRefinanceFee * 0.01) -
    currentLoanInterestPaymentsRemaining
  ).toFixed(2);

  return {
    usedBalance,
    usedTerm,
    netAdjustmentToPrice
  };
};

export default loanMarkToMarket;
