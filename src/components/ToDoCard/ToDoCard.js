import React from 'react';
import { useGlobalContext } from '../../context';
import { FaCheck, FaTimes } from 'react-icons/fa';

import classes from './ToDoCard.module.css';

export default function ToDoCard({ content }) {
	return (
		<div className={classes.ToDoCard}>
			<p>{content}</p>
			<FaCheck style={{ marginRight: '10px' }} />
			<FaTimes />
		</div>
	);
}
