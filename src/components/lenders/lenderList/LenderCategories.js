import React, { useState, useEffect } from "react";
import LenderCategory from "./LenderCategory";
import { Col } from "antd";

function LenderCategories(props) {
  const listOfLendersPerCategory = [];
  let j = 0;

  for (let i of props.categories) {
    listOfLendersPerCategory.push(
      <LenderCategory
        key={j++}
        lenders={props.lenders.filter(x => x.category === i)}
      />
    );
  }

  return (
    <React.Fragment>
      <Col>{listOfLendersPerCategory}</Col>
    </React.Fragment>
  );
}

export default LenderCategories;
