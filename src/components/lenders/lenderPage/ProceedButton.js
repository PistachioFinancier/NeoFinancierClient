import React from "react";
import { Button } from "antd";
import styled from "styled-components";

const StyledButton = styled(Button)`
  float: right;
`;

function ProceedButton() {
  return <StyledButton>Select and Proceed</StyledButton>;
}

export default ProceedButton;
