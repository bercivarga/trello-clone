const initialData = {
	tasks: {
		'task-1': { id: 'task-1', content: 'Take out the garbage' },
		'task-2': { id: 'task-2', content: 'Work on my projects' },
		'task-3': { id: 'task-3', content: 'Reach world domination' },
		'task-4': { id: 'task-4', content: 'Cook dinner' },
		'task-5': { id: 'task-5', content: 'Play some GeoGuessr' }
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'Backlog',
			taskIds: [ 'task-2', 'task-4', 'task-5' ]
		},
		'column-2': {
			id: 'column-2',
			title: 'In progress',
			taskIds: [ 'task-3' ]
		},
		'column-3': {
			id: 'column-3',
			title: 'Done',
			taskIds: [ 'task-1' ]
		}
	},
	// Facilitate reordering of the columns
	columnOrder: [ 'column-1', 'column-2', 'column-3' ]
};

export default initialData;
