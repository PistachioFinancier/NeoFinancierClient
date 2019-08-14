import React, { Fragment } from "react";
import { Row, Col, Card, Typography } from "antd";

function GeneralInfo(props) {
  const { Text } = Typography;

  return (
    <div style={{ padding: "30px" }}>
      <Card title="General Information" style={{ width: 300 }}>
        <Row>
          <Col span={12}>
            <Text strong>Min</Text>
          </Col>
          <Col span={12}>
            <Text>{props.lenderInfo.Min}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text strong>Max</Text>
          </Col>
          <Col span={12}>
            <Text>{props.lenderInfo.Max}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text strong>Typical Fee</Text>
          </Col>
          <Col span={12}>
            <Text>{props.lenderInfo["Typical Fee"]}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text strong>Syndicate</Text>
          </Col>
          <Col span={12}>
            <Text>{props.lenderInfo.Syndicate}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text strong>Portfolio Size</Text>
          </Col>
          <Col span={12}>
            <Text>{props.lenderInfo["Portfolio Size"]}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text strong>Ab Structure</Text>
          </Col>
          <Col span={12}>
            <Text>{props.lenderInfo["Ab Structure"]}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text strong>Notes</Text>
          </Col>
          <Col span={12}>
            <Text>{props.lenderInfo.Notes}</Text>
          </Col>
        </Row>
        {props.lenderInfo["Property Types"] ? (
          <Row>
            <Col>
              <Text strong>Property Types</Text>
            </Col>
            <Col>
              {props.lenderInfo["Property Types"].map(propertyType => (
                <Fragment>
                  <Text>{propertyType}</Text>
                  <br />
                </Fragment>
              ))}
            </Col>
          </Row>
        ) : null}
      </Card>
    </div>
  );
}

export default GeneralInfo;
