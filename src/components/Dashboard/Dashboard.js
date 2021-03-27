import React from 'react';
import { useGlobalContext } from '../../context';
import CardColumn from '../CardColumn/CardColumn';

import classes from './Dashboard.module.css';

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			<CardColumn />
		</div>
	);
}
