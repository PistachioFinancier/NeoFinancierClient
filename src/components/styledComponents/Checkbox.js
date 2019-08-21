import styled, { css } from "styled-components";
import { Checkbox as checkbox } from "antd";

const Checkbox = styled(checkbox)`
  ${props =>
    props.lenderCard &&
    css`
      span {
        border-width: 0;
      }
    `}
`;

export default Checkbox;
