import React from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";

class PrePaymentPenalty extends React.Component {
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
          Pre-Payment Penalty Calculator
        </Button>
        <Modal
          title="Pre-Payment Penalty Calculator"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="600px"
        >
          <Row>
            <Row>
              <p>
                The Pre-Payment Penalty Calculator will estimate the penalty you
                have to pay if you break/pre-pay your mortgage based on a
                Minimum Pre-Payment Penalty or yield maintenance.
              </p>
            </Row>
            <Row>
              <input type="checkbox" />
              Check for US Banking Systems
            </Row>
            <Row>
              <Col span="8">
                Valuation Date
                <Input v-model="value"></Input>
              </Col>
            </Row>
            <Row>
              <b>Existing Loan Information</b>
            </Row>
            <Row>
              <Col span="16">
                Loan Amount ($)
                <Input></Input>
              </Col>
              <Col span="8">
                Term (year)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                Amortization (year)
                <Input></Input>
              </Col>
              <Col span="8">
                First Payment Date
                <Input></Input>
              </Col>
              <Col span="8">
                Interest Rate (%)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                Lender of Cost of Funds (%)
                <Input></Input>
              </Col>
              <Col span="12">
                Minimum Pre-Payment Penalty ($)
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <b>Pre-payment Penalty (Estimate) =</b>
            </Row>
            <Row>
              <p>a. *Interest calculations based on 30/360 day calendar year</p>
              <p>
                b. **Disclaimer: Pistachio's yield maintenance calculator is
                used to help estimate a potential prepayment penalty based on a
                yield maintenance prepayment formula. This calculator should not
                be relied upon for final decision making. Contact your
                commercial mortgage lender or servicer to determine your actual
                yield maintenance prepayment penalty.
              </p>
            </Row>
          </Row>
        </Modal>
      </div>
    );
  }
}

const WrappedPrePaymentPenalty = Form.create({ name: "register" })(
  PrePaymentPenalty
);

export default WrappedPrePaymentPenalty;
