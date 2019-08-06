import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";
import { DatePicker } from "antd";
import { Menu, Dropdown, Icon } from "antd";
import loanMarkToMarket from "../Scripts/LoanMarkToMarketFormula";
import validation from "../Scripts/validation";

function LoanMarkToMarket(props) {
  const [visible, setVisible] = useState(false);
  const [markToMarketDate, setMarkToMarketDate] = useState();
  const [existingLoanAmount, setExistingLoanAmount] = useState();
  const [existingTerm, setExistingTerm] = useState();
  const [existingAmortization, setExistingAmortization] = useState();
  const [existingInterestRate, setExistingInterestRate] = useState();
  const [existingFirstPaymentDate, setExistingFirstPayementDate] = useState();
  const [newLoanAmountOption, setNewLoanAmountOption] = useState(1);
  const [newAmortization, setNewAmortization] = useState();
  const [newInterestRate, setNewInterestRate] = useState();
  const [newAdditionalRefinanceFee, setNewAdditionalRefinanceFee] = useState();
  const [usedBalance, setUsedBalance] = useState("N/A");
  const [usedTerm, setUsedTerm] = useState("N/A");
  const [netAdjustmentToPrice, setNetAdjustmentToPrice] = useState("N/A");

  const { getFieldDecorator } = props.form;

  useEffect(() => calculateLoanMarkToMarket());

  const calculateLoanMarkToMarket = () => {
    const variables = [
      markToMarketDate,
      existingLoanAmount,
      existingTerm,
      existingAmortization,
      existingInterestRate,
      existingFirstPaymentDate,
      newLoanAmountOption,
      newAmortization,
      newInterestRate,
      newAdditionalRefinanceFee
    ];

    if (
      !variables.includes(undefined) &&
      !variables.includes(null) &&
      !variables.includes("")
    ) {
      const result = loanMarkToMarket(...variables);
      setUsedBalance(result.usedBalance);
      setUsedTerm(result.usedTerm);
      setNetAdjustmentToPrice(result.netAdjustmentToPrice);
    } else {
      setUsedBalance("N/A");
      setUsedTerm("N/A");
      setNetAdjustmentToPrice("N/A");
    }
  };

  const loanOptionMenu = (
    <Menu>
      <Menu.Item onClick={() => setNewLoanAmountOption(1)}>
        Same Original Balance
      </Menu.Item>
      <Menu.Item onClick={() => setNewLoanAmountOption(2)}>
        Use outstanding principal balance
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Loan Mark To Market Pricing Adjustment Calculator
      </Button>
      <Modal
        title="Loan Mark To Market Pricing Adjustment Calculator"
        visible={visible}
        onCancel={() => setVisible(false)}
        width="1000px"
        height="800px"
        footer={null}
      >
        <Form>
          <Row gutter={16}>
            <p>
              The Loan Mark to Market Pricing Adjustment Calculator is used to
              determine the discount or premium to the price of an asset that
              has a locked mortgage by comparing the existing mortgage against
              what terms the asset would achieve if it were refinanced.
            </p>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              Mark to Market Date
              <br />
              <DatePicker
                onChange={e => setMarkToMarketDate(e ? e.toString() : null)}
              />
            </Col>
          </Row>
          <Row>
            <b>Existing Loan Information</b>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Loan Amount($)">
                {getFieldDecorator("existingLoanAmount", {
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e =>
                      setExistingLoanAmount(Number(e.target.value))
                    }
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Term (year)">
                {getFieldDecorator("existingTerm", {
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e => setExistingTerm(Number(e.target.value))}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Amortization (year)">
                {getFieldDecorator("existingAmortization", {
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e =>
                      setExistingAmortization(Number(e.target.value))
                    }
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Interest Rate (%)">
                {getFieldDecorator("existingInterestRate", {
                  rules: [validation.number, validation.percent]
                })(
                  <Input
                    onChange={e =>
                      setExistingInterestRate(Number(e.target.value))
                    }
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              First Payment Date
              <br />
              <DatePicker
                onChange={e =>
                  setExistingFirstPayementDate(e ? e.toString() : null)
                }
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <b>New Loan Information</b>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              Loan Amount
              <br />
              <Dropdown overlay={loanOptionMenu}>
                <Button>
                  {newLoanAmountOption === 1
                    ? "Same original balance"
                    : "Use outstanding principal balance"}
                  <Icon type="down" />
                </Button>
              </Dropdown>
            </Col>
            <Col span={12}>
              <Col span={8}>
                Used Balance
                <br />
                {usedBalance}
              </Col>
              <Col span={8}>
                Used Term
                <br />
                {usedTerm}
              </Col>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Amortization (year)">
                {getFieldDecorator("newAmortization", {
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e => setNewAmortization(Number(e.target.value))}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Interest Rate (%)">
                {getFieldDecorator("newInterestRate", {
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e => setNewInterestRate(Number(e.target.value))}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Additional Refinance Fees (%)">
                {getFieldDecorator("newAdditionalRefinanceFee", {
                  rules: [validation.number, validation.percent]
                })(
                  <Input
                    onChange={e =>
                      setNewAdditionalRefinanceFee(Number(e.target.value))
                    }
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <b>Net Adjustment to Price* = </b>
            {netAdjustmentToPrice}
          </Row>
          <Row gutter={16}>
            <p>
              * = Interest Savings (Current Loan Interest Payments Remaining
              less New Loan Interest Payments) less New Loan Fees
            </p>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

const WrappedLoanMarkToMarket = Form.create({ name: "register" })(
  LoanMarkToMarket
);

export default WrappedLoanMarkToMarket;
