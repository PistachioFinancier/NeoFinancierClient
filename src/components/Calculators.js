import React from "react";
import InterestDifferential from "./calculators/InterestDifferential";
import ABLoanRate from "./calculators/ABLoanRate";
import PaymentAndAmortizationSchedule from "./calculators/PaymentAndAmortizationSchedule";
import MaximumLoan from "./calculators/MaximumLoan";
import EarlyRefinanceBenefit from "./calculators/EarlyRefinanceBenefit";
import EffectiveRate from "./calculators/EffectiveRate";
import LoanMarkToMarket from "./calculators/LoanMarkToMarket";
import PrePaymentPenalty from "./calculators/PrePaymentPenalty";

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
