import React, { useState, useEffect } from "react";
import { Card, List, Button } from "antd";

//////// hide "show more" button if incoming data.length is less than 10

function LenderCategory(props) {
  const [collapsed, setCollapsed] = useState(true);
  const [cardsToDisplay, setCardsToDisplay] = useState();

  useEffect(() => {
    populateCategories();
  }, [collapsed, props]);

  const cards = [];

  // collapse functionality
  const numberOfLenders = props.lenders.length;

  const [showShowMoreButton, setShowShowMoreButton] = useState(
    numberOfLenders > 10 ? true : false
  );

  const [showShowLessButton, setShowShowLessButton] = useState(false);

  function populateCategories() {
    if (collapsed) {
      let numLendersToShow = numberOfLenders < 10 ? numberOfLenders : 10;
      for (let i = 0; i < numLendersToShow; i++) {
        cards.push(
          <Card
            key={i}
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
    } else {
      for (let i = 0; i < numberOfLenders; i++) {
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
    }
    setCardsToDisplay(cards);
  }

  return (
    <React.Fragment>
      <h2>{props.lenders[0] ? props.lenders[0].category : null}</h2>
      {cardsToDisplay}
      {showShowMoreButton ? (
        <Button
          onClick={() => {
            setCollapsed(false);
            setShowShowMoreButton(false);
            setShowShowLessButton(true);
          }}
        >
          Show more
        </Button>
      ) : null}
      {showShowLessButton ? (
        <Button
          onClick={() => {
            setCollapsed(true);
            setShowShowMoreButton(true);
            setShowShowLessButton(false);
          }}
        >
          Show less
        </Button>
      ) : null}
    </React.Fragment>
  );
}

export default LenderCategory;
