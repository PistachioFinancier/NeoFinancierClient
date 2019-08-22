import React, { useState, useEffect } from "react";
import { List, Typography } from "antd";

import Card from "../../styledComponents/Card";
import LenderCard from "./LenderCard";

function LenderCategory(props) {
  const { Title } = Typography;

  const [collapsed, setCollapsed] = useState(true);
  const [cardsToDisplay, setCardsToDisplay] = useState();

  useEffect(() => {
    populateCategories();
    if (props.lenders.length > 10 && collapsed) {
      setShowShowMoreButton(true);
    } else {
      setShowShowMoreButton(false);
    }
  }, [collapsed, props]);

  const cards = [];

  // collapse functionality
  const numberOfLenders = props.lenders.length;

  const [showShowMoreButton, setShowShowMoreButton] = useState(
    numberOfLenders > 10 ? true : false
  );

  const [showShowLessButton, setShowShowLessButton] = useState(false);

  function populateCategories() {
    if (props.selectable) {
      if (collapsed) {
        let numLendersToShow = numberOfLenders < 10 ? numberOfLenders : 10;
        for (let i = 0; i < numLendersToShow; i++) {
          cards.push(
            <LenderCard key={i} lenders={props.lenders[i]}></LenderCard>
          );
        }
      } else {
        for (let i = 0; i < numberOfLenders; i++) {
          cards.push(
            <LenderCard key={i} lenders={props.lenders[i]}></LenderCard>
          );
        }
      }
    } else {
      if (collapsed) {
        let numLendersToShow = numberOfLenders < 10 ? numberOfLenders : 10;
        for (let i = 0; i < numLendersToShow; i++) {
          cards.push(
            <Card lenderselect="false" key={i} hoverable={true}>
              <List.Item.Meta
                title={
                  <a style={{ color: "#000000" }} href="/">
                    {props.lenders[i].companyName}
                  </a>
                }
              ></List.Item.Meta>
              <div style={{ color: "#4962F5" }}>{props.lenders[i].rating}</div>
            </Card>
          );
        }
      } else {
        for (let i = 0; i < numberOfLenders; i++) {
          cards.push(
            <Card lenderselect="false" key={i} hoverable={true}>
              <List.Item.Meta
                title={
                  <a style={{ color: "#000000" }} href="/">
                    {props.lenders[i].companyName}
                  </a>
                }
              ></List.Item.Meta>
              {props.lenders[i].rating}
            </Card>
          );
        }
      }
    }
    setCardsToDisplay(cards);
  }

  return (
    <React.Fragment>
      <Title level={4} style={{ padding: "30px 0 15px 0" }}>
        {props.lenders[0] ? props.lenders[0].category : null}
      </Title>
      {cardsToDisplay}
      {showShowMoreButton && (
        <Card
          button="true"
          hoverable={true}
          onClick={() => {
            setCollapsed(false);
            setShowShowMoreButton(false);
            setShowShowLessButton(true);
          }}
        >
          Show more
        </Card>
      )}
      {showShowLessButton && (
        <Card
          button="true"
          hoverable={true}
          onClick={() => {
            setCollapsed(true);
            setShowShowMoreButton(true);
            setShowShowLessButton(false);
          }}
        >
          Show less
        </Card>
      )}
    </React.Fragment>
  );
}

export default LenderCategory;
