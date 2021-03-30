import React, { useState, useRef, useEffect } from 'react';
import ToDoCard from '../ToDoCard/ToDoCard';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { useGlobalContext } from '../../context';

import classes from './CardColumn.module.css';

const TaskList = styled.div`
	background-color: ${(props) => (props.isDraggingOver ? 'rgb(225, 225, 225)' : 'inherit')};
	transition: background-color 0.2s ease;
	padding: 20px;
`;

const NewTaskBtn = styled.div`
	width: calc(100% - 40px);
	margin: 10px auto 20px auto;
	cursor: pointer;

	&:hover {
		color: grey;
	}
`;

const Form = styled.form`
	width: calc(100% - 40px);
	margin: 0 auto 20px auto;
`;

const Input = styled.input`
	width: calc(98% - 10px);
	height: 24px;
	border: 1px solid #e8e8e8;
	border-radius: 4px;
	outline: none;
	padding-left: 10px;
`;

export default function CardColumn({ column, tasks, index }) {
	const [ showForm, setShowForm ] = useState(false);
	const [ newTask, setNewTask ] = useState('');
	const [ toggle, setToggle ] = useState(false);
	const [ newName, setNewName ] = useState('');

	const inputEl = useRef(null);

	const { data, setData } = useGlobalContext();

	useEffect(
		() => {
			if (toggle) {
				inputEl.current.focus();
			}
		},
		[ toggle ]
	);

	const changeShowForm = () => {
		setShowForm(!showForm);
	};

	const handleNameChange = (e) => {
		e.preventDefault();

		if (newName === '') {
			setToggle(false);
			return;
		}

		const newColumns = Object(data.columns);
		newColumns[column.id].title = newName;

		const newState = {
			...data,
			columns: newColumns
		};

		setData(newState);
		setToggle(false);
		return;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newTask === '') {
			return;
		}

		const newTasks = Object(data.tasks);
		newTasks[newTask] = {
			id: newTask,
			content: newTask
		};

		const newTaskIds = Array.from(data.columns[column.id].taskIds);
		newTaskIds.push(newTask);

		const newColumns = Object(data.columns);
		newColumns[column.id].taskIds = newTaskIds;

		const newState = {
			...data,
			tasks: newTasks,
			columns: newColumns
		};

		setData(newState);
		setNewTask('');
		setShowForm(false);
		return;
	};

	return (
		<Draggable draggableId={column.id} index={index}>
			{(provided) => (
				<div
					className={classes.CardColumn}
					ref={provided.innerRef}
					{...provided.draggableProps}
					onMouseOut={() => setToggle(false)}
				>
					{toggle ? (
						<Form onSubmit={(e) => handleNameChange(e)} style={{ marginBottom: '0' }}>
							<Input
								ref={inputEl}
								type="text"
								value={newName}
								name="newName"
								onChange={(e) => setNewName(e.target.value)}
								style={{
									height: '68px',
									padding: '0',
									backgroundColor: 'transparent',
									border: 'none',
									fontWeight: '700',
									fontSize: '1.5em',
									boxSizing: 'border-box'
								}}
								onKeyDown={(event) => {
									if (event.key === 'Escape') {
										setToggle(false);
										event.preventDefault();
										event.stopPropagation();
									}
								}}
							/>
						</Form>
					) : (
						<h2
							className={classes.ColumnName}
							{...provided.dragHandleProps}
							onClick={() => {
								setToggle(true);
							}}
						>
							{column.title}
						</h2>
					)}
					<div className={classes.Divider} />
					<Droppable droppableId={column.id} type="task">
						{(provided, snapshot) => (
							<TaskList
								ref={provided.innerRef}
								{...provided.droppableProps}
								isDraggingOver={snapshot.isDraggingOver}
							>
								{tasks.map((t, index) => {
									return (
										<ToDoCard
											key={t.id}
											passedId={t.id}
											content={t.content}
											index={index}
											columnId={column.id}
										/>
									);
								})}
								{provided.placeholder}
							</TaskList>
						)}
					</Droppable>
					<NewTaskBtn onClick={changeShowForm}>{`Add new task ${showForm ? '-' : '+'}`}</NewTaskBtn>
					<Form onSubmit={handleSubmit} style={{ display: `${showForm ? 'block' : 'none'}` }}>
						<Input
							type="text"
							name="newtask"
							value={newTask}
							onChange={(e) => setNewTask(e.target.value)}
						/>
					</Form>
				</div>
			)}
		</Draggable>
	);
}
