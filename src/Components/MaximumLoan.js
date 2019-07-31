import React from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";

class MaximumLoan extends React.Component {
  state = {
    visible: false,
    fields: {
      minDSCRRequired: null,
      maxLTV: null,
      interestRate: null,
      amortization: null,
      NOI: null,
      value: null
    },
    maxLoanPossible: null,
    annualPayment: null,
    DSCR: null,
    LTV: null
  };

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

  handleField = (fieldName, event) => {
    this.setState(
      {
        fields: {
          ...this.state.fields,
          [fieldName]: Number(event.target.value)
        }
      },
      () => {}
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Maximum Loan Calculator
        </Button>
        <Modal
          title="Maximum Loan Calculator"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="600px"
        >
          <Form>
            <Row>
              <b>Loan Information</b>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Min. DSCR Required">
                  {getFieldDecorator("minDSCRRequired", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Min. DSCR Required must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => this.handleField("minDSCRRequired", e)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Max LTV (%)">
                  {getFieldDecorator("maxLTV", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Max LTV (%) must be a number."
                      }
                    ]
                  })(<Input onChange={e => this.handleField("maxLTV", e)} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Interest Rate (%)">
                  {getFieldDecorator("interestRate", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Interest Rate (%) must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => this.handleField("interestRate", e)}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Amortization (year)">
                  {getFieldDecorator("amortization", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Amortization must be a number."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => this.handleField("amortization", e)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="NOI ($)">
                  {getFieldDecorator("NOI", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "NOI must be a number."
                      }
                    ]
                  })(<Input onChange={e => this.handleField("NOI", e)} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Value ($)">
                  {getFieldDecorator("value", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Value must be a number."
                      }
                    ]
                  })(<Input onChange={e => this.handleField("value", e)} />)}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <b>Maximum Loan Possible = $ {this.state.maxLoanPossible}</b>
            </Row>
            <Row>
              <b>Annual Payment = $ {this.state.annualPayment}</b>
            </Row>
            <Row>
              <b>DSCR = {this.state.DSCR}</b>
            </Row>
            <Row>
              <b>LTV = {this.state.LTV}</b>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedMaximumLoan = Form.create({ name: "register" })(MaximumLoan);

export default WrappedMaximumLoan;
