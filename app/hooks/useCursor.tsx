'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
type CursorContextType = {
    cursorType: string;
    cursorText: string;
    setCursorType: (type: string) => void;
    setCursorText: (text: string) => void;
};

// Create context with default values
const CursorContext = createContext<CursorContextType>({
    cursorType: 'default',
    cursorText: '',
    setCursorType: () => { },
    setCursorText: () => { },
});

// Define props type for the provider
type CursorProviderProps = {
    children: ReactNode;
};

// Provider component
export const CursorProvider: React.FC<CursorProviderProps> = ({ children }) => {
    const [cursorType, setCursorType] = useState('default');
    const [cursorText, setCursorText] = useState('');

    return (
        <CursorContext.Provider value= {{ cursorType, setCursorType, cursorText, setCursorText }
}>
    { children }
    </CursorContext.Provider>
  );
};

// Hook to use cursor
export const useCursor = () => {
    const context = useContext(CursorContext);

    if (!context) {
        throw new Error('useCursor must be used within a CursorProvider');
    }

    const { cursorType, setCursorType, cursorText, setCursorText } = context;

    // Helper functions for common cursor changes
    const onLink = () => {
        setCursorType('button');
        setCursorText('');
    };

    const onImage = () => {
        setCursorType('view');
        setCursorText('View');
    };

    const onReset = () => {
        setCursorType('default');
        setCursorText('');
    };

    const withText = (text: string) => {
        setCursorType('button');
        setCursorText(text);
    };

    return {
        cursorType,
        cursorText,
        setCursorType,
        setCursorText,
        onLink,
        onImage,
        onReset,
        withText
    };
};

export default useCursor;