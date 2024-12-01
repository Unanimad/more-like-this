"use client";

import { SampleProvider } from "@/context/SampleContext";

export const Providers = ({ children }) => {
    return (
        <SampleProvider>
            {children}
        </SampleProvider>
    );
};
