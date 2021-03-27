import React from 'react';
import { useGlobalContext } from '../../context';

import classes from './ToDoCard.module.css';

export default function ToDoCard() {
	const { todos } = useGlobalContext();

	return (
		<div>
			{todos.map((t, index) => {
				return <p>{t}</p>;
			})}
		</div>
	);
}
