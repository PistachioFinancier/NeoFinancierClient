import React from "react";
import InterestDifferential from "./InterestDifferential";
import ABLoanRate from "./ABLoanRate";
import PaymentAndAmortizationSchedule from "./PaymentAndAmortizationSchedule";
import MaximumLoan from "./MaximumLoan";
import EarlyRefinanceBenefit from "./EarlyRefinanceBenefit";
import EffectiveRate from "./EffectiveRate";
import LoanMarkToMarket from "./LoanMarkToMarket";
import PrePaymentPenalty from "./PrePaymentPenalty";

function Calculators() {
  return (
    <div>
      <InterestDifferential />
      <ABLoanRate />
      <PaymentAndAmortizationSchedule />
      <MaximumLoan />
      <EarlyRefinanceBenefit />
      <EffectiveRate />
      <LoanMarkToMarket />
      <PrePaymentPenalty />
    </div>
  );
}

export default Calculators;
