import React, { Fragment } from "react";
import { Row, Col, Typography, Select, Table, Card } from "antd";
import GeneralInfo from "./GeneralInfo";
import OriginationsGraph from "./OriginationsGraph";
import PortfolioMixGraph from "./PortfolioMixGraph";
import LenderMap from "./LenderMap";
import im from "../../../assets/logo.png";
import ProceedButton from "./ProceedButton";

function LenderPage() {
  const sampleData = {
    Name: "Test Lender",
    Category: "Foreign Bank",
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
    ],
    provinces: ["AB", "ON", "QC", "NL"],
    pricingModel: {
      term: {
        LTV: 75,
        index: "Prime",
        lowSpread: 150,
        highSpread: 240,
        nonRecourse: "Yes"
      },
      construction: {
        LTV: 75,
        index: "BOC",
        lowSpread: 120,
        highSpread: 290,
        nonRecourse: "Partial"
      },
      cmhc: {
        LTV: 70,
        index: "Prime",
        lowSpread: 180,
        highSpread: 240,
        nonRecourse: "No"
      },
      bridge: []
    },
    contacts: [
      {
        firstName: "Mary",
        lastName: "Shelley",
        phone: "(416) 652-6782",
        email: "mary@hsbc.ca",
        markets: ["ON", "BC"],
        notes: "Direct Contact"
      },
      {
        firstName: "John",
        lastName: "Mark",
        phone: "(416) 882-3105",
        email: "johnm@hsbc.ca",
        markets: ["ON", "NL"],
        notes: "Never Picks Up Calls, Major Douche"
      }
    ]
  };

  const { Text } = Typography;
  const { Title } = Typography;
  const { Meta } = Card;

  const pricingData = [
    { ...sampleData.pricingModel.construction, type: "Construction" },
    { ...sampleData.pricingModel.term, type: "Term" },
    { ...sampleData.pricingModel.bridge, type: "Bridge" },
    { ...sampleData.pricingModel.cmhc, type: "CMHC" }
  ];

  const pricingColumns = [
    {
      title: "",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "LTV",
      dataIndex: "LTV",
      key: "LTV"
    },
    {
      title: "Index",
      dataIndex: "index",
      key: "index"
    },
    {
      title: "Spread (Low)",
      dataIndex: "lowSpread",
      key: "lowSpread"
    },
    {
      title: "Spread (High)",
      dataIndex: "highSpread",
      key: "highSpread"
    },
    {
      title: "Non-Recourse",
      dataIndex: "nonRecourse",
      key: "nonRecourse"
    }
  ];

  const contactColumns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName"
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName"
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Markets",
      dataIndex: "markets",
      key: "markets"
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes"
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    type: "radio"
  };

  return (
    <Fragment>
      <div style={{ "background-color": "lightgrey" }}>
        <Row
          gutter={16}
          type="flex"
          justify="start"
          align="middle"
          style={{ margin: "30px" }}
        >
          <Col span={4}>
            <Card cover={<img alt="Lender Logo" src={im} />}>
              <Meta title={sampleData.Name} description={sampleData.Category} />
            </Card>
          </Col>
          <Col span={4}>
            <Card
              style={{ width: 120 }}
              cover={<img alt="Lender Logo" src={im} />}
            >
              <Meta title="78" description="Lender Rating" />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <GeneralInfo lenderInfo={sampleData} />
          </Col>
        </Row>
        <Row gutter={16} style={{ margin: "30px" }}>
          <Col span={3}>
            <Text> Property Types: </Text>
          </Col>
          <Col span={12}>
            <Select mode="tags" defaultValue={sampleData["Property Types"]}>
              {/*sampleData["Property Types"].map(prop => <Option key = {prop}>{prop}</Option>)*/}
            </Select>
          </Col>
        </Row>
      </div>
      <Row
        style={{
          "padding-top": "30px",
          "padding-bottom": "30px",
          "padding-left": "30px"
        }}
      >
        <Col span={12}>
          <OriginationsGraph />
        </Col>
        <Col span={12}>
          <PortfolioMixGraph />
        </Col>
      </Row>
      <Row type="flex" justify="center" align="middle">
        <Col span={24} style={{ "padding-bottom": "400px" }}>
          <LenderMap provinces={sampleData.provinces}></LenderMap>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table dataSource={pricingData} columns={pricingColumns} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            rowSelection={rowSelection}
            columns={contactColumns}
            dataSource={sampleData.contacts}
          />
          ,
        </Col>
      </Row>
      <ProceedButton />
    </Fragment>
  );
}

export default LenderPage;
