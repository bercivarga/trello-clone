import React from 'react';
import CardColumn from '../CardColumn/CardColumn';
import { FaThList } from 'react-icons/fa';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useGlobalContext } from '../../context';
import styled from 'styled-components';

import classes from './Dashboard.module.css';

const NewColumnBtn = styled.div`
	width: 280px;
	min-width: 280px;
	height: 70px;
	min-height: 70px;
	border-radius: 8px;
	background-color: #fff;
	padding-left: 20px;
	cursor: pointer;
	display: flex;
	flex-direction: row;

	&:hover {
		background-color: #e8e8e8;
	}
`;

const Spacer = styled.div`
	width: 40px;
	height: 70px;
	min-width: 40px;
	min-height: 70px;
	max-width: 40px;
	max-height: 70px;
	display: inline-block;
`;

export default function Dashboard() {
	const { data, setData } = useGlobalContext();

	const handleAddNewColumn = (n) => {
		const newColumnName = String(n);

		const newColumnOrder = Array.from(data.columnOrder);
		newColumnOrder.push(newColumnName);

		const newColumns = Object(data.columns);
		newColumns[newColumnName] = {
			id: newColumnName,
			title: 'New column',
			taskIds: []
		};

		const newState = {
			...data,
			columns: newColumns,
			columnOrder: newColumnOrder
		};
		setData(newState);
		console.log(newState);
		return;
	};

	const onDragEnd = (result) => {
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		if (type === 'column') {
			const newColumnOrder = Array.from(data.columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);

			const newState = {
				...data,
				columnOrder: newColumnOrder
			};

			setData(newState);
			return;
		}

		const start = data.columns[source.droppableId];
		const finish = data.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);

			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				taskIds: newTaskIds
			};

			const newState = {
				...data,
				columns: {
					...data.columns,
					[newColumn.id]: newColumn
				}
			};

			setData(newState);
			return;
		}

		// Moving to another column

		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds
		};

		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds
		};

		const newState = {
			...data,
			columns: {
				...data.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish
			}
		};

		setData(newState);
		return;
	};

	return (
		<div className={classes.Dashboard}>
			<div className={classes.Header}>
				<div className={classes.Logo}>
					<FaThList style={{ marginRight: '20px', width: '30px', height: '30px' }} />
					<h1>Dashboard</h1>
				</div>
				<div style={{ width: '100vw', height: '4px', backgroundColor: 'rgb(204, 182, 255)' }} />
			</div>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="all-columns" direction="horizontal" type="column">
					{(provided) => (
						<div className={classes.Columns} ref={provided.innerRef} {...provided.droppableProps}>
							{data.columnOrder.map((c, index) => {
								const column = data.columns[c];
								const tasks = data.columns[c].taskIds.map((taskId) => data.tasks[taskId]);
								return <CardColumn key={column.id} column={column} tasks={tasks} index={index} />;
							})}
							{provided.placeholder}
							<NewColumnBtn onClick={() => handleAddNewColumn(Math.floor(Math.random() * 10000))}>
								<h2>Add new column +</h2>
							</NewColumnBtn>
							<Spacer />
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}
