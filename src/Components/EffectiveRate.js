import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";
import { amortSchedCA, discountedCA } from "../Scripts/Amort";
import { amortSchedUS } from "../Scripts/AmortUS";
import { Select } from "antd";
import EffectiveInterestCalculator from "effective-interest-rate";
import validation from "../Scripts/validation";

function EffectiveRate(props) {
  const [visible, setVisible] = useState(false);
  const [useUSSystem, setUseUSSystem] = useState(false);
  const [firstLoanAmount, setFirstLoanAmount] = useState();
  const [firstInterest, setFirstInterest] = useState();
  const [firstTerm, setFirstTerm] = useState();
  const [firstAmortization, setFirstAmortization] = useState();
  const [firstLenderFee, setFirstLenderFee] = useState(0);
  const [firstLenderFeeType, setFirstLenderFeeType] = useState("$");
  const [firstBrokerFee, setFirstBrokerFee] = useState(0);
  const [firstBrokerFeeType, setFirstBrokerFeeType] = useState("$");
  const [firstAppraisalCost, setFirstAppraisalCost] = useState(0);
  const [firstESACost, setFirstESACost] = useState(0);
  const [firstBCACost, setFirstBCACost] = useState(0);
  const [firstLegalCost, setFirstLegalCost] = useState(0);
  const [firstManagementCost, setFirstManagementCost] = useState(0);
  const [firstOtherCost, setFirstOtherCost] = useState(0);
  const [firstDiscountRate, setFirstDiscountRate] = useState(0);
  const [firstEffectiveRate, setFirstEffectiveRate] = useState();
  const [firstPV, setFirstPV] = useState();
  const [secondLoanAmount, setSecondLoanAmount] = useState(1000);
  const [secondInterest, setSecondInterest] = useState(1);
  const [secondTerm, setSecondTerm] = useState(12);
  const [secondAmortization, setSecondAmortization] = useState(1);
  const [secondLenderFee, setSecondLenderFee] = useState(0);
  const [secondLenderFeeType, setSecondLenderFeeType] = useState("$");
  const [secondBrokerFee, setSecondBrokerFee] = useState(0);
  const [secondBrokerFeeType, setSecondBrokerFeeType] = useState("$");
  const [secondAppraisalCost, setSecondAppraisalCost] = useState(0);
  const [secondESACost, setSecondESACost] = useState(0);
  const [secondBCACost, setSecondBCACost] = useState(0);
  const [secondLegalCost, setSecondLegalCost] = useState(0);
  const [secondManagementCost, setSecondManagementCost] = useState(0);
  const [secondOtherCost, setSecondOtherCost] = useState(0);
  const [secondDiscountRate, setSecondDiscountRate] = useState(0);
  const [secondEffectiveRate, setSecondEffectiveRate] = useState();
  const [secondPV, setSecondPV] = useState();

  const { getFieldDecorator } = props.form;
  const { Option } = Select;

  useEffect(() => {
    calculateEffectiveInterestRate();
  });

  const calculateEffectiveInterestRate = () => {
    if (
      firstLoanAmount &&
      firstInterest &&
      firstTerm &&
      firstAmortization &&
      firstDiscountRate &&
      secondLoanAmount &&
      secondInterest &&
      secondTerm &&
      secondAmortization &&
      secondDiscountRate
    ) {
      const totalCosts1 =
        (firstLenderFeeType === "$"
          ? firstLenderFee
          : (firstLenderFee * firstLoanAmount) / 100) +
        (firstBrokerFeeType === "$"
          ? firstBrokerFee
          : (firstBrokerFee * firstLoanAmount) / 100) +
        firstAppraisalCost +
        firstESACost +
        firstBCACost +
        firstLegalCost +
        firstManagementCost +
        firstOtherCost;

      const MP1 = amortSchedCA(
        firstLoanAmount,
        firstInterest,
        firstTerm * 12,
        firstAmortization * 12
      )[0].monthlyPayment;

      const preRate1 = EffectiveInterestCalculator.withEqualPayments(
        firstLoanAmount - totalCosts1,
        MP1,
        firstAmortization * 12,
        firstInterest / 100
      );

      setFirstEffectiveRate(((1 + preRate1 / 2) ** 2 - 1) * 100);
      setFirstPV(
        discountedCA(
          firstLoanAmount,
          firstInterest,
          firstTerm * 12,
          firstAmortization * 12,
          firstDiscountRate
        ) + totalCosts1
      );

      const totalCosts2 =
        (secondLenderFeeType === "$"
          ? secondLenderFee
          : (secondLenderFee * secondLoanAmount) / 100) +
        (secondBrokerFeeType === "$"
          ? secondBrokerFee
          : (secondBrokerFee * secondLoanAmount) / 100) +
        secondAppraisalCost +
        secondESACost +
        secondBCACost +
        secondLegalCost +
        secondManagementCost +
        secondOtherCost;

      const MP2 = amortSchedCA(
        secondLoanAmount,
        secondInterest,
        secondTerm * 12,
        secondAmortization * 12
      )[0].monthlyPayment;

      const preRate2 = EffectiveInterestCalculator.withEqualPayments(
        secondLoanAmount - totalCosts2,
        MP2,
        secondAmortization * 12,
        secondInterest / 100
      );

      setSecondEffectiveRate(((1 + preRate2 / 2) ** 2 - 1) * 100);

      setSecondPV(
        discountedCA(
          secondLoanAmount,
          secondInterest,
          secondTerm * 12,
          secondAmortization * 12,
          secondDiscountRate
        ) + totalCosts2
      );
    }
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
                    rules: [validation.number]
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
                    rules: [validation.number, validation.percent]
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
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    rules: [validation.number]
                  })(
                    <Input
                      onChange={e => {
                        setFirstLenderFee(Number(e.target.value));
                      }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="bps / $">
                  <Select
                    defaultValue="$"
                    onChange={e => setFirstLenderFeeType(e)}
                  >
                    <Option value="$">$</Option>
                    <Option value="%">%</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Broker Fee/Cost">
                  {getFieldDecorator("firstBrokerFee", {
                    rules: [validation.number]
                  })(
                    <Input
                      onChange={e => setFirstBrokerFee(Number(e.target.value))}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="bps / $">
                  <Select
                    defaultValue="$"
                    onChange={e => setFirstBrokerFeeType(e)}
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
                  {getFieldDecorator("firstAppraisalCost", {
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    rules: [validation.number, validation.percent]
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
                Effective Interest Rate Including Additional Costs (Annual) = %{" "}
                {firstEffectiveRate ? firstEffectiveRate.toFixed(2) : ""}
              </b>
            </Row>
            <Row>
              <b>Total PV of Costs = $ {firstPV ? firstPV.toFixed(2) : ""}</b>
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
                    rules: [validation.number]
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
                    rules: [validation.number, validation.percent]
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
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    onChange={e => setSecondLenderFeeType(e)}
                  >
                    <Option value="$">$</Option>
                    <Option value="%">%</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Broker Fee/Cost">
                  {getFieldDecorator("secondBrokerFee", {
                    rules: [validation.number]
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
                    onChange={e => setSecondBrokerFeeType(e)}
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
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    rules: [validation.number]
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
                    rules: [validation.number, validation.percent]
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
                Effective Interest Rate Including Additional Costs (Annual) = %
                {secondEffectiveRate ? secondEffectiveRate.toFixed(2) : ""}
              </b>
            </Row>
            <Row>
              <b>
                Total PV of Costs = $ {secondPV ? secondPV.toFixed(2) : ""}{" "}
              </b>
            </Row>
          </Col>
        </Form>
      </Modal>
    </div>
  );
}

const WrappedEffectiveRate = Form.create({ name: "register" })(EffectiveRate);

export default WrappedEffectiveRate;
