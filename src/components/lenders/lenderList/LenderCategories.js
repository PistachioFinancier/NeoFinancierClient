import React from "react";
import LenderCategory from "./LenderCategory";
import { Col, Row } from "antd";

function LenderCategories(props) {
  const listOfLendersPerCategoryCol1 = [];
  const listOfLendersPerCategoryCol2 = [];
  const listOfLendersPerCategoryCol3 = [];
  const listOfLendersPerCategoryCol4 = [];
  let j = 0;
  let k = 0;

  // populate all columns
  for (let i in props.categories) {
    if (k === 0) {
      listOfLendersPerCategoryCol1.push(
        <LenderCategory
          selectable={props.selectable}
          key={j++}
          lenders={props.lenders.filter(
            x => x.category === props.categories[i]
          )}
        />
      );
      k++;
    } else if (k === 1) {
      listOfLendersPerCategoryCol2.push(
        <LenderCategory
          selectable={props.selectable}
          key={j++}
          lenders={props.lenders.filter(
            x => x.category === props.categories[i]
          )}
        />
      );
      k++;
    } else if (k === 2) {
      listOfLendersPerCategoryCol3.push(
        <LenderCategory
          selectable={props.selectable}
          key={j++}
          lenders={props.lenders.filter(
            x => x.category === props.categories[i]
          )}
        />
      );
      k++;
    } else if (k === 3) {
      listOfLendersPerCategoryCol4.push(
        <LenderCategory
          selectable={props.selectable}
          key={j++}
          lenders={props.lenders.filter(
            x => x.category === props.categories[i]
          )}
        />
      );
      k -= 3;
    }
  }

  return (
    <Row gutter={60}>
      <Col span={6}>{listOfLendersPerCategoryCol1}</Col>
      <Col span={6}>{listOfLendersPerCategoryCol2}</Col>
      <Col span={6}>{listOfLendersPerCategoryCol3}</Col>
      <Col span={6}>{listOfLendersPerCategoryCol4}</Col>
    </Row>
  );
}

export default LenderCategories;
