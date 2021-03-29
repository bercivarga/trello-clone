import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Draggable } from 'react-beautiful-dnd';

import classes from './ToDoCard.module.css';

export default function ToDoCard({ content, index, passedId }) {
	return (
		<Draggable draggableId={passedId} index={index}>
			{(provided) => (
				<div
					className={classes.ToDoCard}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<p>{content}</p>
					<FaTimes style={{ cursor: 'pointer' }} />
				</div>
			)}
		</Draggable>
	);
}
