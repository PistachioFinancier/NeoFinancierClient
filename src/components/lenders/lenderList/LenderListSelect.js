import React, { useState } from "react";
import LenderSearch from "./LenderSearch";
import LenderCategories from "./LenderCategories";
import DealDetailsBar from "./DealDetailsBar";
import { Col, Row, Button, Typography } from "antd";
import { usePreventInitialUseEffect } from "../../../scripts/hooks/usePreventInitialUseEffect";

import Input from "../../styledComponents/Input";

function LenderListSelect() {
  const sampleData = [
    {
      companyName: "Citibank",
      category: "Foreign Bank",
      propertyType: ["Retail", "Industrial", "Office"],
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

  const { Title } = Typography;

  const [data, setData] = useState(sampleData);
  const [selectedPropertyType, setSelectedPropertyType] = useState();
  const [selectedMarkets, setSelectedMarkets] = useState();
  const [selectedTerritories, setSelectedTerritories] = useState();
  const [selectedProductType, setSelectedProductType] = useState();

  // filtering functions
  // "match all" function (as opposed to "match any"). Returns true if every element in the subset array is inlcuded in the superset array
  function arrayContainsArray(superset, subset) {
    if (0 === subset.length) {
      return false;
    }
    return subset.every(function(value) {
      return superset.indexOf(value) >= 0;
    });
  }

  const handleFilterByPropertyType = () => {
    if (selectedPropertyType.length === 0) {
      setData(sampleData);
    } else {
      setData(
        sampleData.filter(x =>
          arrayContainsArray(x.propertyType, selectedPropertyType)
        )
      );
    }
  };

  const handleFilterByMarkets = () => {
    if (selectedMarkets.length === 0) {
      setData(sampleData);
    } else {
      setData(
        sampleData.filter(x =>
          arrayContainsArray(x.propertyType, selectedMarkets)
        )
      );
    }
  };

  const handleFilterByTerritories = () => {
    if (selectedTerritories.length === 0) {
      setData(sampleData);
    } else {
      setData(
        sampleData.filter(x =>
          arrayContainsArray(x.propertyType, selectedTerritories)
        )
      );
    }
  };

  const handleFilterByProductType = () => {
    if (selectedProductType.length === 0) {
      setData(sampleData);
    } else {
      setData(
        sampleData.filter(x =>
          arrayContainsArray(x.propertyType, selectedProductType)
        )
      );
    }
  };

  const handleFilterByName = e => {
    setData(
      sampleData.filter(x =>
        x.companyName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  // useEffects for filtering
  usePreventInitialUseEffect(handleFilterByPropertyType, [
    selectedPropertyType
  ]);
  usePreventInitialUseEffect(handleFilterByMarkets, [selectedMarkets]);
  usePreventInitialUseEffect(handleFilterByTerritories, [selectedTerritories]);
  usePreventInitialUseEffect(handleFilterByProductType, [selectedProductType]);

  return (
    <React.Fragment>
      <Row>
        <Title level={3}>Pick Lenders</Title>
      </Row>
      <Row
        style={{
          backgroundColor: "rgba(0,0,0,0.06)",
          boxShadow: "0 2px 9px 0 rgba(35,82,124,0.16)",
          paddingTop: "50px",
          height: "275px"
        }}
      >
        <Col span={4}></Col>
        <Col span={16}>
          <LenderSearch
            setSelectedPropertyType={setSelectedPropertyType}
            setSelectedMarkets={setSelectedMarkets}
            setSelectedTerritories={setSelectedTerritories}
            setSelectedProductType={setSelectedProductType}
          ></LenderSearch>
        </Col>
        <Col span={4}></Col>
      </Row>
      <Row style={{ margin: "50px 0" }}>
        <Col span={4}></Col>
        <Col span={16}>
          <DealDetailsBar></DealDetailsBar>
        </Col>
        <Col span={4}></Col>
      </Row>
      <Row>
        <Col span={3}></Col>
        <Col span={15}></Col>
        <Col span={3}>
          <Input onChange={handleFilterByName} placeholder="Filter by Name" />
        </Col>
        <Col span={3}></Col>
      </Row>
      <Row style={{ paddingBottom: "100px" }}>
        <Col span={3}></Col>
        <Col span={18}>
          <LenderCategories
            lenders={data}
            categories={sampleLenderCategories}
            selectable={true}
          ></LenderCategories>
        </Col>
        <Col span={3}></Col>
      </Row>
      <Row style={{ height: "200px" }}>
        <Col span={3}></Col>
        <Col span={18} style={{ borderTop: "2px solid #E8E9F1" }}>
          <Row gutter={40} style={{ paddingTop: "30px" }}>
            <Col span={18}></Col>
            <Col span={3}>
              <Button
                style={{
                  width: "100%",
                  color: "#970000",
                  backgroundColor: "#E0E0E0"
                }}
              >
                Unselect All
              </Button>
            </Col>
            <Col span={3}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "#5e77ff",
                  color: "white"
                }}
              >
                Proceed
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={3}></Col>
      </Row>
    </React.Fragment>
  );
}

export default LenderListSelect;
