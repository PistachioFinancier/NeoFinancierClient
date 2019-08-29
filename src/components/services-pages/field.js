import React, { Fragment } from "react";
import { Input } from "antd";

const field = props => {
  if (props.editRow === props.index) {
    return <Input defaultValue={props.cell}></Input>;
  } else {
    return <Fragment>{props.cell}</Fragment>;
  }
};

export default field;
