import '../styles/globals.css';
import {AppProps} from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';


export default function MyApp({Component, pageProps}: AppProps) {

		useEffect(() => {
			document.body.style.userSelect = 'none';  // Verhindert Markierung
			document.body.style.overflow = 'hidden';  // Verhindert Scrollen
		}, []);

		useEffect(() => {
			// Rechtsklick verhindern
			const disableRightClick = (e: MouseEvent) => {
				e.preventDefault();
			};

			// Rechtsklick auf der gesamten Seite deaktivieren
			document.addEventListener('contextmenu', disableRightClick);

			// Aufräumen, wenn die Komponente unmountet wird
			return () => {
				document.removeEventListener('contextmenu', disableRightClick);
			};
		}, []);

		useEffect(() => {
			const disableShortcuts = (e: KeyboardEvent) => {
				// Verhindert das Öffnen der Entwicklertools mit F12 und das Kopieren mit Ctrl+C
				if (e.key === 'F12' || (e.ctrlKey && (e.key === 'c' || e.key === 'C'))) {
					e.preventDefault();
				}
			};

			document.addEventListener('keydown', disableShortcuts);

			return () => {
				document.removeEventListener('keydown', disableShortcuts);
			};
		}, []);

		useEffect(() => {
			const disableDrag = (e: DragEvent) => e.preventDefault();

			// Drag-and-Drop für alle Elemente deaktivieren
			document.addEventListener('dragstart', disableDrag);

			return () => {
				document.removeEventListener('dragstart', disableDrag);
			};
		}, []);

		useEffect(() => {
			const preventConsole = () => {
				console.log = function() {};
				console.info = function() {};
				console.warn = function() {};
				console.error = function() {};
			};

			preventConsole();
		}, []);

		useEffect(() => {
			document.addEventListener('copy', (e) => e.preventDefault());
			document.addEventListener('cut', (e) => e.preventDefault());

			return () => {
				document.removeEventListener('copy', (e) => e.preventDefault());
				document.removeEventListener('cut', (e) => e.preventDefault());
			};
		}, []);

		useEffect(() => {
			document.addEventListener('DOMContentLoaded', () => {
				if (window.top !== window.self) {
					// Die Seite wird in einem Iframe angezeigt, also verlassen wir sie
					// @ts-ignore
					window.top.location = window.self.location;
				}
			});
		}, []);

		useEffect(() => {
			if ('geolocation' in navigator) {
				// Überschreibe die Geolocation-Funktion, um zu verhindern, dass sie aufgerufen wird
				navigator.geolocation.getCurrentPosition = function () {
					// Verhindere Geolocation-Anfragen
				};
			}
		}, []);

	return (
		<>
			<style jsx global>{`
				body {
		          user-select: none; /* Verhindert Textmarkierung */
		          overflow: hidden;  /* Verhindert das Scrollen */
		        }
		    `}</style>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<meta name="referrer" content="no-referrer"/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}