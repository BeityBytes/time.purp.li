import {useEffect, useState} from 'react';

export const useThemes = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		// Check System Theme
		const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		setIsDarkMode(darkModeMediaQuery.matches);

		// Listener auf Änderungen des Theme-Modus
		const handleChange = (e: MediaQueryListEvent) => {
			setIsDarkMode(e.matches);
		};

		darkModeMediaQuery.addEventListener('change', handleChange);
		return () => {
			darkModeMediaQuery.removeEventListener('change', handleChange);
		};
	}, []);

	return isDarkMode;
};