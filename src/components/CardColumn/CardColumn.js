import React from 'react';
import { useGlobalContext } from '../../context';
import ToDoCard from '../ToDoCard/ToDoCard';

import classes from './CardColumn.module.css';

export default function CardColumn() {
	const { todos } = useGlobalContext();

	return (
		<div className={classes.CardColumn}>
			<h2 className={classes.ColumnName}>Column name</h2>
			<div className={classes.Divider} />
			{todos.map((t) => {
				return <ToDoCard key={t} content={t} />;
			})}
		</div>
	);
}
