import React from "react";
import Card from "../../styledComponents/Card";
import { Row, Col } from "antd";

function DealDetailsBar(props) {
  return (
    <Card bar="true">
      <Row>
        <Col span={10}></Col>
        <Col span={4}>
          <Card dealdetail="true">Loan Amount</Card>
        </Col>
        <Col span={4}>
          <Card dealdetail="true">Property Type</Card>
        </Col>
        <Col span={4}>
          <Card dealdetail="true">Loan Period</Card>
        </Col>
      </Row>
    </Card>
  );
}

export default DealDetailsBar;
