import React, { Fragment } from "react";
import { Tabs } from "antd";

function CategorySelector({ setSelectedCategory, consultantCategories }) {
  const { TabPane } = Tabs;

  function callback(key) {
    setSelectedCategory(key);
  }

  const categories = consultantCategories.map(category => {
    return <TabPane tab={category} key={category}></TabPane>;
  });

  return (
    <Fragment>
      <Tabs onChange={callback}>{categories}</Tabs>
    </Fragment>
  );
}

export default CategorySelector;
