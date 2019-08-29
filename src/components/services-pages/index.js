import React, { Fragment, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Select,
  Table,
  Card,
  Button,
  Tag,
  Input
} from "antd";

function Services(props) {
  const [editRow, setEditRow] = useState(-1);

  const type = "Leases";

  const editButtonOnClick = (row, index) => {
    console.log(row);
    setEditRow(index);
    console.log(index);
  };

  const sampleData = [
    {
      name: "Hospital",
      submissionDate: "January 25 2019",
      paymentStatus: 5000,
      serviceStatus: 3,
      address: "1 Montgomery Street, Toronto ON",
      leases: 1,
      timing: 2
    },
    {
      name: "Country Style",
      submissionDate: "April 23 2019",
      paymentStatus: 10000,
      serviceStatus: 4,
      address: "83 Service Lane, Brampton ON",
      leases: 1,
      timing: 5
    },
    {
      name: "1 Regional Way",
      submissionDate: "November 12 2018",
      paymentStatus: 8000,
      serviceStatus: 5,
      address: "1 Regional Way, Edmonton AB",
      leases: 2,
      timing: 8
    }
  ];

  const columns = [
    {
      title: "Property Name",
      dataIndex: "name",
      key: "name",
      render: (cell, row, index) => {
        if (editRow === index) {
          return <Input defaultValue={cell}></Input>;
        } else {
          return <Fragment>{cell}</Fragment>;
        }
      }
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      key: "submissionDate",
      render: (cell, row, index) => {
        if (editRow !== -1) {
          return <Input value={cell}></Input>;
        } else {
          return <Fragment>{cell}</Fragment>;
        }
      }
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (cell, row, index) => {
        if (editRow !== -1) {
          return <Input value={cell}></Input>;
        } else {
          return <Fragment>{cell}</Fragment>;
        }
      }
    },
    {
      title: "Service Status (Months)",
      dataIndex: "serviceStatus",
      key: "serviceStatus",
      render: (cell, row, index) => {
        if (editRow !== -1) {
          return <Input value={cell}></Input>;
        } else {
          return <Fragment>{cell}</Fragment>;
        }
      }
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (cell, row, index) => {
        if (editRow !== -1) {
          return <Input value={cell}></Input>;
        } else {
          return <Fragment>{cell}</Fragment>;
        }
      }
    },
    {
      title: "Leases",
      dataIndex: "leases",
      key: "leases",
      render: (cell, row, index) => {
        if (editRow !== -1) {
          return <Input value={cell}></Input>;
        } else {
          return <Fragment>{cell}</Fragment>;
        }
      }
    },
    {
      title: "Timing (Days)",
      dataIndex: "timing",
      key: "timing",
      render: (cell, row, index) => {
        return (
          <Fragment>
            {cell}{" "}
            <Tag color="blue" onClick={() => editButtonOnClick(row, index)}>
              Edit
            </Tag>
          </Fragment>
        );
      }
    }
  ];

  return (
    <Fragment>
      <div style={{ "background-color": "blue", color: "white" }}>
        <p style={{ "padding-top": "20px", "padding-bottom": "20px" }}>
          Finneo utilizes an extensive network of 3rd party contacts to
          facilitate lease reviews and audits. Our team will then analyze &
          summarize the key points associated with each and every lease
          submitted to our team of experts. This will free up your time to
          better focus on negotiations.
        </p>
      </div>
      ​<h3>Leases</h3>
      <Table dataSource={sampleData} columns={columns} />
    </Fragment>
  );
}

export default Services;
