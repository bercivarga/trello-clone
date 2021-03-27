import React from 'react';
import { useGlobalContext } from '../../context';
import CardColumn from '../CardColumn/CardColumn';
import { FaThList } from 'react-icons/fa';

import classes from './Dashboard.module.css';

export default function Dashboard() {
	return (
		<div className={classes.Dashboard}>
			<div className={classes.Header}>
				<FaThList style={{ marginRight: '20px', width: '30px', height: '30px' }} />
				<h1>Dashboard</h1>
			</div>
			<div className={classes.Columns}>
				<CardColumn />
				<CardColumn />
				<CardColumn />
				<CardColumn />
				<CardColumn />
			</div>
		</div>
	);
}
