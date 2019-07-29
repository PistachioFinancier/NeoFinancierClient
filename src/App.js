import React from "react";
import "antd/dist/antd.css";
import InterestDifferential from "./Components/InterestDifferential";
import ABLoanRate from "./Components/ABLoanRate";
import PaymentAndAmortizationSchedule from "./Components/PaymentAndAmortizationSchedule";

function App() {
  return (
    <div className="App">
      <InterestDifferential />
      <ABLoanRate />
      <PaymentAndAmortizationSchedule />
    </div>
  );
}

export default App;
