import {useEffect, useState} from 'react';

/**
 * Tiny shared store for the department chosen in the Department picker screen.
 * The picker records the chosen label here (routing happens via the `departmentName`
 * argument of `ZohoSalesIQ.Chat.start`); the Core / Chat screens subscribe so their
 * "Department" rows reflect the selection.
 */
let selectedDepartment = 'Support';

type Listener = () => void;
const listeners = new Set<Listener>();
const notify = () => listeners.forEach(listener => listener());

export const getSelectedDepartment = () => selectedDepartment;

export const setSelectedDepartment = (name: string) => {
  selectedDepartment = name;
  notify();
};

/** Live-subscribes to the department chosen in the Department picker. */
export const useSelectedDepartment = (): string => {
  const [snapshot, setSnapshot] = useState(getSelectedDepartment);
  useEffect(() => {
    const listener = () => setSnapshot(getSelectedDepartment());
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return snapshot;
};
