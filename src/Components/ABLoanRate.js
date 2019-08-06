import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Row, Col, Input, Form, Modal, Button } from "antd";
import validation from "../Scripts/validation";

function ABLoanRate(props) {
  const [visible, setVisible] = useState(false);
  const [propertyValue, setPropertyValue] = useState();
  const [firstLoanAmount, setFirstLoanAmount] = useState();
  const [firstInterestRate, setFirstInterestRate] = useState();
  const [firstLoanToValue, setFirstLoanToValue] = useState();
  const [secondLoanAmount, setSecondLoanAmount] = useState();
  const [secondInterestRate, setSecondInterestRate] = useState();
  const [secondLoanToValue, setSecondLoanToValue] = useState();
  const [combinedLoanAmount, setCombinedLoanAmount] = useState();
  const [combinedLoanInterest, setCombinedLoanInterest] = useState(0);
  const [combinedLoanLTV, setCombinedLoanLTV] = useState();

  const { getFieldDecorator } = props.form;

  useEffect(() => {
    if (
      propertyValue &&
      firstLoanAmount &&
      firstInterestRate &&
      secondInterestRate
    ) {
      calculateLoanAmount();
    }
  });

  function calculateLoanAmount() {}

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        A/B Loan Rate Calculator
      </Button>
      <Modal
        title="A/B Loan Rate Calculator"
        visible={visible}
        onCancel={() => setVisible(false)}
        width="600px"
        footer={null}
      >
        <Form>
          <Row>
            <Col span={8}>
              <Form.Item label="Property Value">
                {getFieldDecorator("propertyValue", {
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e => {
                      setPropertyValue(e.target.value);
                    }}
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
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e => {
                      setFirstLoanAmount(e.target.value);
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Interest Rate (%)">
                {getFieldDecorator("firstInterestRate", {
                  rules: [validation.number, validation.percent]
                })(
                  <Input
                    onChange={e => {
                      setFirstInterestRate(e.target.value);
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Loan-to-Value (%)">
                <Input value={firstLoanToValue} disabled />
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
                  rules: [validation.number]
                })(
                  <Input
                    onChange={e => {
                      setSecondLoanAmount(e.target.value);
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Interest Rate (%)">
                {getFieldDecorator("secondInterestRate", {
                  rules: [validation.number, validation.percent]
                })(
                  <Input
                    onChange={e => {
                      setSecondInterestRate(e.target.value);
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Loan-to-Value (%)">
                <Input value={secondLoanToValue} disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <h3>Combined Loan Amount = $ {combinedLoanAmount}</h3>
          </Row>
          <Row>
            <h3>Combined Loan Interest = {combinedLoanInterest} %</h3>
          </Row>
          <Row>
            <h3>Combined Loan LTV = {combinedLoanLTV} %</h3>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

// class asf extends React.Component {
//   updateLoanToValue = () => {
//     if (this.state.fields.propertyValue && this.state.fields.firstLoanAmount) {
//       const firstLoanToValue = (
//         (this.state.fields.firstLoanAmount / this.state.fields.propertyValue) *
//         100
//       ).toFixed(2);

//       this.setState({
//         fields: { ...this.state.fields, firstLoanToValue }
//       });
//     }

//     if (this.state.fields.propertyValue && this.state.fields.secondLoanAmount) {
//       const secondLoanToValue = (
//         (this.state.fields.secondLoanAmount / this.state.fields.propertyValue) *
//         100
//       ).toFixed(2);

//       this.setState({
//         fields: { ...this.state.fields, secondLoanToValue }
//       });
//     }
//   };

//   updateCombinedLoanAmount = () => {
//     const combinedLoanAmount =
//       Number(this.state.fields.firstLoanAmount) +
//       Number(this.state.fields.secondLoanAmount);
//     this.setState({ combinedLoanAmount });
//   };

//   updateCombinedLoanToInterest = () => {
//     const combinedLoanInterest = (
//       (this.state.fields.firstLoanAmount * this.state.fields.firstInterestRate +
//         this.state.fields.secondLoanAmount *
//           this.state.fields.secondInterestRate) /
//       (this.state.fields.firstLoanAmount + this.state.fields.secondLoanAmount)
//     ).toFixed(2);
//     this.setState({ combinedLoanInterest });
//   };

//   updateCombinedLoanLTV = () => {
//     const combinedLoanLTV =
//       Number(this.state.fields.firstLoanToValue) +
//       Number(this.state.fields.secondLoanToValue);
//     this.setState({ combinedLoanLTV });
//   };
// }

const WrappedABLoanRate = Form.create({ name: "register" })(ABLoanRate);

export default WrappedABLoanRate;
