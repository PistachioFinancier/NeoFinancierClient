import React from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";

class LoanMarkToMarket extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Loan Mark To Market Pricing Adjustment Calculator
        </Button>
        <Modal
          title="Loan Mark To Market Pricing Adjustment Calculator"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="1000px"
          height="800px"
        >
          <Row>
            <Row>
              <p>
                The Loan Mark to Market Pricing Adjustment Calculator is used to
                determine the discount or premium to the price of an asset that
                has a locked mortgage by comparing the existing mortgage against
                what terms the asset would achieve if it were refinanced.
              </p>
            </Row>
            <Row>
              <Col span={12}>
                Mark to Market Date
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <b>Existing Loan Information</b>
            </Row>
            <Row>
              <Col span={8}>
                Loan Amount($)
                <Input></Input>
              </Col>
              <Col span={8}>
                Term (year)
                <Input></Input>
              </Col>
              <Col span={8}>
                Amortization (year)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                Interest Rate (%)
                <Input></Input>
              </Col>
              <Col span={12}>
                First Payment Date
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <b>New Loan Information</b>
            </Row>
            <Row>
              <Col span={12}>
                Loan Amount
                <Input></Input>
              </Col>
              <Col span={12}>
                <Col span={8}>Used Balance</Col>
                <Col span={8}>Used Term</Col>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                Amortization (year)
                <Input></Input>
              </Col>
              <Col span={8}>
                Interest Rate (%)
                <Input></Input>
              </Col>
              <Col span={8}>
                Additional Refinance Fees (%)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <b>Net Adjustment to Price* = </b>
            </Row>
            <Row>
              <p>
                * = Interest Savings (Current Loan Interest Payments Remaining
                less New Loan Interest Payments) less New Loan Fees
              </p>
            </Row>
          </Row>
        </Modal>
      </div>
    );
  }
}
const WrappedLoanMarkToMarket = Form.create({ name: "register" })(
  LoanMarkToMarket
);

export default WrappedLoanMarkToMarket;
