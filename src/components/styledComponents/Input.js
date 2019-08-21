import styled, { css } from "styled-components";
import { Input as input } from "antd";
import propTypes from "prop-types";

const Input = styled(input)`
  ${props =>
    props.bold === true &&
    css`
      font-weight: bold;
      font-style: normal;
    `}
  ${props =>
    props.fullwidth === true &&
    css`
      width: 100%;
    `}
`;
Input.propTypes = {
  size: propTypes.string
};

/** @component */
export default Input;
