import React from 'react';
import ToDoCard from '../ToDoCard/ToDoCard';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import classes from './CardColumn.module.css';

const TaskList = styled.div`
	background-color: ${(props) => (props.isDraggingOver ? 'rgb(225, 225, 225)' : 'inherit')};
	transition: background-color 0.2s ease;
	padding: 20px;
`;

export default function CardColumn({ column, tasks, index }) {
	return (
		<Draggable draggableId={column.id} index={index}>
			{(provided) => (
				<div className={classes.CardColumn} ref={provided.innerRef} {...provided.draggableProps}>
					<h2 className={classes.ColumnName} {...provided.dragHandleProps}>
						{column.title}
					</h2>
					<div className={classes.Divider} />
					<Droppable droppableId={column.id} type="task">
						{(provided, snapshot) => (
							<TaskList
								ref={provided.innerRef}
								{...provided.droppableProps}
								isDraggingOver={snapshot.isDraggingOver}
							>
								{tasks.map((t, index) => {
									return <ToDoCard key={t.id} passedId={t.id} content={t.content} index={index} />;
								})}
								{provided.placeholder}
							</TaskList>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
}
