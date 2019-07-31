import React from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";

class EffectiveRate extends React.Component {
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
          Effective Rate Calculator
        </Button>
        <Modal
          title="Effective Rate Calculator"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="1100px"
        >
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
            <Col span="12">
              <Row>
                <b>Loan Information</b>
              </Row>
              <Row>
                <Col span="6">
                  Loan Amount ($)
                  <Input></Input>
                </Col>
                <Col span="6">
                  Interest Rate (%)
                  <Input></Input>
                </Col>
                <Col span="6">
                  Term (year)
                  <Input></Input>
                </Col>
                <Col span="6">
                  Amortization (year)
                  <Input></Input>
                </Col>
              </Row>
              <Row>
                <b>Additional Costs:</b>
              </Row>
              <Row>
                <Col span="8">
                  Lender Fee/Cost
                  <Input></Input>
                </Col>
                <Col span="4">
                  bps / $<Input></Input>
                </Col>
                <Col span="8">
                  Broker Fee/Cost
                  <Input></Input>
                </Col>
                <Col span="4">
                  bps / $<Input></Input>
                </Col>
              </Row>
              <Row>
                <b>Other Fees:</b>
              </Row>
              <Row>
                <Col span="6">
                  Appraisal ($)
                  <Input></Input>
                </Col>
                <Col span="6">
                  ESA ($)
                  <Input></Input>
                </Col>
                <Col span="6">
                  BCA ($)
                  <Input></Input>
                </Col>
                <Col span="6">
                  Legal ($)
                  <Input></Input>
                </Col>
              </Row>
              <Row>
                <Col span="16">
                  Management Time/Opportunity Cost ($)
                  <Input></Input>
                </Col>
                <Col span="8">
                  Other ($)
                  <Input></Input>
                </Col>
              </Row>
              <Row>
                <b>Present Value of Costs</b>
              </Row>
              <Row>
                <Col span="6">
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

            <Col span="12">
              <Row>
                <b>Loan Information</b>
              </Row>
              <Row>
                <Col span="6">
                  Loan Amount ($)
                  <Input></Input>
                </Col>
                <Col span="6">
                  Interest Rate (%)
                  <Input></Input>
                </Col>
                <Col span="6">
                  Term (year)
                  <Input></Input>
                </Col>
                <Col span="6">
                  Amortization (year)
                  <Input></Input>
                </Col>
              </Row>
              <Row>
                <b>Additional Costs:</b>
              </Row>
              <Row>
                <Col span="8">
                  Lender Fee/Cost
                  <Input></Input>
                </Col>
                <Col span="4">
                  bps / $<Input></Input>
                </Col>
                <Col span="8">
                  Broker Fee/Cost
                  <Input></Input>
                </Col>
                <Col span="4">
                  bps / $<Input></Input>
                </Col>
              </Row>
              <Row>
                <b>Other Fees:</b>
              </Row>
              <Row>
                <Col span="6">
                  Appraisal ($)
                  <Input></Input>
                </Col>
                <Col span="6">
                  ESA ($)
                  <Input></Input>
                </Col>
                <Col span="6">
                  BCA ($)
                  <Input></Input>
                </Col>
                <Col span="6">
                  Legal ($)
                  <Input></Input>
                </Col>
              </Row>
              <Row>
                <Col span="16">
                  Management Time/Opportunity Cost ($)
                  <Input></Input>
                </Col>
                <Col span="8">
                  Other ($)
                  <Input></Input>
                </Col>
              </Row>
              <Row>
                <b>Present Value of Costs</b>
              </Row>
              <Row>
                <Col span="6">
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
}

const WrappedEffectiveRate = Form.create({ name: "register" })(EffectiveRate);

export default WrappedEffectiveRate;
