import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { useGlobalContext } from '../../context';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: auto;
	padding: 4px 10px 4px 10px;
	background-color: ${(props) => (props.isDragging ? '#e8e8e8' : 'white')};
	border-radius: 4px;
	margin-bottom: 10px;
	border: 2px solid transparent;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;

	&:hover {
		background-color: #e8e8e8;
	}
`;

export default function ToDoCard({ content, index, passedId, columnId }) {
	const { data, setData } = useGlobalContext();

	const handleTaskDelete = (id) => {
		const newTasks = Object(data.tasks);
		delete newTasks[id];

		const newTaskIds = Array.from(data.columns[columnId].taskIds);
		const filteredTaskIds = newTaskIds.filter((t) => t !== id);

		const newColumns = Object(data.columns);
		newColumns[columnId].taskIds = filteredTaskIds;

		const newState = {
			...data,
			tasks: newTasks,
			columns: newColumns
		};

		setData(newState);
		return;
	};

	return (
		<Draggable draggableId={passedId} index={index}>
			{(provided, snapshot) => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
				>
					<p>{content}</p>
					<FaTimes style={{ cursor: 'pointer' }} onClick={() => handleTaskDelete(passedId)} />
				</Container>
			)}
		</Draggable>
	);
}
