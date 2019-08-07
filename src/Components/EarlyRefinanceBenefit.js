import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import validation from "../Scripts/validation";
import { amortSchedCA } from "../Scripts/Amort";
import { amortSchedUS } from "../Scripts/AmortUS";
import {
  Row,
  Col,
  Input,
  Form,
  Modal,
  Button,
  Menu,
  Icon,
  Dropdown,
  Checkbox,
  DatePicker
} from "antd";

function EarlyRefinanceBenefit(props) {
  const [visible, setVisible] = useState(false);
  const [useUSSystem, setUseUSSystem] = useState(false);
  const [loanAmount, setLoanAmount] = useState();
  const [interestRate, setinterestRate] = useState();
  const [term, setTerm] = useState();
  const [amortization, setAmortization] = useState();
  const [firstPayment, setFirstPayment] = useState();
  const [prePayment, setPrePayment] = useState();
  const [lenderCostOfFunds, setLenderCostOfFunds] = useState(0);
  const [prepaymentPenalty, setPrePaymentPenalty] = useState(0);
  const [loanAmountSavings, setLoanAmountSavings] = useState();
  const [termSavings, setTermSavings] = useState(5);
  const [interestRateSavings, setInterestRateSavings] = useState(0);
  const [amortizationSavings, setAmortizationSavings] = useState(0);
  const [additionalFeesSavings, setAdditionalFeesSavings] = useState(0);
  const [finalSavings, setFinalSavings] = useState(0);
  const [loanAmountBenefits, setLoanAmountBenefits] = useState(1000);
  const [interestRateBenefits, setInterestRateBenefits] = useState(3);
  const [termBenefits, setTermBenefits] = useState(20);
  const [amortizationBenefits, setAmortizationBenefits] = useState(25);
  const [annualReturns, setAnnualReturns] = useState(0);
  const [additionalFeesBenefits, setAdditionalFeesBenefits] = useState(0);
  const [finalBenefits, setFinalBenefits] = useState(0);

  const { getFieldDecorator } = props.form;

  useEffect(() => {
    if (
      loanAmount &&
      interestRate &&
      term &&
      amortization &&
      firstPayment &&
      prePayment
    )
      calculate();
  });

  const calculate = () => {
    const market_Date = new Date(prePayment);
    const start_Date = new Date(firstPayment);

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

    const schedule = amortSchedCA(
      loanAmount,
      interestRate,
      term * 12,
      amortization * 12
    );

    setTermSavings(term * 12 - numberOfMonths);
    setLoanAmountSavings(schedule[numberOfMonths - 1]["principal remaining"]);

    const interestRemaining =
      schedule[term * 12 - 1]["accrued interest"] -
      schedule[numberOfMonths]["accrued interest"];

    let result =
      Math.round(
        ((loanAmountSavings * lenderCostOfFunds * 0.01) / 12) *
          (term * 12 - numberOfMonths) *
          100
      ) / 100;

    result = result + prepaymentPenalty;

    const savingSched = amortSchedCA(
      loanAmountSavings,
      interestRateSavings,
      termSavings,
      amortizationSavings * 12
    );

    setFinalSavings(
      interestRemaining -
        loanAmountSavings * (additionalFeesSavings / 100) -
        result -
        savingSched.slice(-1)[0]["accrued interest"]
    );

    const benefitsSched = amortSchedCA(
      loanAmountBenefits,
      interestRateBenefits,
      termBenefits * 12,
      amortizationBenefits * 12
    );

    setFinalBenefits(
      (loanAmountBenefits -
        loanAmountBenefits * (additionalFeesBenefits / 100) -
        result -
        loanAmountSavings) *
        ((0.01 * annualReturns) / 12) *
        termBenefits *
        12 -
        benefitsSched.slice(-1)[0]["accrued interest"]
    );
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Early Refinance Benefit Calculator
      </Button>
      <Modal
        title="Early Refinance Benefit Calculator"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width="1000px"
      >
        <Form>
          <Row>
            <Checkbox
              onChange={e => {
                setUseUSSystem(e.target.checked);
              }}
            >
              Check for US System
            </Checkbox>
          </Row>

          <Row>
            <Col span={11}>
              <Row>Existing Loan Information</Row>
              <Row>
                <Col span={8}>
                  <Form.Item label="Loan Amount ($)">
                    {getFieldDecorator("loanAmount", {
                      rules: [validation.number]
                    })(
                      <Input
                        onChange={e => setLoanAmount(Number(e.target.value))}
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="Amortization">
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
                  <Form.Item label="Interest Rate (%)">
                    {getFieldDecorator("interestRate", {
                      rules: [validation.number, validation.percent]
                    })(
                      <Input
                        onChange={e => setinterestRate(Number(e.target.value))}
                      />
                    )}
                  </Form.Item>
                  First Payment Date
                  <DatePicker
                    onChange={date => {
                      setFirstPayment(date);
                    }}
                  />
                </Col>
                <Col span={8}>
                  <Form.Item label="Term">
                    {getFieldDecorator("term", {
                      rules: [validation.number]
                    })(
                      <Input onChange={e => setTerm(Number(e.target.value))} />
                    )}
                  </Form.Item>
                  Pre-Payment Date
                  <DatePicker
                    onChange={date => {
                      setPrePayment(date);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Form.Item label="Lender Cost of Funds">
                  {getFieldDecorator("lenderCostOfFunds", {
                    rules: [validation.number, validation.percent]
                  })(
                    <Input
                      onChange={e =>
                        setLenderCostOfFunds(Number(e.target.value))
                      }
                    />
                  )}
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="Pre-Payment Penalty">
                  {getFieldDecorator("prepaymentPenalty", {
                    rules: [validation.number]
                  })(
                    <Input
                      onChange={e =>
                        setPrePaymentPenalty(Number(e.target.value))
                      }
                    />
                  )}
                </Form.Item>
              </Row>
              <Row>
                <Col span={12}>Remaining Balance ($) {loanAmountSavings}</Col>
                <Col span={12}>Remaining Term {termSavings}</Col>
              </Row>
            </Col>
            <Col span={13}>
              <Row>Refinancing Assumptions</Row>
              <Row>
                <Col span={8}>
                  <Form.Item label="New Interest Rate">
                    {getFieldDecorator("interestRateSavings", {
                      rules: [validation.number, validation.percent]
                    })(
                      <Input
                        onChange={e =>
                          setInterestRateSavings(Number(e.target.value))
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="New Amortization">
                    {getFieldDecorator("amortizationSavings", {
                      rules: [validation.number]
                    })(
                      <Input
                        onChange={e =>
                          setAmortizationSavings(Number(e.target.value))
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Additional Fees">
                    {getFieldDecorator("additionalFeesSavings", {
                      rules: [validation.number]
                    })(
                      <Input
                        onChange={e =>
                          setAdditionalFeesSavings(Number(e.target.value))
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>Final Savings = ${finalSavings}</Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="New Loan Amount">
                    {getFieldDecorator("loanAmountBenefits", {
                      rules: [validation.number]
                    })(
                      <Input
                        onChange={e =>
                          setLoanAmountBenefits(Number(e.target.value))
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="New Interest Rate">
                    {getFieldDecorator("interestRateBenefits", {
                      rules: [validation.number, validation.percent]
                    })(
                      <Input
                        onChange={e =>
                          setInterestRateBenefits(Number(e.target.value))
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="New Term">
                    {getFieldDecorator("termBenefits", {
                      rules: [validation.number]
                    })(
                      <Input
                        onChange={e => setTermBenefits(Number(e.target.value))}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="New Amortization">
                    {getFieldDecorator("amortizationBenefits", {
                      rules: [validation.number]
                    })(
                      <Input
                        onChange={e =>
                          setAmortizationBenefits(Number(e.target.value))
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="Annual Return Rate (%)">
                    {getFieldDecorator("annualReturns", {
                      rules: [validation.number, validation.percent]
                    })(
                      <Input
                        onChange={e => setAnnualReturns(Number(e.target.value))}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Additional Fees (%)">
                    {getFieldDecorator("additionalFeesBenefits", {
                      rules: [validation.number, validation.percent]
                    })(
                      <Input
                        onChange={e =>
                          setAdditionalFeesBenefits(Number(e.target.value))
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>Final Benefit = {finalBenefits}</Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

const WrappedEarlyRefinanceBenefit = Form.create({ name: "register" })(
  EarlyRefinanceBenefit
);

export default WrappedEarlyRefinanceBenefit;
