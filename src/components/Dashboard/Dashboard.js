import React from 'react';
import CardColumn from '../CardColumn/CardColumn';
import { FaThList } from 'react-icons/fa';
import { DragDropContext } from 'react-beautiful-dnd';
import { useGlobalContext } from '../../context';

import classes from './Dashboard.module.css';

export default function Dashboard() {
	// allow for a maximum of five columns in total in the early stages of development

	const { data } = useGlobalContext();

	const onDragEnd = (result) => {
		// TODO
	};

	return (
		<div className={classes.Dashboard}>
			<div className={classes.Header}>
				<FaThList style={{ marginRight: '20px', width: '30px', height: '30px' }} />
				<h1>Dashboard</h1>
			</div>
			<div className={classes.Columns}>
				<DragDropContext onDragEnd={onDragEnd}>
					{data.columnOrder.map((c) => {
						const column = data.columns[c];
						const tasks = data.columns[c].taskIds.map((taskId) => data.tasks[taskId]);
						return <CardColumn key={c.id} column={column} tasks={tasks} />;
					})}
				</DragDropContext>
			</div>
		</div>
	);
}
