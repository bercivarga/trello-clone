import React from 'react';
import { useGlobalContext } from '../../context';
import ToDoCard from '../ToDoCard/ToDoCard';
import { Droppable } from 'react-beautiful-dnd';

import classes from './CardColumn.module.css';

export default function CardColumn({ column, tasks }) {
	return (
		<div className={classes.CardColumn}>
			<h2 className={classes.ColumnName}>{column.title}</h2>
			<div className={classes.Divider} />
			<Droppable droppableId={column.title}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{tasks.map((t, index) => {
							return <ToDoCard key={t.id} passedId={t.id} content={t.content} index={index} />;
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
}
