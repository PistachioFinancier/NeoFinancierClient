import React from "react";
import LenderCategory from "./LenderCategory";
import { Col, Row } from "antd";

function LenderCategories(props) {
  const listOfLendersPerCategory = [[], [], [], []];

  let j = 0;
  let k = 0;

  function populateArrays() {
    for (let i in props.categories) {
      listOfLendersPerCategory[k].push(
        <LenderCategory
          selectable={props.selectable}
          key={j++}
          lenders={props.lenders.filter(
            x => x.category === props.categories[i]
          )}
        />
      );
      k++;
      if (k === 4) {
        k -= 4;
      }
    }
  }

  populateArrays();

  return (
    <Row gutter={60}>
      <Col span={6}>{listOfLendersPerCategory[0]}</Col>
      <Col span={6}>{listOfLendersPerCategory[1]}</Col>
      <Col span={6}>{listOfLendersPerCategory[2]}</Col>
      <Col span={6}>{listOfLendersPerCategory[3]}</Col>
    </Row>
  );
}

export default LenderCategories;
