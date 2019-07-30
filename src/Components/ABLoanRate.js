import React from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";

class ABLoanRate extends React.Component {
  state = {
    visible: false,
    fields: {
      propertyValue: null,
      firstLoanAmount: null,
      firstInterestRate: null,
      firstLoanToValue: null,
      secondLoanAmount: null,
      secondInterestRate: null,
      secondLoanToValue: null
    },
    combinedLoanAmount: null,
    combinedLoanInterest: null,
    combinedLoanLTV: null
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handleField = (fieldName, event) => {
    this.setState(
      {
        fields: {
          ...this.state.fields,
          [fieldName]: Number(event.target.value)
        }
      },
      () => {
        this.updateLoanToValue();
        if (
          this.state.fields.propertyValue &&
          this.state.fields.firstLoanAmount &&
          this.state.fields.firstInterestRate &&
          this.state.fields.secondLoanAmount &&
          this.state.fields.secondInterestRate
        ) {
          this.updateCombinedLoanAmount();
          this.updateCombinedLoanToInterest();
          this.updateCombinedLoanLTV();
        }
      }
    );

    // this.updateInterestRateDelta()
  };

  updateLoanToValue = () => {
    if (this.state.fields.propertyValue && this.state.fields.firstLoanAmount) {
      const firstLoanToValue = (
        (this.state.fields.firstLoanAmount / this.state.fields.propertyValue) *
        100
      ).toFixed(2);

      this.setState({
        fields: { ...this.state.fields, firstLoanToValue }
      });
    }

    if (this.state.fields.propertyValue && this.state.fields.secondLoanAmount) {
      const secondLoanToValue = (
        (this.state.fields.secondLoanAmount / this.state.fields.propertyValue) *
        100
      ).toFixed(2);

      this.setState({
        fields: { ...this.state.fields, secondLoanToValue }
      });
    }
  };

  updateCombinedLoanAmount = () => {
    const combinedLoanAmount =
      Number(this.state.fields.firstLoanAmount) +
      Number(this.state.fields.secondLoanAmount);
    this.setState({ combinedLoanAmount });
  };

  updateCombinedLoanToInterest = () => {
    const combinedLoanInterest = (
      (this.state.fields.firstLoanAmount * this.state.fields.firstInterestRate +
        this.state.fields.secondLoanAmount *
          this.state.fields.secondInterestRate) /
      (this.state.fields.firstLoanAmount + this.state.fields.secondLoanAmount)
    ).toFixed(2);
    this.setState({ combinedLoanInterest });
  };

  updateCombinedLoanLTV = () => {
    const combinedLoanLTV =
      Number(this.state.fields.firstLoanToValue) +
      Number(this.state.fields.secondLoanToValue);
    this.setState({ combinedLoanLTV });
  };

  checkInterestRate = (rules, value, callback) => {
    if (value >= 0 && value <= 100) {
      return Promise.resolve(value);
    }
    return Promise.reject("value");
  };

  render() {
    const { getFieldDecorator } = this.props.form;

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
          <Form>
            <Row>
              <Col span={8}>
                <Form.Item label="Property Value">
                  {getFieldDecorator("propertyValue", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Property Value must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => this.handleField("propertyValue", e)}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <b>First Mortgage</b>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("firstLoanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => this.handleField("firstLoanAmount", e)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Interest Rate (%)">
                  {getFieldDecorator("firstInterestRate", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Interest Rate must be a number."
                      },
                      {
                        validator: this.checkInterestRate,
                        message: "Interest Rate must be between 0 and 100."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => this.handleField("firstInterestRate", e)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Loan-to-Value (%)">
                  <Input value={this.state.fields.firstLoanToValue} disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <b>Second Mortgage</b>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Loan Amount ($)">
                  {getFieldDecorator("secondLoanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => this.handleField("secondLoanAmount", e)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Interest Rate (%)">
                  {getFieldDecorator("secondInterestRate", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Interest Rate must be a number."
                      },
                      {
                        validator: this.checkInterestRate,
                        message: "Interest Rate must be between 0 and 100."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => this.handleField("secondInterestRate", e)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Loan-to-Value (%)">
                  <Input value={this.state.fields.secondLoanToValue} disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <h3>
                Combined Loan Amount ($) = {this.state.combinedLoanAmount}
              </h3>
            </Row>
            <Row>
              <h3>
                Combined Loan Interest (%) = {this.state.combinedLoanInterest}
              </h3>
            </Row>
            <Row>
              <h3>Combined Loan LTV (%) = {this.state.combinedLoanLTV}</h3>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedABLoanRate = Form.create({ name: "register" })(ABLoanRate);

export default WrappedABLoanRate;
