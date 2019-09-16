import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    border: 1px solid lightgrey
    padding: 8px;
    border-radius: 2px;
    margin-bottom: 8px;
    background-color: white
    `;

function Property({ property, index }) {
  return (
    <Draggable draggableId={property._id} index={index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {property.address}
        </Container>
      )}
    </Draggable>
  );
}

export default Property;
