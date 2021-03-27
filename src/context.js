import React, { useState, useEffect, useContext, useCallback } from 'react';

const AppContext = React.createContext();

export default function AppProvider({ children }) {
	const [ todos, setTodos ] = useState([ 'First todo', 'Second todo', 'Third todo' ]);

	return <AppContext.Provider value={{ todos }}>{children}</AppContext.Provider>;
}

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppProvider, AppContext };
