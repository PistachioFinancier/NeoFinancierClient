import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Modal, Button, Checkbox } from "antd";
import { DatePicker } from "antd";
import { amortSchedCA } from "../../scripts/amortCA";
import { amortSchedUS } from "../../scripts/amortUS";
import validation from "../../scripts/validation";

function PrePaymentPenalty(props) {
  const [visible, setVisible] = useState(false);
  const [useUSSystem, setUseUSSystem] = useState(false);
  const [valuationDate, setValuationDate] = useState();
  const [loanAmount, setLoanAmount] = useState();
  const [term, setTerm] = useState();
  const [amortization, setAmortization] = useState();
  const [firstPaymentDate, setFirstPaymentDate] = useState();
  const [interest, setInterest] = useState();
  const [lenderCostOfFunds, setLenderCostOfFunds] = useState();
  const [minimumPenalty, setMinimumPenalty] = useState(0);
  const [prePaymentPenalty, setPrePaymentPenalty] = useState();

  const { getFieldDecorator } = props.form;

  useEffect(() => {
    if (
      valuationDate &&
      loanAmount &&
      term &&
      amortization &&
      firstPaymentDate &&
      interest &&
      lenderCostOfFunds
    ) {
      calculatePrePaymentPenalty();
    }
  });

  function calculatePrePaymentPenalty() {
    const market_Date = new Date(valuationDate);
    const start_Date = new Date(firstPaymentDate);

    const numberOfMonths =
      12 *
        Math.abs(
          market_Date.getFullYear() -
            start_Date.getFullYear() -
            (market_Date.getMonth() < start_Date.getMonth() ? 1 : 0)
        ) +
      ((market_Date.getMonth() - start_Date.getMonth() < 0
        ? market_Date.getMonth() - start_Date.getMonth() + 12
        : market_Date.getMonth() - start_Date.getMonth()) +
        (market_Date.getDate() >= start_Date.getDate() ? 1 : 0));

    console.log(numberOfMonths);
    let interestAtAmmortization,
      interestAtValuationDate,
      remainingPrincipleAtValuationDate;

    const populateVariables = func => {
      interestAtAmmortization = func(
        loanAmount,
        interest,
        term * 12,
        amortization * 12
      ).slice(-1)[0]["accrued interest"];

      interestAtValuationDate = func(
        loanAmount,
        interest,
        term * 12,
        amortization * 12
      )[numberOfMonths - 1]["accrued interest"];

      remainingPrincipleAtValuationDate = func(
        loanAmount,
        interest,
        term * 12,
        amortization * 12
      )[numberOfMonths - 1]["principal remaining"];
    };

    populateVariables(!useUSSystem ? amortSchedCA : amortSchedUS);

    const interestRemaining = interestAtAmmortization - interestAtValuationDate;

    const result =
      Math.round(
        (interestRemaining -
          ((remainingPrincipleAtValuationDate * lenderCostOfFunds * 0.01) /
            12) *
            (term * 12 - numberOfMonths)) *
          100
      ) / 100;

    setPrePaymentPenalty(result + minimumPenalty);
  }

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Pre-Payment Penalty Calculator
      </Button>
      <Modal
        title="Pre-Payment Penalty Calculator"
        visible={visible}
        width="600px"
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form>
          <Row>
            <p>
              The Pre-Payment Penalty Calculator will estimate the penalty you
              have to pay if you break/pre-pay your mortgage based on a Minimum
              Pre-Payment Penalty or yield maintenance.
            </p>
          </Row>
          <Row>
            <Checkbox
              onChange={e => {
                setUseUSSystem(e.target.checked);
              }}
            />
            Check for US Banking Systems
          </Row>
          <Row>
            <Col span={8}>
              Valuation Date
              <br />
              <DatePicker
                onChange={date => {
                  setValuationDate(date);
                }}
              />
            </Col>
          </Row>
          <Row>
            <b>Existing Loan Information</b>
          </Row>
          <Row>
            <Col span={16}>
              <Form.Item label="Loan Amount ($)">
                {getFieldDecorator("loanAmount", {
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e => setLoanAmount(Number(e.target.value))}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Term (year)">
                {getFieldDecorator("term", {
                  rules: [validation.number]
                })(<Input onChange={e => setTerm(Number(e.target.value))} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Amortization (year)">
                {getFieldDecorator("amortization", {
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e => setAmortization(Number(e.target.value))}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              First Payment Date
              <br />
              <DatePicker
                onChange={date => {
                  setFirstPaymentDate(date);
                }}
              />
            </Col>
            <Col span={8}>
              <Form.Item label="Interest Rate (%)">
                {getFieldDecorator("interest", {
                  rules: [validation.number, validation.percent]
                })(
                  <Input onChange={e => setInterest(Number(e.target.value))} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="Lender of Cost of Funds (%)">
                {getFieldDecorator("lenderCostOfFunds", {
                  rules: [validation.number, validation.percent]
                })(
                  <Input
                    onChange={e => {
                      setLenderCostOfFunds(Number(e.target.value));
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Minimum Pre-Payment Penalty ($)">
                {getFieldDecorator("minimumPenalty", {
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e => setMinimumPenalty(Number(e.target.value))}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <b>Pre-payment Penalty (Estimate) = ${prePaymentPenalty}</b>
          </Row>
          <Row>
            <p>a. *Interest calculations based on 30/360 day calendar year</p>
            <p>
              b. **Disclaimer: Pistachio's yield maintenance calculator is used
              to help estimate a potential prepayment penalty based on a yield
              maintenance prepayment formula. This calculator should not be
              relied upon for final decision making. Contact your commercial
              mortgage lender or servicer to determine your actual yield
              maintenance prepayment penalty.
            </p>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

const WrappedPrePaymentPenalty = Form.create({ name: "register" })(
  PrePaymentPenalty
);

export default WrappedPrePaymentPenalty;
