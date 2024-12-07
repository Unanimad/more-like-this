"use client";

import { SampleProvider } from "@/context/SampleContext";
import { MantineProvider } from "@mantine/core";

export const Providers = ({ children }) => {
    return (
        <MantineProvider>
            <SampleProvider>
                {children}
            </SampleProvider>
        </MantineProvider>
    );
};
