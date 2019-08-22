import React, { useState } from "react";
import Card from "../../styledComponents/Card";
import Checkbox from "../../styledComponents/Checkbox";
import { List } from "antd";

function LenderCard(props) {
  const [highlighted, setHighlighted] = useState(props.highlighted);

  return (
    <Card lenderselect="true" highlighted={highlighted} hoverable={true}>
      <Checkbox onChange={e => console.log(e)} lendercard="true"></Checkbox>
      <List.Item.Meta
        title={
          <a style={{ color: "#000000" }} href="/">
            {props.lenders.companyName}
          </a>
        }
        style={{ paddingLeft: "8px", borderLeft: "2px solid #E8E9F1" }}
      ></List.Item.Meta>
      <span
        style={{
          color: "#4962F5",
          fontWeight: "600",
          textAlign: "right"
        }}
      >
        {props.lenders.rating}
      </span>
    </Card>
  );
}

export default LenderCard;
