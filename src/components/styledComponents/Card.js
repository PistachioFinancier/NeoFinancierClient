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
        grid-template-columns: 0px 22px auto 30px 0px
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
      font-weight: 600
      .ant-card-body {
        padding: 0
        text-align: center
      }
   `}
  ${props =>
    props.bar &&
    css`
      height: auto;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      background-color: #5064d4
      box-shadow: 0 2px 10px 0 rgba(73, 98, 245, 0.4);
      .ant-card-body {
        padding: 15px;
      }
    `}
  ${props =>
    props.dealdetail &&
    css`
      height: 60px;
      width: 90px
      border: 1px solid white;
      border-radius: 6px;
      background-color: #5e77ff;
      box-shadow: 0 2px 10px 0 rgba(73, 98, 245, 0.4);
      .ant-card-body {
        padding: 0
        text-align: center
      }
      h5 {
        color: white
        text-align: left
        font-size: 11px
        font-weight: 650
      }
      span {
        color: white
        font-size: 14px
        font-weight: 500
      }
    `}
`;

export default Card;
