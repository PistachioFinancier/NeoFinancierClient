import React, { Fragment } from "react";
import { Row, Col, Card, Typography } from "antd";

function GeneralInfo(props) {
  const { Text } = Typography;

  return (
    <div style={{ padding: "30px" }}>
      <Row gutter={16}>
        <Col span={4}>
          <Card>
            <Col>
              <Text strong>Min</Text>
            </Col>
            <Col>
              <Text>{props.lenderInfo.Min}</Text>
            </Col>
          </Card>
        </Col>

        <Col span={4}>
          <Card>
            <Col>
              <Text strong>Max</Text>
            </Col>
            <Col>
              <Text>{props.lenderInfo.Max}</Text>
            </Col>
          </Card>
        </Col>

        <Col span={4}>
          <Card>
            <Col>
              <Text strong>Typical Fee</Text>
            </Col>
            <Col>
              <Text>{props.lenderInfo["Typical Fee"]}</Text>
            </Col>
          </Card>
        </Col>

        <Col span={4}>
          <Card>
            <Col>
              <Text strong>Syndicate</Text>
            </Col>
            <Col>
              <Text>{props.lenderInfo.Syndicate}</Text>
            </Col>
          </Card>
        </Col>

        <Col span={4}>
          <Card>
            <Col>
              <Text strong>Portfolio Size</Text>
            </Col>
            <Col>
              <Text>{props.lenderInfo["Portfolio Size"]}</Text>
            </Col>
          </Card>
        </Col>

        <Col span={4}>
          <Card>
            <Col>
              <Text strong>Ab Structure</Text>
            </Col>
            <Col>
              <Text>{props.lenderInfo["Ab Structure"]}</Text>
            </Col>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default GeneralInfo;
