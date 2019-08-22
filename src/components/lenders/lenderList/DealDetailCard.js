import React, { useState } from "react";
import Card from "../../styledComponents/Card";
import { Input } from "antd";

function DealDetailCard(props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(props.value);

  return (
    <Card dealdetail="true">
      <h5>{props.category}</h5>
      <span onClick={() => setEditing(true)}>
        {editing ? (
          <Input
            onPressEnter={e => {
              setValue(e.target.value);
              setEditing(false);
            }}
          />
        ) : (
          value
        )}
      </span>
    </Card>
  );
}

export default DealDetailCard;
