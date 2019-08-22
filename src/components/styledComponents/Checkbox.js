import styled, { css } from "styled-components";
import { Checkbox as checkbox } from "antd";

const Checkbox = styled(checkbox)`
  ${props =>
    props.lendercard &&
    css`
      span {
        border-width: 0;
        width: 100%;
      }
      input {
        width: 100%;
      }
    `}
`;

export default Checkbox;
