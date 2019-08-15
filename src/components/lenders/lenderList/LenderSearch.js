import React, { Fragment } from "react";
import { Form, Row, Col, Select, Typography } from "antd";

function LenderSearch(props) {
  const { getFieldDecorator } = props.form;
  const { Option } = Select;
  const { Title } = Typography;

  // territories selector
  const provinces = [
    "NL",
    "PE",
    "NS",
    "NB",
    "QC",
    "ON",
    "MB",
    "SK",
    "AB",
    "BC"
  ];

  const provinceOptions = [];

  for (let i of provinces) {
    provinceOptions.push(<Option key={i}>{i}</Option>);
  }

  function handleChangeTerritories(value) {
    console.log(`selected ${value}`);
  }

  // property types selector
  const propertyTypes = ["Retail", "Industrial", "Office"];

  const propertyTypeOptions = [];

  for (let i of propertyTypes) {
    propertyTypeOptions.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }

  function handleChangePropertyType(e) {
    props.setSelectedPropertyType(e);
  }

  // markets selector
  const marketTypes = [
    "Primary (>100k population )",
    "Secondary (>25k)",
    "Tertiary (<25k)"
  ];

  const marketTypeOptions = [];

  for (let i of marketTypes) {
    marketTypeOptions.push(<Option key={i}>{i}</Option>);
  }

  function handleChangeMarkets(value) {
    console.log(`selected ${value}`);
  }

  return (
    <Fragment>
      <Title level={2}>Filter</Title>
      <Form>
        <Row>
          <Col span={6}>
            <Form.Item label="Property Type(s)">
              {getFieldDecorator("lenderName")(
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  onChange={handleChangePropertyType}
                >
                  {propertyTypeOptions}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Markets">
              {getFieldDecorator("markets")(
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  onChange={handleChangeMarkets}
                >
                  {marketTypeOptions}
                </Select>
              )}
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item label="Territories">
              {getFieldDecorator("territories")(
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  onChange={handleChangeTerritories}
                >
                  {provinceOptions}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
}

const WrappedLenderSearch = Form.create({ name: "lenderSearch" })(LenderSearch);

export default WrappedLenderSearch;
