import React, { useState, useContext } from 'react';
import initialData from './initialData';

const AppContext = React.createContext();

export default function AppProvider({ children }) {
	const [ data, setData ] = useState(initialData);

	return <AppContext.Provider value={{ data, setData }}>{children}</AppContext.Provider>;
}

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppProvider, AppContext };
