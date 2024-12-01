import React, { createContext, useContext, useState } from 'react';

const SampleContext = createContext();

const SampleProvider = ({ children }) => {
    const [samples, setSamples] = useState(null);

    return (
        <SampleContext.Provider value={{ samples, setSamples }}>
            {children}
        </SampleContext.Provider>
    );
};

const useSamples = () => {
    const context = useContext(SampleContext)

    if (context === undefined) {
        throw new Error('useSample must be used within a SampleProvider')
    }

    return context
}

export { SampleContext, SampleProvider, useSamples };
