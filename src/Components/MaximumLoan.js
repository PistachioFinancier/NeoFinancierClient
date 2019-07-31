import React from "react";
import 'antd/dist/antd.css';
import { Row, Col, Input, Form, Modal, Button } from 'antd';

class MaximumLoan extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render(){
    return(
    <div>
    <Button type="primary" onClick={showModal}>Maximum Loan Calculator</Button>
    <Modal
      title="Maximum Loan Calculator"
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      width="600px"
    >
      <Row>
        <Row><b>Loan Information</b></Row>
        <Row>
            <Col span={8}>
                Min. DSCR Required
                <Input></Input>
            </Col>
            <Col span={8}>
                Max LTV (%)
                <Input></Input>
            </Col>
            <Col span={8}>
                Interest Rate (%)
                <Input></Input>
            </Col>
        </Row>
        <Row>
            <Col span={8}>
                Amortization (year)
                <Input></Input>
            </Col>
            <Col span={8}>
                NOI ($)
                <Input></Input>
            </Col>
            <Col span={8}>
                Value ($)
                <Input></Input>
            </Col>
        </Row>
        
        <Row><b>Maximum Loan Possible =</b></Row>
        <Row><b>Annual Payment =</b></Row>
        <Row><b>DSCR =</b></Row>
        <Row><b>LTV =</b></Row>
      </Row>
    </Modal>
  </div>
    );
  }

export default MaximumLoan;