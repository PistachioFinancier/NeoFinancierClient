import React, { useState, useEffect } from "react";
import LenderSearch from "./LenderSearch";
import LenderCategories from "./LenderCategories";
import { Col, Row, Input } from "antd";

function LenderList() {
  const sampleData = [
    {
      companyName: "Citibank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Industrial"],
      rating: 4.2
    },
    {
      companyName: "Bank of North Korea",
      category: "Foreign Bank",
      rating: 4.2,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "China Bank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Office"],
      rating: 4.2
    },
    {
      companyName: "HSBC",
      category: "Foreign Bank",
      rating: 3.2,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Conexus",
      category: "Credit Union",
      rating: 2,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "ATB",
      category: "Credit Union",
      rating: 4,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "CIBC",
      category: "Domestic Bank",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "CIBC",
      category: "Domestic Bank",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "CIBC",
      category: "Domestic Bank",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "CIBC",
      category: "Domestic Bank",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "CIBC",
      category: "Domestic Bank",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "CIBC",
      category: "Domestic Bank",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "CIBC",
      category: "Domestic Bank",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "CIBC",
      category: "Domestic Bank",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "CIBC",
      category: "Domestic Bank",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "CIBC",
      category: "Domestic Bank",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "CIBC",
      category: "Domestic Bank",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "CIBC",
      category: "Domestic Bank",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Example",
      category: "Example Category",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Example",
      category: "Example Category",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Example",
      category: "Example Category",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Example",
      category: "Example Category",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Example",
      category: "Example Category",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Example",
      category: "Example Category",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Example",
      category: "Example Category",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Example",
      category: "Example Category",
      rating: 1.5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "BlockBuster",
      category: "Super Companies",
      rating: 5,
      propertyType: ["Office", "Industrial"]
    },
    {
      companyName: "BlockBuster",
      category: "Super Companies",
      rating: 5,
      propertyType: ["Office", "Industrial"]
    },
    {
      companyName: "BlockBuster",
      category: "Super Companies",
      rating: 5,
      propertyType: ["Office", "Industrial"]
    },
    {
      companyName: "BlockBuster",
      category: "Super Companies",
      rating: 5,
      propertyType: ["Office", "Industrial"]
    },
    {
      companyName: "BlockBuster",
      category: "Super Companies",
      rating: 5,
      propertyType: ["Office", "Industrial"]
    },
    {
      companyName: "BlockBuster",
      category: "Super Companies",
      rating: 5,
      propertyType: ["Office", "Industrial"]
    },
    {
      companyName: "BlockBuster",
      category: "Super Companies",
      rating: 5,
      propertyType: ["Office", "Industrial"]
    },
    {
      companyName: "BlockBuster",
      category: "Super Companies",
      rating: 5,
      propertyType: ["Office", "Industrial"]
    },
    {
      companyName: "BlockBuster",
      category: "Super Companies",
      rating: 5,
      propertyType: ["Office", "Industrial"]
    },
    {
      companyName: "BlockBuster",
      category: "Super Companies",
      rating: 5,
      propertyType: ["Office", "Industrial"]
    },
    {
      companyName: "BlockBuster",
      category: "Super Companies",
      rating: 5,
      propertyType: ["Office", "Industrial"]
    },
    {
      companyName: "Rogers",
      category: "Best",
      rating: 5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Rogers",
      category: "Best",
      rating: 5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Rogers",
      category: "Best",
      rating: 5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Rogers",
      category: "Best",
      rating: 5,
      propertyType: ["Retail", "Industrial"]
    },
    {
      companyName: "Brennan",
      category: "Bester",
      rating: 5,
      propertyType: ["Office"]
    },
    {
      companyName: "Brennan",
      category: "Bester",
      rating: 5,
      propertyType: ["Office"]
    },
    {
      companyName: "Brennan",
      category: "Bester",
      rating: 5,
      propertyType: ["Office"]
    },
    {
      companyName: "Brennan",
      category: "Bester",
      rating: 5,
      propertyType: ["Office"]
    },
    {
      companyName: "Brennan",
      category: "Bester",
      rating: 5,
      propertyType: ["Office"]
    },
    {
      companyName: "Brennan",
      category: "Bester",
      rating: 5,
      propertyType: ["Office"]
    },
    {
      companyName: "Brennan",
      category: "Bester",
      rating: 5,
      propertyType: ["Office"]
    },
    {
      companyName: "Brennan",
      category: "Bester",
      rating: 5,
      propertyType: ["Office"]
    },
    {
      companyName: "Brennan",
      category: "Bester",
      rating: 5,
      propertyType: ["Office"]
    }
  ];

  const sampleLenderCategories = [
    "Foreign Bank",
    "Credit Union",
    "Domestic Bank",
    "Example Category",
    "Super Companies",
    "Best",
    "Bester"
  ];

  const [data, setData] = useState(sampleData);

  const [selectedPropertyType, setSelectedPropertyType] = useState();

  const handleFilterByName = e => {
    setData(
      sampleData.filter(x =>
        x.companyName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    console.log(
      sampleData.filter(x => x.propertyType.includes(selectedPropertyType))
    );
  }, [selectedPropertyType]);

  const handleFilterByPropertyType = () => {
    console.log(selectedPropertyType);
    // console.log(
    //   sampleData.filter(x => x.propertyType.includes(selectedPropertyType))
    // );
    // setData(
    //   sampleData.filter(x => x.propertyType.includes(selectedPropertyType))
    // );
  };

  return (
    <React.Fragment>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <LenderSearch
            setSelectedPropertyType={setSelectedPropertyType}
          ></LenderSearch>
        </Col>
        <Col span={4}></Col>
      </Row>
      <Row>
        <Col span={20}></Col>
        <Col span={3}>
          <Input onChange={handleFilterByName} placeholder="Filter by Name" />
        </Col>
        <Col span={3}></Col>
      </Row>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <LenderCategories
            lenders={data}
            categories={sampleLenderCategories}
          ></LenderCategories>
        </Col>
        <Col span={2}></Col>
      </Row>
    </React.Fragment>
  );
}

export default LenderList;
