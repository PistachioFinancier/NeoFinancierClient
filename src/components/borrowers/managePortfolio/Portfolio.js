import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from 'antd'

function Portfolio({ properties, type }) {
  return (
    <Droppable droppableId={type} type={'property'}>
      {(provided, snapshot) => (
        <div style={{ minHeight: '100px' }} ref={provided.innerRef}>
          {properties.map((property, index) => (
            <Draggable key={property._id} draggableId={property._id} index={index}>
              {(provided, snapshot) => (
                <div>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card title={property.address}>
                      Some content
                    </Card>
                  </div>
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
