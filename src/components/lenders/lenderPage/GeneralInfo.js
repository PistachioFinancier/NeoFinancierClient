import React, { Fragment } from "react";
import { Row, Col, Typography } from "antd";
import Card from "../../styledComponents/Card";

function GeneralInfo(props) {
  const { Text } = Typography;

  const rowInfo = [
    "Min",
    "Max",
    "Typical Fee",
    "Syndicate",
    "Portfolio Size",
    "Ab Structure"
  ];

  return (
    <div style={{ padding: "30px" }}>
      <Row gutter={16}>
        {rowInfo.map(key => (
          <Col span={4}>
            <Card>
              <Text strong>{key}</Text>
              <br />
              <Text>{props.lenderInfo[key]}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default GeneralInfo;
