import { type Action } from "./types";

export function getLocalStorage (): Action[] {
  const stored = localStorage.getItem('actionList');
  return stored ? JSON.parse(stored) : null;
}

export function updateLocalStorage(newActions: Action[]) {
    localStorage.setItem('actionList', JSON.stringify(newActions));
}