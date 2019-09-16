import React from "react";
import { Card, Checkbox } from "antd";

function ConsultantCard({
  company,
  selectedCompanies,
  setSelectedCompanies,
  checked
}) {
  function handleCheck(e) {
    e.target.checked
      ? setSelectedCompanies([...selectedCompanies, e.target.value])
      : setSelectedCompanies(
          selectedCompanies.filter(company => company !== e.target.value)
        );
  }

  return (
    <Card hoverable={true}>
      <Checkbox
        defaultChecked={checked}
        value={company}
        onChange={e => handleCheck(e)}
      >
        <a href="/">{company}</a>
      </Checkbox>
    </Card>
  );
}

export default ConsultantCard;
