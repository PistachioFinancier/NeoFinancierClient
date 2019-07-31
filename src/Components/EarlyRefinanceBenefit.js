import React from "react";
import "antd/dist/antd.css";
import {
  Row,
  Col,
  Input,
  Form,
  Modal,
  Button,
  Menu,
  Icon,
  Dropdown
} from "antd";

class EarlyRefinanceBenefit extends React.Component {
  state = {
    visible: false,
    fields: {
      USBankingSystem: false,
      loanAmount: null,
      interestRate: null,
      term: null,
      amortization: null,
      firstPaymentDate: null,
      prePaymentDate: null,
      lenderCostOfFunds: null,
      minPrePaymentPenalty: null,
      checkForFinalBenefit: true,
      marketValueAtDateOfRefinance: null,
      entryType: null,
      loanToValue: null
    }
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
      () => {}
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Early Refinance Benefit Calculator
        </Button>
        <Modal
          title="Early Refinance Benefit Calculator"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="1000px"
          height="800px"
        >
          <Form>
            <Row>
              {/* <input type="checkbox">Check for US Banking Systems</input> */}
            </Row>
            <Col span={11}>
              <Row>
                <b>Existing Loan Information</b>
              </Row>

              <Row>
                <Col span={8}>
                  <Row>
                    Loan Amount ($)
                    <Input />
                  </Row>
                  <Row>Ammortization (year)</Row>
                  <Row>
                    <Input />
                  </Row>
                </Col>
                <Col span={8}>
                  <Row>Interest Rate (%)</Row>
                  <Row>
                    <Input />
                  </Row>
                  <Row>First Payment Date</Row>
                  <Row>
                    <Input />
                  </Row>
                </Col>
                <Col span={8}>
                  <Row>Term (year)</Row>
                  <Row>
                    <Input />
                  </Row>
                  <Row>Pre-Payment Date</Row>
                  <Row>
                    <Input />
                  </Row>
                </Col>
              </Row>
              <Row>Lender Cost of Funds (%)</Row>
              <Row>
                <Input />
                <p>
                  For Lender Cost of Funds Value, please use a government bond
                  rate that best approximates the remaining term on your
                  mortgage at the date you plan to terminate the mortgage.
                </p>
              </Row>
              <Row>Minimum Pre-Payment Penalty ($)</Row>
              <Row>
                <Input />
              </Row>
              <Row>What do you want to calculate?</Row>
              <Row></Row>
            </Col>

            <Col span={13}>
              <Row>
                <b>Refinancing Assumptions</b>
              </Row>
              <Col span={16}>
                <Row>Market Value of Property at Date of Refinance ($)</Row>
                <Row>
                  <Input />
                </Row>
                <Col span={12}>
                  <Row>Loan-to-Value (%)</Row>
                  <Row>
                    <Input />
                  </Row>
                  <Row>Interest Rate (%)</Row>
                  <Row>
                    <Input />
                  </Row>
                  <Row>Ammortization (year)</Row>
                  <Row>
                    <Input />
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>Loan Amount ($)</Row>
                  <Row>
                    <Input />
                  </Row>
                  <Row>Term (year)</Row>
                  <Row>
                    <Input />
                  </Row>
                </Col>
              </Col>
              <Col span={8}>
                <Row>Select entry type</Row>
                <Row>
                  <Dropdown>
                    {/* <a>
                      Select type
                      <Icon type="down" />
                    </a> */}
                    <Menu slot="overlay">
                      <Menu.Item>
                        {/* <a>LTV (loan to value %)</a> */}
                      </Menu.Item>
                      <Menu.Item>{/* <a>Loan Amount</a> */}</Menu.Item>
                    </Menu>
                  </Dropdown>
                </Row>
              </Col>
            </Col>
            <Row>
              <Col span={5}>
                <Row>
                  Interest Rate at Renewal (%)
                  <Input></Input>
                </Row>
                <Row>
                  Additional Fees (%)
                  <Input></Input>
                </Row>
              </Col>
              <Col span={7}>
                Simple Annual Return on Additional Proceeds (%)
                <Input></Input>
              </Col>
              Final Benefit
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
const WrappedEarlyRefinanceBenefit = Form.create({ name: "register" })(
  EarlyRefinanceBenefit
);

export default WrappedEarlyRefinanceBenefit;
