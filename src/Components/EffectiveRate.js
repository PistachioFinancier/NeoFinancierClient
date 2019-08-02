import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";
import { amortSchedCA } from "../Scripts/Amort";
import { amortSchedUS } from "../Scripts/AmortUS";
import { Select } from "antd";

function EffectiveRate(props) {
  const [visible, setVisible] = useState(false);
  const [useUSSystem, setUseUSSystem] = useState(false);
  const [firstLoanAmount, setFirstLoanAmount] = useState(10000);
  const [firstInterest, setFirstInterest] = useState(10);
  const [firstTerm, setFirstTerm] = useState(5);
  const [firstAmortization, setFirstAmortization] = useState(25);
  const [firstLenderFee, setFirstLenderFee] = useState();
  const [firstLenderBPS, setFirstLenderBPS] = useState("$");
  const [firstBrokerFee, setFirstBrokerFee] = useState();
  const [firstBrokerBPS, setFirstBrokerBPS] = useState("$");
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
  const [secondLenderBPS, setSecondLenderBPS] = useState("$");
  const [secondBrokerFee, setSecondBrokerFee] = useState();
  const [secondBrokerBPS, setSecondBrokerBPS] = useState("$");
  const [secondAppraisalCost, setSecondAppraisalCost] = useState();
  const [secondESACost, setSecondESACost] = useState();
  const [secondBCACost, setSecondBCACost] = useState();
  const [secondLegalCost, setSecondLegalCost] = useState();
  const [secondManagementCost, setSecondManagementCost] = useState();
  const [secondOtherCost, setSecondOtherCost] = useState();
  const [secondDiscountRate, setSecondDiscountRate] = useState();

  const { getFieldDecorator } = props.form;
  const { Option } = Select;

  useEffect(() => {
    calculateEffectiveInterestRate();
  });

  const calculateEffectiveInterestRate = () => {
    const totalInterestPaidAtEndOfTerm = amortSchedCA(
      firstLoanAmount,
      firstInterest,
      firstTerm * 12,
      firstAmortization * 12
    ).slice(-1)[0]["accrued interest"];

    // const totalPrincipleRemainingAtEndOfTerm = amortSchedCA(
    //   firstLoanAmount,
    //   firstInterest,
    //   firstTerm * 12,
    //   firstAmortization * 12
    // ).slice(-1)[0]["principal remaining"];

    // const totalPaidAtEndOfTerm =
    //   firstLoanAmount * 2 -
    //   totalPrincipleRemainingAtEndOfTerm +
    //   totalInterestPaidAtEndOfTerm;

    const effectiveRate =
      (1 + totalInterestPaidAtEndOfTerm / firstLoanAmount) ** (1 / firstTerm) -
      1;

    console.log(effectiveRate);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Effective Rate Calculator
      </Button>
      <Modal
        title="Effective Rate Calculator"
        visible={visible}
        width="1500px"
        onCancel={() => setVisible(false)}
        footer={null}
        bodyStyle={{ height: "800px" }}
      >
        <Form>
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
                <Form.Item label="Interest Rate (%)">
                  {getFieldDecorator("firstInterest", {
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
              </Col>
              <Col span={6}>
                <Form.Item label="Term (year)">
                  {getFieldDecorator("firstTerm", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setFirstTerm(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Amortization (year)">
                  {getFieldDecorator("firstAmortization", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e =>
                        setFirstAmortization(Number(e.target.value))
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <b>Additional Costs:</b>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Lender Fee/Cost">
                  {getFieldDecorator("firstLenderFee", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setFirstLenderFee(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="bps / $">
                  <Select defaultValue="$" onChange={e => setFirstLenderBPS(e)}>
                    <Option value="$">$</Option>
                    <Option value="%">%</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Broker Fee/Cost">
                  {getFieldDecorator("firstBrokerFee", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setFirstBrokerFee(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="bps / $">
                  <Select defaultValue="$" onChange={e => setFirstBrokerBPS(e)}>
                    <Option value="$">$</Option>
                    <Option value="%">%</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <b>Other Fees:</b>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Appraisal ($)">
                  {getFieldDecorator("firstAppraisalCost", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e =>
                        setFirstAppraisalCost(Number(e.target.value))
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="ESA ($)">
                  {getFieldDecorator("firstESACost", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setFirstESACost(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="BCA ($)">
                  {getFieldDecorator("firstBCACost", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setFirstBCACost(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Legal ($)">
                  {getFieldDecorator("firstLegalCost", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setFirstLegalCost(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Form.Item label="Management Time/Opportunity Cost ($)">
                  {getFieldDecorator("firstManagementCost", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e =>
                        setFirstManagementCost(Number(e.target.value))
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Other ($)">
                  {getFieldDecorator("firstOtherCost", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setFirstOtherCost(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <b>Present Value of Costs</b>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Discount Rate (%)">
                  {getFieldDecorator("firstDiscountRate", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e =>
                        setFirstDiscountRate(Number(e.target.value))
                      }
                    />
                  )}
                </Form.Item>
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
                  {getFieldDecorator("secondLoanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e =>
                        setSecondLoanAmount(Number(e.target.value))
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Interest Rate (%)">
                  {getFieldDecorator("secondInterest", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setSecondInterest(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Term (year)">
                  {getFieldDecorator("secondTerm", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setSecondTerm(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Amortization (year)">
                  {getFieldDecorator("secondAmortization", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e =>
                        setSecondAmortization(Number(e.target.value))
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <b>Additional Costs:</b>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Lender Fee/Cost">
                  {getFieldDecorator("secondLenderFee", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setSecondLenderFee(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="bps / $">
                  <Select
                    defaultValue="$"
                    onChange={e => setSecondLenderBPS(e)}
                  >
                    <Option value="$">$</Option>
                    <Option value="%">%</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Broker Fee/Cost">
                  {getFieldDecorator("secondBrokerFee", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setSecondBrokerFee(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="bps / $">
                  <Select
                    defaultValue="$"
                    onChange={e => setSecondBrokerBPS(e)}
                  >
                    <Option value="$">$</Option>
                    <Option value="%">%</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <b>Other Fees:</b>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Appraisal ($)">
                  {getFieldDecorator("secondAppraisalCost", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e =>
                        setSecondAppraisalCost(Number(e.target.value))
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="ESA ($)">
                  {getFieldDecorator("secondESACost", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setSecondESACost(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="BCA ($)">
                  {getFieldDecorator("secondBCACost", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setSecondBCACost(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Legal ($)">
                  {getFieldDecorator("secondLegalCost", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setSecondLegalCost(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Form.Item label="Management Time/Opportunity Cost ($)">
                  {getFieldDecorator("secondManagementCost", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e =>
                        setSecondManagementCost(Number(e.target.value))
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Other ($)">
                  {getFieldDecorator("secondOtherCost", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => setSecondOtherCost(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <b>Present Value of Costs</b>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Discount Rate (%)">
                  {getFieldDecorator("secondDiscountRate", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount ($) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e =>
                        setSecondDiscountRate(Number(e.target.value))
                      }
                    />
                  )}
                </Form.Item>
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
        </Form>
      </Modal>
    </div>
  );
}

const WrappedEffectiveRate = Form.create({ name: "register" })(EffectiveRate);

export default WrappedEffectiveRate;
