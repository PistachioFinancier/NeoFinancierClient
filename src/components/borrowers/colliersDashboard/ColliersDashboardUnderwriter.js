import React, { Fragment } from "react";
import { Card, Row, Col } from "antd";

import { amortSchedCA } from "../../../scripts/amortCA";
import addMonths from "date-fns/addMonths";
import startOfMonth from "date-fns/startOfMonth";
import getDaysInMonth from "date-fns/getDaysInMonth";
import endOfMonth from "date-fns/endOfMonth";
import LenderDiversificationChart from "../DashboardCharts/LenderDiversificationChart";
import LoanExpiriesPerYearChart from "../DashboardCharts/LoanExpiriesPerYearChart";

function retrieveAndParseData() {
  const sampleData = [
    {
      id: 433,
      user_id: 1,
      Asset_Owner: "Canada Post",
      Asset_Manager: "Morguard",
      Borrowing_Entity_Registered_on_Title: "123 Main Street Holdco Inc. ",
      Property_Name: "Main Street ",
      Address: "123 Main Street ",
      Postal: "",
      City: "Toronto",
      Province: "ON",
      Country: "ca",
      Purchase_Price: "2000000.00",
      Asset_Type: "Retail",
      Asset_Class: "Class A",
      Size: 17500,
      Lender: "",
      Lender_Classification: "Life Co.",
      Original_Loan_Amount: "2000000.00",
      First_Payment_Date: "January 31 2015",
      Term: 60,
      Amortization: 300,
      Fixed_Variable: "Variable",
      BOC_Prime: "2.75",
      GOC_Prime: "0.25",
      Variable_Spread: "2.50",
      Fixed_Rate: "2.75",
      Pre_Payment_Penalty_Type: "3-Month Interest ",
      Recent_Appraisal_Date: "January 30 2015",
      Recent_Appraisal_Cap_Rate: "6.00",
      Recent_Appraisal_Value: "3340000.00",
      Internal_Valuation_Date: "August 31 2015",
      Internal_Valuation_Cap: "5.75",
      Internal_Valuation_NOI: "200250.00",
      Equity_Surplus_Available_Possible_New_Mortgages: "70.00",
      Acquisition_Development_Date: "October 1 2004",
      Notes: null,
      loaded_from: null,
      stage: "CIM Creation"
    },
    {
      id: 434,
      user_id: 1,
      Asset_Owner: "Hydro Quebec",
      Asset_Manager: "Triovest",
      Borrowing_Entity_Registered_on_Title: "ACI Brandon Dennis Ltd.",
      Property_Name: "Shoppers - Brandon",
      Address: "523 North Korea Avenue, North Korea",
      Postal: "1",
      City: "Brandon",
      Province: "MB",
      Country: "ca",
      Purchase_Price: "10000000.00",
      Asset_Type: "Retail",
      Asset_Class: "Class A",
      Size: 17000,
      Lender: "",
      Lender_Classification: "CMBS / Conduits",
      Original_Loan_Amount: "14000000.00",
      First_Payment_Date: "April 1 2011",
      Term: 120,
      Amortization: 176,
      Fixed_Variable: "Fixed",
      BOC_Prime: "",
      GOC_Prime: "",
      Variable_Spread: null,
      Fixed_Rate: "5.90",
      Pre_Payment_Penalty_Type: "Yield Maintenance ",
      Recent_Appraisal_Date: "April 30 2014",
      Recent_Appraisal_Cap_Rate: "6.00",
      Recent_Appraisal_Value: "26200000.00",
      Internal_Valuation_Date: "July 15 2015",
      Internal_Valuation_Cap: "5.75",
      Internal_Valuation_NOI: "1000000.00",
      Equity_Surplus_Available_Possible_New_Mortgages: "70.00",
      Acquisition_Development_Date: "March 11 2011",
      Notes: null,
      loaded_from: null,
      stage: "Commitment"
    },
    {
      id: 435,
      user_id: 1,
      Asset_Owner: "",
      Asset_Manager: "",
      Borrowing_Entity_Registered_on_Title: "ACI Shoppers Southpark Ltd.",
      Property_Name: "Shoppers - Pembina",
      Address: "55 Address Street",
      Postal: "",
      City: "Pembina",
      Province: "MB",
      Country: "ca",
      Purchase_Price: "0.00",
      Asset_Type: "Retail",
      Asset_Class: "Class A",
      Size: 15780,
      Lender: "Montrose Mortgage Fund",
      Lender_Classification: "CMBS / Conduits",
      Original_Loan_Amount: "2995000.00",
      First_Payment_Date: "may 22 2011",
      Term: 120,
      Amortization: 158,
      Fixed_Variable: "Fixed",
      BOC_Prime: "",
      GOC_Prime: "",
      Variable_Spread: null,
      Fixed_Rate: "6.70",
      Pre_Payment_Penalty_Type: "Yield Maintenance ",
      Recent_Appraisal_Date: "",
      Recent_Appraisal_Cap_Rate: "6.00",
      Recent_Appraisal_Value: "6700000.00",
      Internal_Valuation_Date: "July 15 2015",
      Internal_Valuation_Cap: "6.00",
      Internal_Valuation_NOI: "402000.00",
      Equity_Surplus_Available_Possible_New_Mortgages: "70.00",
      Acquisition_Development_Date: "February 23, 2017",
      Notes: null,
      loaded_from: null,
      stage: "Lead Received"
    }
  ];

  const parsedDataArray = sampleData.map(loan => ({
    principalRemaingAtEndOfTerm:
      amortSchedCA(
        Number(loan.Original_Loan_Amount),
        Number(loan.Fixed_Rate) || Number(loan.Variable_Spread),
        loan.Term,
        loan.Amortization
      )[loan.Term - 1]["principal remaining"] || 0,
    expiryDate: addMonthsCorrectly(
      new Date(loan.First_Payment_Date),
      loan.Term
    ),
    expiryDateString: addMonthsCorrectly(
      new Date(loan.First_Payment_Date),
      loan.Term
    )
      .toISOString()
      .slice(0, 10),
    address: loan.Address,
    lender: loan.Lender,
    loanAmount: Math.round(loan.Original_Loan_Amount),
    interestRate: loan.Fixed_Rate || loan.Variable_Spread,
    LTV:
      Math.round(
        (loan.Original_Loan_Amount / loan.Recent_Appraisal_Value) * 100
      ) / 100,
    DSCR:
      Math.round(
        (loan.Internal_Valuation_NOI / loan.Original_Loan_Amount) * 100
      ) / 100,
    propertyValue: Math.round(loan.Recent_Appraisal_Value),
    amount: loan.Original_Loan_Amount,
    term: loan.Term,
    amortization: loan.Amortization,
    startDate: new Date(loan.First_Payment_Date),
    lenderClassification: loan.Lender_Classification,
    stage: loan.stage
  }));

  return parsedDataArray;
}

const parsedDataArray = retrieveAndParseData();

function addMonthsCorrectly(firstPaymentDate, term) {
  if (
    firstPaymentDate.getDate() >
    getDaysInMonth(addMonths(startOfMonth(firstPaymentDate), term))
  ) {
    return endOfMonth(addMonths(startOfMonth(firstPaymentDate), term));
  } else {
    return addMonths(firstPaymentDate, term);
  }
}

function ColliersDashboardUnderwriter() {
  const cardDetails = {
    "Lead Generators": 2153,
    "Total Transacted": 2356623,
    "Gross Amount": 643,
    "My Amount": 54745
  };

  const cards = [];

  for (let i of Object.keys(cardDetails)) {
    cards.push(
      <Col key={i} span={6}>
        <Card>{i}</Card>
      </Col>
    );
  }

  const progressStages = [
    "Lead Received",
    "CIM Creation",
    "Bidding Process",
    "LOI Stage",
    "Commitment",
    "Funding"
  ];

  const properties = [];

  let x = 0;

  for (let i of parsedDataArray) {
    properties.push(
      <Fragment key={x++}>
        <Row>{i.address}</Row>
        <Row style={{ height: "40px" }}>
          <Col
            style={{
              height: "100%",
              backgroundColor: `${
                progressStages.indexOf(i.stage) >= 0 ? "#475DFE" : ""
              }`
            }}
            span={4}
          ></Col>
          <Col
            style={{
              height: "100%",
              backgroundColor: `${
                progressStages.indexOf(i.stage) >= 1 ? "#475DFE" : ""
              }`
            }}
            span={4}
          ></Col>
          <Col
            style={{
              height: "100%",
              backgroundColor: `${
                progressStages.indexOf(i.stage) >= 2 ? "#475DFE" : ""
              }`
            }}
            span={4}
          ></Col>
          <Col
            style={{
              height: "100%",
              backgroundColor: `${
                progressStages.indexOf(i.stage) >= 3 ? "#475DFE" : ""
              }`
            }}
            span={4}
          ></Col>
          <Col
            style={{
              height: "100%",
              backgroundColor: `${
                progressStages.indexOf(i.stage) >= 4 ? "#475DFE" : ""
              }`
            }}
            span={4}
          ></Col>
          <Col
            style={{
              height: "100%",
              backgroundColor: `${
                progressStages.indexOf(i.stage) >= 5 ? "#475DFE" : ""
              }`
            }}
            span={4}
          ></Col>
        </Row>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Row>{cards}</Row>
      <Row>
        <Col span={12}>
          <LoanExpiriesPerYearChart
            data={parsedDataArray}
          ></LoanExpiriesPerYearChart>
        </Col>
        <Col span={12}>
          <LenderDiversificationChart
            data={parsedDataArray}
          ></LenderDiversificationChart>
        </Col>
        <Row>
          {progressStages.map(stage => {
            return <Col span={4}>{stage}</Col>;
          })}
        </Row>
      </Row>
      {properties}
    </Fragment>
  );
}

export default ColliersDashboardUnderwriter;
