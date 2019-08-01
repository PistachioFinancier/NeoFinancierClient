import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";

function EffectiveRate(props) {
  const [visible, setVisible] = useState(false);
  const [useUSSystem, setUseUSSystem] = useState(false);
  const [firstLoanAmount, setFirstLoanAmount] = useState();
  const [firstInterest, setFirstInterest] = useState();
  const [firstTerm, setFirstTerm] = useState();
  const [firstAmortization, setFirstAmortization] = useState();
  const [firstLenderFee, setFirstLenderFee] = useState();
  const [firstLenderBPS, setFirstLenderBPS] = useState();
  const [firstBrokerFee, setFirstBrokerFee] = useState();
  const [firstBrokerBPS, setFirstBrokerBPS] = useState();
  const [firstAppraisalCost, setFirstAppraisalCost] = useState();
  const [firstESACost, setFirstESACost] = useState();
  const [firstBCACost, setFirstBCACost] = useState();
  const [firstLegalCost, setFirstLegalCost] = useState();
  const [firstManagementCost, setFirstManagementCost] = useState();
  const [firstOtherCost, setFirstOtherCost] = useState();
  const [firstDiscountRate, setFirstDiscountRate] = useState();
  const [secondLoanAmount, setSecondLoanAmount] = useState();
  const [secondInterest, setSecondInterest] = useState();
  const [secondTerm, setSecondTerm] = useState();
  const [secondAmortization, setSecondAmortization] = useState();
  const [secondLenderFee, setSecondLenderFee] = useState();
  const [secondLenderBPS, setSecondLenderBPS] = useState();
  const [secondBrokerFee, setSecondBrokerFee] = useState();
  const [secondBrokerBPS, setSecondBrokerBPS] = useState();
  const [secondAppraisalCost, setSecondAppraisalCost] = useState();
  const [secondESACost, setSecondESACost] = useState();
  const [secondBCACost, setSecondBCACost] = useState();
  const [secondLegalCost, setSecondLegalCost] = useState();
  const [secondManagementCost, setSecondManagementCost] = useState();
  const [secondOtherCost, setSecondOtherCost] = useState();
  const [secondDiscountRate, setSecondDiscountRate] = useState();

  const { getFieldDecorator } = props.form;

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Effective Rate Calculator
      </Button>
      <Modal title="Effective Rate Calculator" visible={visible} width="1100px">
        <Row>
          <Row>
            <p>
              The Effective Interest Rate Calculator is used to compare the
              effective annual interest rate and the present value of costs of
              two mortgages. Additional financing costs such as lender fees,
              broker fees, third party reports, etc. can be included in your
              comparison.
            </p>
          </Row>
          <Col span={12}>
            <Row>
              <b>Loan Information</b>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setFirstLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setFirstInterest(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Interest Rate (%)
                <Input></Input>
              </Col>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Term (year)
                <Input></Input>
              </Col>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Amortization (year)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <b>Additional Costs:</b>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Lender Fee/Cost
                <Input></Input>
              </Col>
              <Col span={4}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                bps / $<Input></Input>
              </Col>
              <Col span={8}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Broker Fee/Cost
                <Input></Input>
              </Col>
              <Col span={4}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                bps / $<Input></Input>
              </Col>
            </Row>
            <Row>
              <b>Other Fees:</b>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Appraisal ($)
                <Input></Input>
              </Col>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                ESA ($)
                <Input></Input>
              </Col>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                BCA ($)
                <Input></Input>
              </Col>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Legal ($)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Management Time/Opportunity Cost ($)
                <Input></Input>
              </Col>
              <Col span={8}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Other ($)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <b>Present Value of Costs</b>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Discount Rate (%)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <b>
                Effective Interest Rate Including Additional Costs (Annual) =
              </b>
            </Row>
            <Row>
              <b>Total PV of Costs =</b>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <b>Loan Information</b>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Loan Amount ($)
                <Input></Input>
              </Col>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Interest Rate (%)
                <Input></Input>
              </Col>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Term (year)
                <Input></Input>
              </Col>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Amortization (year)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <b>Additional Costs:</b>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Lender Fee/Cost
                <Input></Input>
              </Col>
              <Col span={4}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                bps / $<Input></Input>
              </Col>
              <Col span={8}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Broker Fee/Cost
                <Input></Input>
              </Col>
              <Col span={4}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                bps / $<Input></Input>
              </Col>
            </Row>
            <Row>
              <b>Other Fees:</b>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Appraisal ($)
                <Input></Input>
              </Col>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                ESA ($)
                <Input></Input>
              </Col>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                BCA ($)
                <Input></Input>
              </Col>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Legal ($)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Management Time/Opportunity Cost ($)
                <Input></Input>
              </Col>
              <Col span={8}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Other ($)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <b>Present Value of Costs</b>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setLoanAmount(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
                Discount Rate (%)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <b>
                Effective Interest Rate Including Additional Costs (Annual) =
              </b>
            </Row>
            <Row>
              <b>Total PV of Costs =</b>
            </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

const WrappedEffectiveRate = Form.create({ name: "register" })(EffectiveRate);

export default WrappedEffectiveRate;
