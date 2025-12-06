import { useEffect } from 'react';

export type Appearance = 'light';

const applyTheme = () => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
};

export function initializeTheme() {
    applyTheme();
}

export function useAppearance() {
    useEffect(() => {
        applyTheme();
    }, []);

    return { appearance: 'light' as const, updateAppearance: () => {} } as const;
}
