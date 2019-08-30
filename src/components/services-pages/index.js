import React, { Fragment } from "react";
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
  const type = "Lease";

  const leaseData = [
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

  const leaseColumns = [
    {
      title: "Property Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      key: "submissionDate"
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus"
    },
    {
      title: "Service Status (Months)",
      dataIndex: "serviceStatus",
      key: "serviceStatus"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Leases",
      dataIndex: "leases",
      key: "leases"
    },
    {
      title: "Timing (Days)",
      dataIndex: "timing",
      key: "timing"
    }
  ];

  const leaseDescription = `Finneo utilizes an extensive network of 3rd party contacts to
    facilitate lease reviews and audits. Our team will then analyze & summarize the key 
    points associated with each and every lease submitted to our team of experts. 
    This will free up your time to better focus on negotiations.`;

  const droneData = [
    {
      name: "sample",
      submissionDate: "April 18, 2017",
      paymentStatus: "Pending",
      serviceStatus: "Pending",
      address: "test",
      timing: "my time",
      purpose: "my purpose",
      url: "insert url here"
    }
  ];

  const droneColumns = [
    {
      title: "Property Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      key: "submissionDate"
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus"
    },
    {
      title: "Service Status",
      dataIndex: "serviceStatus",
      key: "serviceStatus"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Timing",
      dataIndex: "timing",
      key: "timing"
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose"
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url"
    }
  ];

  const droneDescription = `Pistachio Financier offers an exclusive drone service to create state of the 
  art marketing materials. Through our years of experience, we have developed a vast network of contacts 
  across Canada that are guaranteed to give you the lowest possible rates with any aerial drone footage 
  required to maximize the marketing potential of your property.`;

  const inspectionsData = [
    {
      name: "sample",
      submissionDate: "January 1, 2017",
      paymentStatus: "Pending",
      serviceStatus: "Pending",
      address: "test",
      timing: "my time",
      purpose: "my purpose",
      url: "insert url here"
    }
  ];

  const inspectionsDescription = `Assessing the condition of buildings, facilities or lands is critical, 
  and often overlooked by property owners and developers looking for financing. In addition to the many 
  other services provided, the decades of real estate experience provided by the Pistachio team allows 
  us to connect you with the most reliable and reputable inspectors in the industry.`;

  let showData;
  let showColumns;
  let showDescription;

  switch (type) {
    case "Lease":
      showData = leaseData;
      showColumns = leaseColumns;
      showDescription = leaseDescription;
      break;
    case "Drone":
      showData = droneData;
      showColumns = droneColumns;
      showDescription = droneDescription;
      break;
    default:
      showData = inspectionsData;
      showColumns = droneColumns;
      showDescription = inspectionsDescription;
  }

  return (
    <Fragment>
      <div style={{ "background-color": "blue", color: "white" }}>
        <p style={{ "padding-top": "20px", "padding-bottom": "20px" }}>
          {showDescription}
        </p>
      </div>
      ​<h3>{type}</h3>
      <Table dataSource={showData} columns={showColumns} />
    </Fragment>
  );
}

export default Services;
