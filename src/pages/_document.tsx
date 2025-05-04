import {Head, Html, Main, NextScript} from 'next/document';

export default function Document() {
	// Dynamische Klasse basierend auf localStorage oder Prefers-Color-Scheme
	const getInitialTheme = `
        (function() {
            try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.className = 'dark';
                } else {
                    document.documentElement.className = '';
                }
            } catch (e) {}
        })()
    `;

	return (
		<Html lang="en">
			<Head>
				<link rel="icon" type="image/svg+xml" href="#"/>
				<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
				<meta name="apple-mobile-web-app-capable" content="yes"/>
				<meta name="mobile-web-app-capable" content="yes"/>
			</Head>
			<body>
			<script dangerouslySetInnerHTML={{__html: getInitialTheme}}/>
			{/*                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                document.querySelector('meta[name="theme-color"]').setAttribute('content', isDarkMode ? '#000000' : '#FFFFFF');
                            })();
                        `,
                    }}
                />*/}
			<Main/>
			<NextScript/>
			</body>
		</Html>
	);
}