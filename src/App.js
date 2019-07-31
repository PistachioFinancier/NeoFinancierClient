import React from "react";
import "antd/dist/antd.css";
import InterestDifferential from "./Components/InterestDifferential";
import ABLoanRate from "./Components/ABLoanRate";
import PaymentAndAmortizationSchedule from "./Components/PaymentAndAmortizationSchedule";
import MaximumLoan from "./Components/MaximumLoan";
import EarlyRefinanceBenefit from "./Components/EarlyRefinanceBenefit";
import EffectiveRate from "./Components/EffectiveRate";
import LoanMarkToMarket from "./Components/LoanMarkToMarket";
import PrePaymentPenalty from "./Components/PrePaymentPenalty";

function App() {
  return (
    <div className="App">
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

export default App;
