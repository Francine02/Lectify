import { useEffect, useState } from "react";

export function ToggleTheme() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('darkMode') === 'true';
        }
    })

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode.toString());
            return newMode;
        })
    }

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode])

    return (
        <button
            onClick={toggleDarkMode}
            className="w-7 md:w-8 hover:opacity-70 cursor-pointer ">
            <img src={isDarkMode ? './assets/light.png' : './assets/dark.png'}
                alt="dark/light mode"
                className="w-8 md:w-10" />
        </button>
    )
}