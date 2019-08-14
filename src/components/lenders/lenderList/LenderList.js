import React from "react";
import LenderSearch from "./LenderSearch";
import LenderCategories from "./LenderCategories";

function LenderList() {
  const sampleData = [
    { companyName: "Citibank", category: "Foreign Bank", rating: 4.2 },
    {
      companyName: "Bank of North Korea",
      category: "Foreign Bank",
      rating: 4.2
    },
    { companyName: "China Bank", category: "Foreign Bank", rating: 4.2 },
    { companyName: "HSBC", category: "Foreign Bank", rating: 3.2 },
    { companyName: "Conexus", category: "Credit Union", rating: 2 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "ATB", category: "Credit Union", rating: 4 },
    { companyName: "CIBC", category: "Domestic Bank", rating: 1.5 }
  ];

  const sampleLenderCategories = [
    "Foreign Bank",
    "Credit Union",
    "Domestic Bank"
  ];

  return (
    <React.Fragment>
      <LenderSearch></LenderSearch>
      <LenderCategories
        lenders={sampleData}
        categories={sampleLenderCategories}
      ></LenderCategories>
    </React.Fragment>
  );
}

export default LenderList;
