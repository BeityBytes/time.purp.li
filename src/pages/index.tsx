// src/pages/index.tsx
import React, { useState, useEffect } from 'react';
import {useThemes} from '@/hooks/useThemes';
import Head from 'next/head';


export default function Home() {
    const isThemes = useThemes();

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isThemes) {
            htmlElement.classList.add('dark');
            htmlElement.classList.remove('light');
        } else {
            htmlElement.classList.remove('dark');
            htmlElement.classList.add('light');
        }
    }, [isThemes]);

    // State to store the current time
    const [time, setTime] = useState<string>(null!);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        // Set initial time when the page is first rendered
        setTime(new Date().toLocaleTimeString());

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    // If the time hasn't been set yet (server-side rendering), return null
    if (time === null) return null;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <span
                style={{
                    fontSize: '10vw', // Scales with viewport width
                    textAlign: 'center'
                }}
            >{time}</span>
        </div>
    );
}