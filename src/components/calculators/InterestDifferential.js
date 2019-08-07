import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Modal, Button } from "antd";
import { amortSchedCA, discountedSavingsCA } from "../../scripts/amortCA";
import validation from "../../scripts/validation";

function InterestDifferential(props) {
  const [visible, setVisible] = useState(false);
  const [loanAmount, setLoanAmount] = useState(false);
  const [interestRate1, setInterestRate1] = useState();
  const [interestRate2, setInterestRate2] = useState();
  const [term, setTerm] = useState();
  const [amortization, setAmortization] = useState();
  const [discountRate, setDiscountRate] = useState(0);
  const [deltaTerm, setDeltaTerm] = useState();
  const [deltaAmort, setDeltaAmort] = useState();

  const { getFieldDecorator } = props.form;

  useEffect(() => {
    if (loanAmount && interestRate1 && interestRate2 && term && amortization) {
      calculateDeltaTerm();
      calculateDeltaAmort();
    }
  });

  function calculateDeltaTerm() {
    const result = discountedSavingsCA(
      loanAmount,
      interestRate1,
      interestRate2,
      term * 12,
      amortization * 12,
      discountRate
    );

    setDeltaTerm(result);
  }
  function calculateDeltaAmort() {
    const result = discountedSavingsCA(
      loanAmount,
      interestRate1,
      interestRate2,
      amortization * 12,
      amortization * 12,
      discountRate
    );

    setDeltaAmort(result);
  }

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Interest Rate Differential $PV
      </Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title="Interest Rate Differential $PV"
        width="800px"
        footer={null}
      >
        <Form>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Loan Amount">
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
              <Form.Item label="Interest Rate 1 (%)">
                {getFieldDecorator("interestRate1", {
                  rules: [validation.number, validation.percent]
                })(
                  <Input
                    onChange={e => setInterestRate1(Number(e.target.value))}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Interest Rate 2 (%)">
                {getFieldDecorator("interestRate2", {
                  rules: [validation.number, validation.percent]
                })(
                  <Input
                    onChange={e => setInterestRate2(Number(e.target.value))}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Term (years)">
                {getFieldDecorator("term", {
                  rules: [validation.number]
                })(<Input onChange={e => setTerm(Number(e.target.value))} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Amortization (years)">
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
              <Form.Item label="Discount Rate (%)">
                {getFieldDecorator("discountRate", {
                  rules: [validation.number, validation.percent]
                })(
                  <Input
                    onChange={e => setDiscountRate(Number(e.target.value))}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <h3>Term Interest Rate Delta</h3>
              <p>{deltaTerm}</p>
            </Col>
            <Col span={12}>
              <h3>Amortization Interest Rate Delta</h3>
              <p>{deltaAmort}</p>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

const WrappedInterestDifferential = Form.create({ name: "register" })(
  InterestDifferential
);

export default WrappedInterestDifferential;
