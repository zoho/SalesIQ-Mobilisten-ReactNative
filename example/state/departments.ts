import {useSyncExternalStore} from 'react';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';
import type {SalesIQDepartment} from '@react-native-zohosalesiq/mobilisten-core';

/**
 * App-wide store of the SalesIQ departments fetched via `Conversation.getDepartments()` (after init
 * succeeds). Backs the conversation-attribute department pickers on the Chat screen and the single-select
 * Department Picker. Same hand-rolled-observable + `useSyncExternalStore` pattern as `state/pushStatus.ts`.
 */
export interface DepartmentsState {
  departments: SalesIQDepartment[];
  loading: boolean;
  error: string | null;
}

let state: DepartmentsState = {departments: [], loading: false, error: null};
const listeners = new Set<() => void>();
const notify = () => listeners.forEach(listener => listener());

const setState = (next: Partial<DepartmentsState>): void => {
  state = {...state, ...next};
  notify();
};

export const getDepartmentsState = (): DepartmentsState => state;

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const useDepartments = (): DepartmentsState =>
  useSyncExternalStore(subscribe, getDepartmentsState);

/** A stable key for a department (id preferred, name fallback) — used for selection + list keys. */
export const departmentKey = (department: SalesIQDepartment): string =>
  department.id ?? department.name ?? '';

/**
 * Fetches departments from the SDK. Call once after init succeeds (and re-callable to refresh). Never
 * throws — failures land in `error`.
 */
export async function loadDepartments(): Promise<void> {
  setState({loading: true, error: null});
  try {
    const departments = await ZohoSalesIQ.Conversation.getDepartments();
    setState({departments: departments ?? [], loading: false});
  } catch (error: any) {
    setState({
      loading: false,
      error: error?.message ?? 'Failed to load departments',
    });
  }
}
