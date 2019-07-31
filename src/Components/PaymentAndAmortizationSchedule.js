import React from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";
import amortSched from "../Scripts/Amort";
import amortSchedUS from "../Scripts/AmortUS";

class PaymentAndAmortizationSchedule extends React.Component {
  state = {
    visible: false,
    fields: {
      useUSSystem: false,
      loanAmount: null,
      interestRate: null,
      term: null,
      amortization: null
    },
    amort: null,
    monthlyPayment: null,
    totalInterestPaidOverTerm: null,
    principleBalanceEndOfTerm: null,
    scheduleSwitch: false,
    schedule: null
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

  handleField = async (fieldName, event) => {
    const newState = {
      ...this.state,
      fields: { ...this.state.fields, [fieldName]: event.target.value }
    };

    await this.setState(newState);

    this.getAmort();
  };

  getAmort = () => {
    console.log(this.state);
    let fields = {};
    for (const field in this.state.fields) {
      const value = this.state.fields[field];
      if (value != null && value !== "" && !isNaN(value)) {
        fields[field] = parseFloat(value);
      } else {
        this.setState({
          amort: null,
          monthlyPayment: null,
          totalInterestPaidOverTerm: null,
          principleBalanceEndOfTerm: null
        });
        return;
      }
    }

    if (!this.state.fields.useUSSystem) {
      var amort = amortSched(
        fields["loanAmount"],
        fields["interestRate"],
        fields["term"] * 12,
        fields["amortization"] * 12
      );

      console.log(fields);

      console.log(amort);

      var monthlyPayment = amort[0].monthlyPayment;
      var totalInterestPaidOverTerm =
        amort[amort.length - 1]["accrued Interest"];
      var principleBalanceEndOfTerm =
        amort[amort.length - 1]["principal remaining"];
    } else if (this.state.fields.useUSSystem) {
      var amort = amortSchedUS(
        fields["loanAmount"],
        fields["interestRate"],
        fields["term"] * 12,
        fields["amortization"] * 12
      );

      this.setState({
        schedule: amort.map(x => (
          <tr>
            <td>{x["payment number"]}</td>
            <td>{x.interest}</td> <td>{x.principal}</td>{" "}
            <td>{x["principal remaining"]}</td>
          </tr>
        )),
        scheduleSwitch: true
      });
      var monthlyPayment = amort[0].monthlyPayment;
      var totalInterestPaidOverTerm =
        amort[amort.length - 1]["accrued Interest"];
      var principleBalanceEndOfTerm =
        amort[amort.length - 1]["principal remaining"];
    }

    const newState = {
      ...this.state,
      amort,
      monthlyPayment,
      totalInterestPaidOverTerm,
      principleBalanceEndOfTerm
    };

    this.setState(newState);
  };

  checkInterestRate = (rules, value, callback) => {
    if (value >= 0 && value <= 100) {
      return Promise.resolve(value);
    }
    return Promise.reject("value");
  };

  handleCheckbox = () => {
    this.setState(
      {
        fields: {
          ...this.state.fields,
          useUSSystem: !this.state.fields.useUSSystem
        }
      },
      () => {
        this.getAmort();
      }
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Payment and Amortization Schedule Calculator
        </Button>
        <Modal
          title="Payment and Amortization Schedule Calculator"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="1000px"
          height="800px"
        >
          <Row>
            <Col span={12}>
              <Form>
                <Row>
                  <p>
                    The Payment and Amortization Schedule Calculator will
                    produce for you a monthly payment schedule for mortgage
                    payments, based on the information you provide below.
                  </p>
                </Row>
                <Row>
                  <input
                    type="checkbox"
                    onChange={() => {
                      this.handleCheckbox();
                    }}
                  />
                  Check for US Banking Systems
                </Row>
                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item label="Loan Amount ($)">
                      {getFieldDecorator("loanAmount", {
                        rules: [
                          {
                            pattern: "^\\d+(.\\d+)?$",
                            message: "Loan Amount must be a number."
                          }
                        ]
                      })(
                        <Input
                          onChange={e => this.handleField("loanAmount", e)}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Interest Rate (%)">
                      {getFieldDecorator("interestRate", {
                        rules: [
                          {
                            pattern: "^\\d+(.\\d+)?$",
                            message: "Loan Amount must be a number."
                          },
                          {
                            validator: this.checkInterestRate,
                            message: "Interest Rate must be between 0 and 100."
                          }
                        ]
                      })(
                        <Input
                          onChange={e => this.handleField("interestRate", e)}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Term (year)">
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
                  <Col span={6}>
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
                </Row>
                <Row>
                  <b>Monthly Payment = {this.state.monthlyPayment}</b>
                </Row>
                <Row>
                  <b>
                    Annual Payment ={" "}
                    {Math.round(this.state.monthlyPayment * 12 * 100) / 100}
                  </b>
                </Row>
                <Row>
                  <b>
                    Total Interest Paid Over Term ={" "}
                    {this.state.principleBalanceEndOfTerm}
                  </b>
                </Row>
                <Row>
                  <b>
                    Principal Balance at End of Term ={" "}
                    {this.state.totalInterestPaidOverTerm}
                  </b>
                </Row>
              </Form>
            </Col>
            <Col span={12} visible={this.state.scheduleSwitch}>
              <table>
                <th>Payment #</th> <th>Interest</th> <th>Principal</th>{" "}
                <th>Principal Remaining</th>
                {this.state.schedule}
              </table>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

const WrappedPaymentAndAmortizationSchedule = Form.create({ name: "register" })(
  PaymentAndAmortizationSchedule
);

export default WrappedPaymentAndAmortizationSchedule;
