import React from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";

class ABLoanRate extends React.Component {
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
          A/B Loan Rate Calculator
        </Button>

        <Modal
          title="A/B Loan Rate Calculator"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="600px"
        >
          <Row>
            <Row>
              <Col span={8}>
                <b>Property Value</b>
                <Input></Input>
              </Col>
            </Row>
            <Row>
              <b>First Mortgage</b>
            </Row>
            <Row>
              <Col span={8}>
                Loan Amount ($)
                <Input></Input>
              </Col>
              <Col span={8}>
                Interest Rate (%)
                <Input></Input>
              </Col>
              <Col span={8}>
                Loan-to-Value (%)
                <Input></Input>
              </Col>
            </Row>
          </Row>
          <Row>
            <b>Second Mortgage</b>
          </Row>
          <Row>
            <Col span={8}>
              Loan Amount ($)
              <Input></Input>
            </Col>
            <Col span={8}>
              Interest Rate (%)
              <Input></Input>
            </Col>
            <Col span={8}>
              Loan-to-Value (%)
              <Input></Input>
            </Col>
          </Row>
          <Row>
            <b>Combined Loan Amount =</b>
          </Row>
          <Row>
            <b>Combined Loan Interest =</b>
          </Row>
          <Row>
            <b>Combined Loan LTV =</b>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default ABLoanRate;
