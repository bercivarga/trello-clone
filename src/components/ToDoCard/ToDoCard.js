import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: auto;
	padding: 4px 10px 4px 10px;
	background-color: ${(props) => (props.isDragging ? '#efeae1' : 'white')};
	border-radius: 4px;
	margin-bottom: 10px;
	border: 2px solid transparent;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;

	&:hover {
		background-color: #efeae1;
	}
`;

export default function ToDoCard({ content, index, passedId }) {
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
					<FaTimes style={{ cursor: 'pointer' }} />
				</Container>
			)}
		</Draggable>
	);
}
