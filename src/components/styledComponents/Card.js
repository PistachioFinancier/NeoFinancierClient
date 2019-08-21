import styled, { css } from "styled-components";
import { Card as card } from "antd";

const Card = styled(card)`
  ${props =>
    props.lenderselect === "true" &&
    css`
      margin: 8px 0px;
      .ant-card-body {
        padding: 0 6px 0 0
        display: grid
        grid-template-columns: 0fr 1fr 7fr 0fr
        align-items: center
        border: 1px solid #E0E0E0;
        border-radius: 2px;
      h4 {
          margin-bottom: 0;
        }
      }
    `}
  ${props =>
    props.lenderselect === "false" &&
    css`
      margin: 8px 0px;
      .ant-card-body {
        padding: 0 6px 0 0
        display: grid
        grid-template-columns: 0fr 8fr 1fr 0fr
        align-items: center
        border: 1px solid #E0E0E0;
        border-radius: 2px;
      h4 {
          margin-bottom: 0;
        }
      }
    `}
  ${props =>
    props.button &&
    css`
      margin: 8px 0px;
      color: #4962F5;
      background-color: #E8E9F1;
      .ant-card-body {
        padding: 0
        text-align: center
      }
   `}
  ${props =>
    props.bar &&
    css`
      height: 150px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      background-color: #4962f5;
      box-shadow: 0 2px 10px 0 rgba(73, 98, 245, 0.4);
    `}
  ${props =>
    props.dealdetail &&
    css`
      height: 120px;
      width: 100px
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      background-color: #ffffff;
      box-shadow: 0 2px 10px 0 rgba(73, 98, 245, 0.4);
    `}
`;

export default Card;
