import React from 'react';
import 'antd/dist/antd.css';
import Calculators from './components/calculators/Calculators';
import LenderMap from './components/lenders/lenderPage/LenderMap';
import BorrowerMap from './components/borrowers/BorrowerMap';
import RealnetMarketData from './components/borrowers/RealnetDataCharts/RealnetMarketData';
import LenderList from './components/lenders/lenderList/LenderList';
import LenderListSelect from './components/lenders/lenderList/LenderListSelect';
import LenderPage from './components/lenders/lenderPage/LenderPage';
import DashboardCharts from './components/borrowers/DashboardCharts/DashboardCharts';
import ConsultantList from './components/consultants/ConsultantList';
import { Form } from 'react-formio';
import { Row, Col } from 'antd';
import DealPage from './components/dealPage/DealPage';
import ColliersDashboardUnderwriter from './components/borrowers/colliersDashboard/ColliersDashboardUnderwriter';
import ManagePortfolioPage from './components/borrowers/managePortfolio/ManagePortfolioPage';

function App() {
  const places = [
    {
      title: 'Square One',
      name: 'Square One',
      address: '100 City Centre Dr, Mississauga, Ontario',
      value: '$10,000,000',
      loan_amount: '$5,000,000',
      expiry_date: '2019-10-10',
    },
    {
      title: 'Tim Hortons',
      name: 'Tim Hortons',
      address: '30 Eglinton Ave W Unit C14, Mississauga, Ontario',
      value: '$5,525,000',
      loan_amount: '$5,550,000',
      expiry_date: '2019-10-31',
    },
    {
      title: 'UTM',
      name: 'UTM',
      address: 'University of Toronto Mississauga',
      value: '$2,000,000',
      loan_amount: '$1,400,000',
      expiry_date: '2019-02-10',
    },
    {
      title: 'Old Office',
      name: 'Old Office',
      address: '1 University Avenue, Toronto, Ontario',
      value: '$8,325,000',
      loan_amount: '$6,250,000',
      expiry_date: '2018-01-31',
    },
  ];

  return (
    <div className="App">
      {/* <Calculators /> */}

      {/* <LenderMap
        provinces={["ON", "QC"]}
        center={{ lat: 52.8415678, lng: -95.153671399999993 }}
      /> */}

      {/* <BorrowerMap places={places} /> */}
      {/* <RealnetMarketData /> */}
      {/* <LenderList></LenderList> */}
      {/* <LenderListSelect></LenderListSelect> */}
      {/* <LenderPage /> */}
      {/* <DashboardCharts></DashboardCharts> */}
      {/* <ConsultantList></ConsultantList> */}
      {/* <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <Form
            src="http://localhost:3001/newDealForm"
            onSubmitDone={function(submission) {
              console.log(submission);
            }}
          />
        </Col>
        <Col span={4}></Col>
      </Row> */}
      {/* <DealPage></DealPage> */}
      {/* <ColliersDashboardUnderwriter></ColliersDashboardUnderwriter> */}
      <ManagePortfolioPage></ManagePortfolioPage>
    </div>
  );
}

export default App;
