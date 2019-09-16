import React, { Fragment } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Portfolio from "./Portfolio";
import styled from "styled-components";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 150px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

function Suites({ suite, type }) {
  return (
    <Fragment>
      {suite && (
        <Droppable droppableId={type} type="portfolio">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {suite.map((portfolio, index) => (
                <Draggable
                  key={portfolio._id}
                  draggableId={portfolio._id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div>
                      <Container
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {portfolio.portfolioName}
                        <Portfolio
                          properties={portfolio.properties}
                          type={portfolio._id}
                        />
                      </Container>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </Fragment>
  );
}

export default Suites;
