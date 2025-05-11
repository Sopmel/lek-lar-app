// src/di/inversifyProvider.tsx
import React, { ReactNode } from "react";
import { Provider } from "inversify-react";
import { Container } from "inversify";

interface InversifyProviderProps {
    container: Container;
    children: ReactNode;
}

export const InversifyProvider = ({ container, children }: InversifyProviderProps) => {
    return <Provider container={container}>{children}</Provider>;
};
