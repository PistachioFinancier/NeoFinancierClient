import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";
import validation from "../Scripts/validation";

function MaximumLoan(props) {
  const [visible, setVisible] = useState(false);
  const [minDSCR, setMinDSCR] = useState();
  const [maxLTV, setMaxLTV] = useState();
  const [interest, setInterest] = useState();
  const [amortization, setAmortization] = useState();
  const [NOI, setNOI] = useState();
  const [value, setValue] = useState();
  const [maxLoan, setMaxLoan] = useState(0);
  const [annualPayment, setAnnualPayment] = useState(0);
  const [DSCR, setDSCR] = useState(0);
  const [LTV, setLTV] = useState(0);

  const { getFieldDecorator } = props.form;

  useEffect(() => {
    if (minDSCR && maxLTV && interest && amortization && NOI && value) {
      calculate();
    }
  });

  const calculate = () => {
    const limitedByLTV = (maxLTV / 100) * value;
    const MP =
      (limitedByLTV * ((1 + interest / 200) ** (1 / 6) - 1)) /
      (1 - ((1 + interest / 200) ** (1 / 6)) ** (-1 * (amortization * 12)));
    const AP = MP * 12;

    if (NOI / AP >= minDSCR) {
      setLTV(maxLTV);
      setMaxLoan(limitedByLTV);
      setAnnualPayment(AP);
      setDSCR(NOI / AP);
    } else {
      const divisor = minDSCR / (NOI / AP);

      setMaxLoan(limitedByLTV / divisor);
      setDSCR(minDSCR);
      setLTV((maxLoan / value) * 100);
      setAnnualPayment(AP / divisor);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Maximum Loan Calculator
      </Button>
      <Modal
        title="Maximum Loan Calculator"
        visible={visible}
        onCancel={() => setVisible(false)}
        width="600px"
        footer={null}
      >
        <Form>
          <Row>
            <b>Loan Information</b>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Min. DSCR Required">
                {getFieldDecorator("minDSCRRequired", {
                  rules: [validation.number]
                })(
                  <Input onChange={e => setMinDSCR(Number(e.target.value))} />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Max LTV (%)">
                {getFieldDecorator("maxLTV", {
                  rules: [validation.number, validation.percent]
                })(<Input onChange={e => setMaxLTV(Number(e.target.value))} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Interest Rate (%)">
                {getFieldDecorator("interestRate", {
                  rules: [validation.number, validation.percent]
                })(
                  <Input onChange={e => setInterest(Number(e.target.value))} />
                )}
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
              <Form.Item label="NOI ($)">
                {getFieldDecorator("NOI", {
                  rules: [validation.number]
                })(<Input onChange={e => setNOI(Number(e.target.value))} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Value ($)">
                {getFieldDecorator("value", {
                  rules: [validation.number]
                })(<Input onChange={e => setValue(Number(e.target.value))} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <b>Maximum Loan Possible = $ {maxLoan.toFixed(2)}</b>
          </Row>
          <Row>
            <b>Annual Payment = $ {annualPayment.toFixed(2)}</b>
          </Row>
          <Row>
            <b>DSCR = {DSCR.toFixed(2)}</b>
          </Row>
          <Row>
            <b>LTV = {LTV.toFixed(2)}%</b>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

const WrappedMaximumLoan = Form.create({ name: "register" })(MaximumLoan);

export default WrappedMaximumLoan;
