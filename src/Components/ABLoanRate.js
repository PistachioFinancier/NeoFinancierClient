import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";
import validation from "../Scripts/validation";

function ABLoanRate(props) {
  const [visible, setVisible] = useState(false);
  const [propertyValue, setPropertyValue] = useState();
  const [firstLoanAmount, setFirstLoanAmount] = useState();
  const [firstInterestRate, setFirstInterestRate] = useState();
  const [firstLoanToValue, setFirstLoanToValue] = useState();
  const [secondLoanAmount, setSecondLoanAmount] = useState();
  const [secondInterestRate, setSecondInterestRate] = useState();
  const [secondLoanToValue, setSecondLoanToValue] = useState();
  const [combinedLoanAmount, setCombinedLoanAmount] = useState();
  const [combinedLoanInterest, setCombinedLoanInterest] = useState(0);
  const [combinedLoanLTV, setCombinedLoanLTV] = useState();

  const { getFieldDecorator } = props.form;

  useEffect(() => {
    if (
      propertyValue &&
      firstLoanAmount &&
      firstInterestRate &&
      secondInterestRate
    ) {
      updateCombinedLoanAmount();
      updateCombinedLoanToInterest();
      updateCombinedLoanLTV();
    }
  });

  useEffect(() => {
    if (propertyValue) {
      updateLoanToValue();
    }
  });

  const updateLoanToValue = () => {
    if (propertyValue && firstLoanAmount) {
      setFirstLoanToValue(
        Math.round((firstLoanAmount / propertyValue) * 10000) / 100
      );
    }

    if (propertyValue && secondLoanAmount) {
      setSecondLoanToValue(
        Math.round((secondLoanAmount / propertyValue) * 10000) / 100
      );
    }
  };

  const updateCombinedLoanAmount = () => {
    setCombinedLoanAmount(firstLoanAmount + secondLoanAmount);
  };

  const updateCombinedLoanToInterest = () => {
    const combinedLoanInterest = (
      (firstLoanAmount * firstInterestRate +
        secondLoanAmount * secondInterestRate) /
      (firstLoanAmount + secondLoanAmount)
    ).toFixed(2);

    setCombinedLoanInterest(combinedLoanInterest);
  };

  const updateCombinedLoanLTV = () => {
    const combinedLoanLTV = firstLoanToValue + secondLoanToValue;
    setCombinedLoanLTV(combinedLoanLTV);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        A/B Loan Rate Calculator
      </Button>
      <Modal
        title="A/B Loan Rate Calculator"
        visible={visible}
        onCancel={() => setVisible(false)}
        width="600px"
        footer={null}
      >
        <Form>
          <Row>
            <Col span={8}>
              <Form.Item label="Property Value">
                {getFieldDecorator("propertyValue", {
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e => {
                      setPropertyValue(Number(e.target.value));
                    }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <b>First Mortgage</b>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Loan Amount ($)">
                {getFieldDecorator("firstLoanAmount", {
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e => {
                      setFirstLoanAmount(Number(e.target.value));
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Interest Rate (%)">
                {getFieldDecorator("firstInterestRate", {
                  rules: [validation.number, validation.percent]
                })(
                  <Input
                    onChange={e => {
                      setFirstInterestRate(Number(e.target.value));
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Loan-to-Value (%)">
                <Input value={firstLoanToValue} disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <b>Second Mortgage</b>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Loan Amount ($)">
                {getFieldDecorator("secondLoanAmount", {
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e => {
                      setSecondLoanAmount(Number(e.target.value));
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Interest Rate (%)">
                {getFieldDecorator("secondInterestRate", {
                  rules: [validation.number, validation.percent]
                })(
                  <Input
                    onChange={e => {
                      setSecondInterestRate(Number(e.target.value));
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Loan-to-Value (%)">
                <Input value={secondLoanToValue} disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <h3>Combined Loan Amount = $ {combinedLoanAmount}</h3>
          </Row>
          <Row>
            <h3>Combined Loan Interest = {combinedLoanInterest} %</h3>
          </Row>
          <Row>
            <h3>Combined Loan LTV = {combinedLoanLTV} %</h3>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

const WrappedABLoanRate = Form.create({ name: "register" })(ABLoanRate);

export default WrappedABLoanRate;
