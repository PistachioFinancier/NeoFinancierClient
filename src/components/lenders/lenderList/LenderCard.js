import React, { useState, useEffect } from "react";
import Card from "../../styledComponents/Card";
import Checkbox from "../../styledComponents/Checkbox";
import { List } from "antd";

function LenderCard(props) {
  const [highlighted, setHighlighted] = useState(props.highlighted);

  return (
    <Card lenderselect="true" highlighted={highlighted} hoverable={true}>
      <Checkbox lenderCard></Checkbox>
      <List.Item.Meta
        title={<a href="/">{props.lenders.companyName}</a>}
      ></List.Item.Meta>
      <div style={{ color: "#4962F5" }}>{props.lenders.rating}</div>
    </Card>
  );
}

export default LenderCard;
