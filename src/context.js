import React, { useState, useEffect, useContext, useCallback } from 'react';

const AppContext = React.createContext();

export default function AppProvider({ children }) {
	const [ todos, setTodos ] = useState([ '1', '2', '3' ]);

	return <AppContext.Provider value={{ todos }}>{children}</AppContext.Provider>;
}

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppProvider, AppContext };
