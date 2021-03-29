import React from 'react';
import ToDoCard from '../ToDoCard/ToDoCard';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import classes from './CardColumn.module.css';

const TaskList = styled.div`
	background-color: ${(props) => (props.isDraggingOver ? 'rgb(225, 225, 225)' : 'rgb(247, 247, 247)')};
	transition: background-color 0.2s ease;
	padding: 20px;
`;

export default function CardColumn({ column, tasks }) {
	return (
		<div className={classes.CardColumn}>
			<h2 className={classes.ColumnName}>{column.title}</h2>
			<div className={classes.Divider} />
			<Droppable droppableId={column.id}>
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
	);
}
