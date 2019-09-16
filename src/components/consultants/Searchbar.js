import React, { Fragment } from "react";
import { Input } from "antd";

function Searchbar({ setSearchFilter }) {
  return (
    <Fragment>
      <Input
        placeholder="Search By Company Name"
        onChange={e => setSearchFilter(e.target.value)}
      ></Input>
    </Fragment>
  );
}

export default Searchbar;
