import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 150px;
  flex-grow: 1;
`;

function Portfolio({ properties, type }) {
  return (
    <Droppable droppableId={type} type={`property`}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          {properties.map((property, index) => (
            <Draggable
              key={property._id}
              draggableId={property._id}
              index={index}
            >
              {(provided, snapshot) => (
                <div>
                  <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {property.address}
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
  );
}

export default Portfolio;
