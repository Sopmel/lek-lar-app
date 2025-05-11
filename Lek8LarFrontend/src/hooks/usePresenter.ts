import { useMemo } from "react";
import { container } from "../di/inversify.config";

/**
 * Generic hook to resolve a presenter from the Inversify container.
 * It only resolves once per component mount.
 */
export function usePresenter<T>(PresenterClass: new (...args: any[]) => T): T {
    return useMemo(() => container.get<T>(PresenterClass), [PresenterClass]);
}
