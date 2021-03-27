import React from 'react';
import { useGlobalContext } from '../../context';
import ToDoCard from '../ToDoCard/ToDoCard';

import classes from './CardColumn.module.css';

export default function CardColumn() {
	return (
		<div>
			<h2>Column name</h2>
			<ToDoCard />
		</div>
	);
}
