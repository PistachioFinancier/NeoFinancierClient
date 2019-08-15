import React, { Fragment } from "react";
import { Row, Col, Typography, Select, Table} from "antd";
import GeneralInfo from "./GeneralInfo";
import OriginationsGraph from "./OriginationsGraph";
import PortfolioMixGraph from "./PortfolioMixGraph";
import LenderMap from "./LenderMap"

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
    ],
    provinces:[
      "AB",
      "ON",
      "QC",
      "NL"
    ],
    pricingModel: {
      term:{
        LTV:75,
        index:"Prime",
        lowSpread: 150,
        highSpread: 240,
        nonRecourse: "Yes"
        },
      construction:{
        LTV:75,
        index:"BOC",
        lowSpread: 120,
        highSpread: 290,
        nonRecourse: "Partial"
        },
      cmhc:{
        LTV:70,
        index:"Prime",
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
        markets: ["ON","BC"], 
        notes: "Direct Contact"
      },
      {
        firstName: "John", 
        lastName: "Mark",
        phone: "(416) 882-3105",
        email: "johnm@hsbc.ca", 
        markets: ["ON","NL"], 
        notes: "Never Picks Up Calls, Major Douche"
      },
    ]


  };

  const { Title } = Typography;
  const { Option } = Select;
  const {Text} = Typography
  const { Column, ColumnGroup } = Table;

  const pricingData = [
    {...sampleData.pricingModel.construction, type:"Construction"},
    {...sampleData.pricingModel.term, type:"Term"},
    {...sampleData.pricingModel.bridge, type: "Bridge"},
    {...sampleData.pricingModel.cmhc, type:"CMHC"}
  ];

  const pricingColumns = [
    {
      title: '',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'LTV',
      dataIndex: 'LTV',
      key: 'LTV',
    },
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Spread (Low)',
      dataIndex: 'lowSpread',
      key: 'lowSpread',
    },
    {
      title: 'Spread (High)',
      dataIndex: 'highSpread',
      key: 'highSpread',
    },
    {
      title: 'Non-Recourse',
      dataIndex: 'nonRecourse',
      key: 'nonRecourse',
    },
  ];


  const contactColumns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Markets',
      dataIndex: 'markets',
      key: 'markets',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    type: "radio"
  }


  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <Title>{sampleData.Name}</Title>
        </Col>
      </Row>
      <Row>
        <Col >
          <GeneralInfo lenderInfo={sampleData} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={3}>
          <Text> Property Types: </Text>
        </Col>
        <Col span={12}>
          <Select mode="tags" defaultValue={sampleData["Property Types"]}>
            {/*sampleData["Property Types"].map(prop => <Option key = {prop}>{prop}</Option>)*/}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <OriginationsGraph />
        </Col>
        <Col span={12}>
          <PortfolioMixGraph />
        </Col>
      </Row>
      <Row>
        <LenderMap provinces={sampleData.provinces} ></LenderMap>
      </Row>
      <Row>
        <Table dataSource={pricingData} columns={pricingColumns}> 
        </Table>
      </Row>
      <Row>
        <Table rowSelection={rowSelection} columns={contactColumns} dataSource={sampleData.contacts} />,
      </Row>
    </Fragment>
  );
}

export default LenderPage;
