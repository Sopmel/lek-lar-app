import { useMemo } from "react";
import { container } from "../di/inversify.config";

export function usePresenter<T>(PresenterClass: new (...args: any[]) => T): T {
    return useMemo(() => container.get<T>(PresenterClass), [PresenterClass]);
}
