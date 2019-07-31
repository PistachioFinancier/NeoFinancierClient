import React from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";
import { amortSchedCA } from "../Scripts/Amort";

class InterestDifferential extends React.Component {
  state = {
    visible: false,
    fields: {
      loanAmount: null,
      interestRate1: null,
      interestRate2: null,
      term: null,
      amortization: null,
      discountRate: null
    },

    deltaTerm: null,
    deltaAmort: null
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

  handleField = async (fieldName, event) => {
    const newState = {
      ...this.state,
      fields: { ...this.state.fields, [fieldName]: event.target.value }
    };

    await this.setState(newState);

    this.updateInterestRateDelta();
  };

  checkInterestRate = (rules, value, callback) => {
    if (value >= 0 && value <= 100) {
      return Promise.resolve(value);
    }
    return Promise.reject("value");
  };

  updateInterestRateDelta() {
    let fields = {};

    const requiredFields = [
      "loanAmount",
      "interestRate1",
      "interestRate2",
      "term",
      "amortization"
    ];

    for (const index in requiredFields) {
      const field = requiredFields[index];
      if (
        this.state.fields[field] != null &&
        !isNaN(this.state.fields[field])
      ) {
        fields[field] = parseFloat(this.state.fields[field]);
      } else {
        return "N/A";
      }
    }

    //const result = fields["loanAmount"] * (0.01 * fields["interestRate1"]);

    const amort1 = amortSchedCA(
      fields["loanAmount"],
      fields["interestRate1"],
      fields["term"] * 12,
      fields["amortization"] * 12
    );

    const amort2 = amortSchedCA(
      fields["loanAmount"],
      fields["interestRate2"],
      fields["term"] * 12,
      fields["amortization"] * 12
    );

    const termInterest = Math.abs(
      amort1[amort1.length - 1]["accrued Interest"] -
        amort2[amort2.length - 1]["accrued Interest"]
    );

    const amort1Full = amortSchedCA(
      fields["loanAmount"],
      fields["interestRate1"],
      fields["amortization"] * 12,
      fields["amortization"] * 12
    );

    const amort2Full = amortSchedCA(
      fields["loanAmount"],
      fields["interestRate2"],
      fields["amortization"] * 12,
      fields["amortization"] * 12
    );

    const amortInterest = Math.abs(
      amort1Full[amort1Full.length - 1]["accrued Interest"] -
        amort2Full[amort2Full.length - 1]["accrued Interest"]
    );

    this.setState({
      deltaTerm: termInterest.toFixed(2),
      deltaAmort: amortInterest.toFixed(2)
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Interest Rate Differential $PV
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          title="Interest Rate Differential $PV"
          width="800px"
        >
          <Form>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Loan Amount">
                  {getFieldDecorator("loanAmount", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Loan Amount must be a number."
                      }
                    ]
                  })(
                    <Input onChange={e => this.handleField("loanAmount", e)} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Interest Rate 1 (%)">
                  {getFieldDecorator("interestRate1", {
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
                      onChange={e => this.handleField("interestRate1", e)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Interest Rate 2 (%)">
                  {getFieldDecorator("interestRate2", {
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
                      onChange={e => this.handleField("interestRate2", e)}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Term (years)">
                  {getFieldDecorator("term", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Term must be a number."
                      }
                    ]
                  })(<Input onChange={e => this.handleField("term", e)} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Amortization (years)">
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
                <Form.Item label="Discount Rate (%)">
                  {getFieldDecorator("discountRate", {
                    rules: [
                      {
                        pattern: "^\\d+(.\\d+)?$",
                        message: "Discount Rate must be a number."
                      },
                      {
                        validator: this.checkInterestRate,
                        message: "Discount Rate must be between 0 and 100."
                      }
                    ]
                  })(
                    <Input
                      onChange={e => this.handleField("discountRate", e)}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <h3>Term Interest Rate Delta</h3>
                <p>{this.state.deltaTerm}</p>
              </Col>
              <Col span={12}>
                <h3>Amortization Interest Rate Delta</h3>
                <p>{this.state.deltaAmort}</p>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedInterestDifferential = Form.create({ name: "register" })(
  InterestDifferential
);

export default WrappedInterestDifferential;
