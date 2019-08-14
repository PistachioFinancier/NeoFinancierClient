import React, { Fragment } from "react";
import { Row, Col, Typography } from "antd";
import GeneralInfo from "./GeneralInfo";
import OriginationsGraph from "./OriginationsGraph";
import PortfolioMixGraph from "./PortfolioMixGraph";

function LenderPage() {
  const sampleData = {
    Name: "Test Lender",
    Min: "2.00MM",
    Max: "75.00MM",
    "Typical Fee": "50 bps",
    Syndicate: "Yes",
    "Portfolio Size": "400.00MM",
    "Ab Structure": "No",
    Notes: "Some test notes",
    "Property Types": [
      "Hospitality",
      "Industrial",
      "Mobile Homes",
      "Multifamily",
      "Office",
      "Retail",
      "Retirement Home",
      "Self-Storage",
      "Student Housing"
    ]
  };

  const { Title } = Typography;

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <Title>{sampleData.Name}</Title>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <GeneralInfo lenderInfo={sampleData} />
        </Col>
        <Col span={12}>
          <OriginationsGraph />
          <br />
          <PortfolioMixGraph />
        </Col>
      </Row>
    </Fragment>
  );
}

export default LenderPage;
