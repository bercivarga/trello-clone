import React, { useState, useEffect, useContext, useCallback } from 'react';

const AppContext = React.createContext();

export default function AppProvider({ children }) {
	return <AppContext.Provider value={'hi'}>{children}</AppContext.Provider>;
}

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppProvider, AppContext };
