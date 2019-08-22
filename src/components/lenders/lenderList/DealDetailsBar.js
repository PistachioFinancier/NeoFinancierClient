import React from "react";
import Card from "../../styledComponents/Card";
import { Row, Col } from "antd";
import DealDetailCard from "./DealDetailCard";

function DealDetailsBar() {
  const sampleData = [
    { category: "Loan Amount", value: "$20,000,000" },
    { category: "Property Type", value: "Office" },
    { category: "Loan Period", value: "5 yr" },
    { category: "Example", value: "Whatever" },
    { category: "Loan Amount", value: "$20,000,000" },
    { category: "Property Type", value: "Office" },
    { category: "Loan Period", value: "5 yr" },
    { category: "Example", value: "Whatever" },
    { category: "Loan Amount", value: "$20,000,000" },
    { category: "Property Type", value: "Office" },
    { category: "Loan Period", value: "5 yr" },
    { category: "Example", value: "Whatever" },
    { category: "Loan Amount", value: "$20,000,000" },
    { category: "Property Type", value: "Office" },
    { category: "Loan Period", value: "5 yr" },
    { category: "Example", value: "Whatever" }
  ];

  const dataTopRow = [];
  const dataBottomRow = [];

  for (let i = 0; i < 8; i++) {
    dataTopRow.push(
      <Col span={2} key={i}>
        <DealDetailCard
          category={sampleData[i].category}
          value={sampleData[i].value}
        ></DealDetailCard>
      </Col>
    );
  }

  for (let i = 8; i < 15; i++) {
    dataBottomRow.push(
      <Col span={2} key={i}>
        <DealDetailCard
          category={sampleData[i].category}
          value={sampleData[i].value}
        ></DealDetailCard>
      </Col>
    );
  }

  return (
    <Card bar="true">
      <Row gutter={40}>
        <Col span={7}></Col>
        {dataTopRow}
      </Row>
      <Row style={{ height: "8px" }}></Row>
      <Row gutter={40}>
        <Col span={7}></Col>
        {dataBottomRow}
      </Row>
    </Card>
  );
}

export default DealDetailsBar;
