import React, { Fragment, useState, useEffect } from 'react';
import Suite from './Suite';
import styled from 'styled-components';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import { Button, Col, Row, Dropdown, Icon, Menu, Typography  } from 'antd';
import axios from 'axios';

const SuiteContainer = styled.div`
  margin: 8px;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 90%;
  min-height: 250px;
`;

function ManagePortfolioPage() {
  const [suiteData, setSuiteData] = useState();
  const [selectedSuiteIndexLeft, setSelectedIndexSuiteLeft] = useState();
  const [selectedSuiteIndexRight, setSelectedIndexSuiteRight] = useState();
  const [dataForColumns, setDataForColumns] = useState(null);

  const { Title } = Typography;

  useEffect(() => {
    fetch('http://localhost:9090')
      .then((res) => res.json())
      .then((res) => setSuiteData(res[0]));
  }, []);

  useEffect(() => {
    suiteData &&
      setDataForColumns([
        suiteData.multiPortfolio[selectedSuiteIndexLeft] || {},
        suiteData.multiPortfolio[selectedSuiteIndexRight] || {},
      ]);
  }, [selectedSuiteIndexLeft, selectedSuiteIndexRight]);

  const dropdownMenuOptionsLeft = suiteData && (
    <Menu onClick={({ key }) => setSelectedIndexSuiteLeft(key)}>
      {suiteData.multiPortfolio.map((suite, index) => {
        return (
          <Menu.Item
            key={index}
            disabled={Number(selectedSuiteIndexRight) === index ? true : false}
          >
            {suite.suiteName}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const dropdownMenuOptionsRight = suiteData && (
    <Menu onClick={({ key }) => setSelectedIndexSuiteRight(key)}>
      {suiteData.multiPortfolio.map((suite, index) => {
        return (
          <Menu.Item key={index} disabled={Number(selectedSuiteIndexLeft) === index ? true : false}>
            {suite.suiteName}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  function handleCancel() {}

  function handleSave() {
    axios
      .post(`http://localhost:9090/${suiteData.companyName}`, suiteData.multiPortfolio)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function onDragEnd(result) {
    const { destination, source, type } = result;

    // case: dropped outside of any droppable
    if (!destination) {
      return;
    }

    if (type === 'property') {
      const suiteOfItemDragged = suiteData.multiPortfolio.find((suite) =>
        suite.portfolios.some((portfolio) => portfolio._id === source.droppableId),
      );

      const suiteIndexSource = suiteData.multiPortfolio.findIndex(
        (suite) => suite._id === suiteOfItemDragged._id,
      );

      const suiteOfDestination = suiteData.multiPortfolio.find((suite) =>
        suite.portfolios.some((portfolio) => portfolio._id === destination.droppableId),
      );

      const suiteIndexDest = suiteData.multiPortfolio.findIndex(
        (suite) => suite._id === suiteOfDestination._id,
      );

      // case: property into same portfolio bucket
      if (source.droppableId === destination.droppableId) {
        const suiteIndexSource =
          suiteData.multiPortfolio[0].portfolios.findIndex(
            (portfolio) => portfolio._id === source.droppableId,
          ) >= 0
            ? 0
            : 1;

        const portfolioIndexSource = suiteData.multiPortfolio[
          suiteIndexSource
        ].portfolios.findIndex((portfolio) => portfolio._id === source.droppableId);

        const arrayAtSource = [
          ...suiteData.multiPortfolio[suiteIndexSource].portfolios[portfolioIndexSource].properties,
        ];

        const draggedProperty = arrayAtSource.splice(source.index, 1);

        arrayAtSource.splice(destination.index, 0, draggedProperty[0]);

        const newState = {
          ...suiteData,
        };

        newState.multiPortfolio[suiteIndexSource].portfolios[
          portfolioIndexSource
        ].properties = arrayAtSource;

        setSuiteData(newState);

        return;
      }

      // case: property dropped into different portfolio within same suite
      if (source.droppableId !== destination.droppableId && suiteIndexSource === suiteIndexDest) {
        const portfolioIndexSource = suiteData.multiPortfolio[
          suiteIndexSource
        ].portfolios.findIndex((portfolio) => portfolio._id === source.droppableId);

        const portfolioIndexDest = suiteData.multiPortfolio[suiteIndexSource].portfolios.findIndex(
          (portfolio) => portfolio._id === destination.droppableId,
        );

        const arrayAtSource = [
          ...suiteData.multiPortfolio[suiteIndexSource].portfolios[portfolioIndexSource].properties,
        ];

        const draggedProperty = arrayAtSource.splice(source.index, 1);

        const arrayAtDest = [
          ...suiteData.multiPortfolio[suiteIndexDest].portfolios[portfolioIndexDest].properties,
        ];

        arrayAtDest.splice(destination.index, 0, draggedProperty[0]);

        const newState = {
          ...suiteData,
        };

        newState.multiPortfolio[suiteIndexSource].portfolios[
          portfolioIndexSource
        ].properties = arrayAtSource;

        newState.multiPortfolio[suiteIndexDest].portfolios[
          portfolioIndexDest
        ].properties = arrayAtDest;

        setSuiteData(newState);

        return;
      }

      // case: property dropped into different portfolio in different suite
      if (suiteIndexSource !== suiteIndexDest) {
        const portfolioIndexSource = suiteData.multiPortfolio[
          suiteIndexSource
        ].portfolios.findIndex((portfolio) => portfolio._id === source.droppableId);

        const portfolioIndexDest = suiteData.multiPortfolio[suiteIndexDest].portfolios.findIndex(
          (portfolio) => portfolio._id === destination.droppableId,
        );

        const arrayAtSource = [
          ...suiteData.multiPortfolio[suiteIndexSource].portfolios[portfolioIndexSource].properties,
        ];

        const draggedProperty = arrayAtSource.splice(source.index, 1);

        const arrayAtDest = [
          ...suiteData.multiPortfolio[suiteIndexDest].portfolios[portfolioIndexDest].properties,
        ];

        arrayAtDest.splice(destination.index, 0, draggedProperty[0]);

        const newState = {
          ...suiteData,
        };

        newState.multiPortfolio[suiteIndexSource].portfolios[
          portfolioIndexSource
        ].properties = arrayAtSource;

        newState.multiPortfolio[suiteIndexDest].portfolios[
          portfolioIndexDest
        ].properties = arrayAtDest;

        setSuiteData(newState);

        return;
      }
    }

    if (type === 'portfolio') {
      const suiteIndexSource = suiteData.multiPortfolio.findIndex(
        (suite) => suite._id === source.droppableId,
      );

      const suiteIndexDest = suiteData.multiPortfolio.findIndex(
        (suite) => suite._id === destination.droppableId,
      );

      // case: portfolio dropped into same suite
      if (suiteIndexSource === suiteIndexDest) {
        const arrayAtSource = [...suiteData.multiPortfolio[suiteIndexSource].portfolios];

        const draggedPortfolio = arrayAtSource.splice(source.index, 1);

        arrayAtSource.splice(destination.index, 0, draggedPortfolio[0]);

        const newState = { ...suiteData };

        newState.multiPortfolio[suiteIndexSource].portfolios = arrayAtSource;

        setSuiteData(newState);

        return;
      }

      // case: portfolio dropped into different suite
      if (source.droppableId !== destination.droppableId) {
        const arrayAtSource = [...suiteData.multiPortfolio[suiteIndexSource].portfolios];

        const arrayAtDest = [...suiteData.multiPortfolio[suiteIndexDest].portfolios];

        const draggedPortfolio = arrayAtSource.splice(source.index, 1);

        arrayAtDest.splice(destination.index, 0, draggedPortfolio[0]);

        const newState = {
          ...suiteData,
        };

        newState.multiPortfolio[suiteIndexSource].portfolios = arrayAtSource;

        newState.multiPortfolio[suiteIndexDest].portfolios = arrayAtDest;

        setSuiteData(newState);

        return;
      }
    }
  }

  return (
    <Fragment>
      <Row>
        <Col span={11}>
          <Dropdown overlay={dropdownMenuOptionsLeft}>
            <a className="ant-dropdown-link">
              {suiteData
                ? selectedSuiteIndexLeft
                  ? suiteData.multiPortfolio[selectedSuiteIndexLeft].suiteName
                  : 'Select Suite'
                : 'Select Suite'}
              <Icon type="down" />
            </a>
          </Dropdown>
        </Col>
        <Col span={11}>
          <Dropdown overlay={dropdownMenuOptionsRight}>
            <a className="ant-dropdown-link">
              {suiteData
                ? selectedSuiteIndexRight
                  ? suiteData.multiPortfolio[selectedSuiteIndexRight].suiteName
                  : 'Select Suite'
                : 'Select Suite'}
              <Icon type="down" />
            </a>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
          <Col span={11}>
            {dataForColumns && dataForColumns[0] && (
              <SuiteContainer>
                <Droppable
                  droppableId={suiteData.multiPortfolio[selectedSuiteIndexLeft || 0]._id}
                  type="portfolio"
                  direction="horizontal"
                >
                  {(provided, snapshot) => (
                    <div style={{ minWidth: '200px', minHeight: '100px' }} ref={provided.innerRef}>
                      <Title level={2}>{dataForColumns[0].suiteName}</Title>
                      {dataForColumns && dataForColumns[0] && (
                        <Suite suite={dataForColumns[0]}></Suite>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </SuiteContainer>
            )}
          </Col>
          <Col span={11}>
            {dataForColumns && dataForColumns[1] && (
              <SuiteContainer>
                <Droppable
                  droppableId={suiteData.multiPortfolio[selectedSuiteIndexRight || 1]._id}
                  type="portfolio"
                  direction="horizontal"
                >
                  {(provided, snapshot) => (
                    <div style={{ minWidth: '200px', minHeight: '100px' }} ref={provided.innerRef}>
                      <Title level={2}>{dataForColumns[1].suiteName}</Title>
                      <Suite suite={dataForColumns[1]}></Suite>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </SuiteContainer>
            )}
          </Col>
        </DragDropContext>
      </Row>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>
    </Fragment>
  );
}

export default ManagePortfolioPage;
