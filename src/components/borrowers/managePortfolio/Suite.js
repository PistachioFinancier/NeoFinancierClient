import React, { Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Portfolio from './Portfolio';
import styled from 'styled-components';
import { Typography } from 'antd'

const PortfolioContainer = styled.div`
  margin: 8px;
  border: 1px solid lightblue;
  border-radius: 2px;
  width: 200px;
  padding: 10px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

function Suite({ suite }) {
  const { Title } = Typography 
  return (
    <Fragment>
      {suite.portfolios &&
        suite.portfolios.map((portfolio, index) => (
          <Draggable key={portfolio._id} draggableId={portfolio._id} index={index}>
            {(provided, snapshot) => (
              <div>
                <PortfolioContainer
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Title level={3}>{portfolio.portfolioName}</Title>
                  <Portfolio properties={portfolio.properties} type={portfolio._id} />
                </PortfolioContainer>
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        ))}
    </Fragment>
  );
}

export default Suite;
