import React, { useState, useEffect } from "react";
import { Card, List, Button } from "antd";

function LenderCategory(props) {
  const [showMore, setShowMore] = useState(
    props.lenders.length > 10 ? true : false
  );

  const cards = [];
  for (let i in props.lenders) {
    cards.push(
      <Card
        bodyStyle={{ padding: 0, height: 25 }}
        style={{ width: 250 }}
        hoverable={true}
      >
        <List.Item.Meta
          title={<a href="/">{props.lenders[i].companyName}</a>}
        ></List.Item.Meta>
      </Card>
    );
  }

  return (
    <React.Fragment>
      <h2>{props.lenders[0].category}</h2>
      {cards}
      {showMore ? (
        <Button
          onClick={() => {
            setShowMore(false);
          }}
        >
          Show more
        </Button>
      ) : null}
    </React.Fragment>
  );
}

export default LenderCategory;
