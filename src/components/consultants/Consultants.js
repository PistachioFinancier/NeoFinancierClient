import React, { Fragment } from "react";
import ConsultantCard from "./ConsultantCard";

function Consultants({ data, selectedCompanies, setSelectedCompanies }) {
  return (
    <Fragment>
      {data.map(consultant => {
        return (
          <ConsultantCard
            key={consultant.company}
            company={consultant.company}
            selectedCompanies={selectedCompanies}
            setSelectedCompanies={setSelectedCompanies}
            checked={
              selectedCompanies.includes(consultant.company) ? true : false
            }
          ></ConsultantCard>
        );
      })}
    </Fragment>
  );
}

export default Consultants;
