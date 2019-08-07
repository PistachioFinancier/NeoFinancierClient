import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Modal, Button, Table } from "antd";
import { amortSchedCA } from "../../scripts/amortCA";
import { amortSchedUS } from "../../scripts/amortUS";
import validation from "../../scripts/validation";

function PaymentAndAmortizationSchedule(props) {
  const [visible, setVisible] = useState(false);
  const [useUSSystem, setUseUSSystem] = useState(false);
  const [loanAmount, setLoanAmount] = useState();
  const [interestRate, setInterestRate] = useState();
  const [term, setTerm] = useState();
  const [amortization, setAmortization] = useState();
  const [monthlyPayment, setMonthlyPayment] = useState();
  const [totalInterestPaidOverTerm, setTotalInterestPaidOverTerm] = useState();
  const [principleBalanceEndOfTerm, setPrincipleBalanceEndOfTerm] = useState();
  const [scheduleSwitch, setScheduleSwitch] = useState(false);
  const [schedule, setSchedule] = useState(null);

  const { getFieldDecorator } = props.form;

  const columns = [
    {
      title: "Period",
      dataIndex: "payment number"
    },
    {
      title: "Starting Principal",
      dataIndex: "starting principal"
    },
    {
      title: "Interest Payment",
      dataIndex: "interest"
    },
    {
      title: "Principal Payment",
      dataIndex: "principal"
    },
    {
      title: "Ending Principal",
      dataIndex: "principal remaining"
    }
  ];

  useEffect(() => {
    if (loanAmount && interestRate && term && amortization) {
      calculateAmortization();
      setScheduleSwitch(true);
    }
  }, [loanAmount, interestRate, term, amortization, useUSSystem]);

  function calculateAmortization() {
    const updateResults = func => {
      const amortSched = func(
        loanAmount,
        interestRate,
        term * 12,
        amortization * 12
      );
      setMonthlyPayment(amortSched[0].monthlyPayment);
      setTotalInterestPaidOverTerm(amortSched.slice(-1)[0]["accrued interest"]);
      setPrincipleBalanceEndOfTerm(
        amortSched.slice(-1)[0]["principal remaining"]
      );
      setSchedule(amortSched);
    };

    updateResults(!useUSSystem ? amortSchedCA : amortSchedUS);
  }

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Payment and Amortization Schedule Calculator
      </Button>
      <Modal
        title="Payment and Amortization Schedule Calculator"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width="1000px"
        height="800px"
      >
        <Row>
          <Col span={12}>
            <Form>
              <Row>
                <p>
                  The Payment and Amortization Schedule Calculator will produce
                  for you a monthly payment schedule for mortgage payments,
                  based on the information you provide below.
                </p>
              </Row>
              <Row>
                <input
                  type="checkbox"
                  onChange={e => {
                    setUseUSSystem(e.target.checked);
                  }}
                />
                Check for US Banking Systems
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item label="Loan Amount ($)">
                    {getFieldDecorator("loanAmount", {
                      rules: [validation.number]
                    })(
                      <Input
                        onChange={e => setLoanAmount(Number(e.target.value))}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Interest Rate (%)">
                    {getFieldDecorator("interestRate", {
                      rules: [validation.number, validation.percent]
                    })(
                      <Input
                        onChange={e => setInterestRate(Number(e.target.value))}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Term (year)">
                    {getFieldDecorator("term", {
                      rules: [validation.number]
                    })(
                      <Input onChange={e => setTerm(Number(e.target.value))} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Amortization (year)">
                    {getFieldDecorator("amortization", {
                      rules: [validation.number]
                    })(
                      <Input
                        onChange={e => setAmortization(Number(e.target.value))}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <b>Monthly Payment = {monthlyPayment}</b>
              </Row>
              <Row>
                <b>
                  Annual Payment ={" "}
                  {monthlyPayment
                    ? Math.round(monthlyPayment * 12 * 100) / 100
                    : null}
                </b>
              </Row>
              <Row>
                <b>
                  Total Interest Paid Over Term = {totalInterestPaidOverTerm}
                </b>
              </Row>
              <Row>
                <b>
                  Principal Balance at End of Term = {principleBalanceEndOfTerm}
                </b>
              </Row>
            </Form>
          </Col>
          <Col span={12} visible={scheduleSwitch}>
            <Table dataSource={schedule} columns={columns} />;
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

const WrappedPaymentAndAmortizationSchedule = Form.create({ name: "register" })(
  PaymentAndAmortizationSchedule
);

export default WrappedPaymentAndAmortizationSchedule;
