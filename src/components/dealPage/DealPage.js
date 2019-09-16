import React, { useEffect, useState, Fragment } from "react";
import { Row, Col } from "antd";
import axios from "axios";

function DealPage() {
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    // const sampleData = {
    //   dealName: "qwre",
    //   financingType: "qwer",
    //   opportunityPurposeBackground: "zxcv",
    //   propertyAddress: "sadfxzcv",
    //   propertyType: "bridge",
    //   descriptionofProperty: "wqet",
    //   valuationSummary: "wet",
    //   borrower: "xcxzc",
    //   sponsor: "sdf",
    //   otherSecurity: "ertte",
    //   propertyValue: 3522
    // };

    // return sampleData;

    axios.get(`localhost:3001/`).then(res => {
      const persons = res.data;
      setData({ persons });
    });
  }

  // const whatever = [];
  // let x = 0;
  // for (let i of Object.keys(myData)) {
  //   whatever.push(
  //     <Row key={x++}>
  //       <Col span={8}>{i}</Col>
  //       <Col span={16}>{myData[i]}</Col>
  //     </Row>
  //   );
  // }

  return <Fragment>{console.log(data)}</Fragment>;
}

export default DealPage;
