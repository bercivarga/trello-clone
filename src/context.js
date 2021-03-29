import React, { useState, useEffect, useContext, useCallback } from 'react';
import initialData from './initialData';

const AppContext = React.createContext();

export default function AppProvider({ children }) {
	const [ data, setData ] = useState(initialData);

	return <AppContext.Provider value={{ data }}>{children}</AppContext.Provider>;
}

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppProvider, AppContext };
