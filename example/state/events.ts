import {useEffect, useState} from 'react';

export type EventSource =
  | 'chat'
  | 'calls'
  | 'launcher'
  | 'knowledgeBase'
  | 'notification'
  | 'system';

export interface SDKEvent {
  ts: number;
  name: string;
  payload: unknown;
  source: EventSource;
}

const MAX_EVENTS = 200;

let events: SDKEvent[] = [];
let unseenCount = 0;
type Listener = () => void;
const listeners = new Set<Listener>();

const notify = () => {
  listeners.forEach(listener => listener());
};

/** Push an SDK event into the in-memory store (called from every listener wired in scripts/listeners.ts). */
export const pushEvent = (
  name: string,
  payload: unknown,
  source: EventSource,
) => {
  events = [{ts: Date.now(), name, payload, source}, ...events].slice(
    0,
    MAX_EVENTS,
  );
  unseenCount += 1;
  notify();
};

/** Clears the event log (Events Console → Clear). Does not affect the unseen counter. */
export const clearEvents = () => {
  events = [];
  notify();
};

/** Marks all events as seen (call when the Events Console screen is focused). */
export const markEventsSeen = () => {
  if (unseenCount === 0) {
    return;
  }
  unseenCount = 0;
  notify();
};

const getSnapshot = () => events;
const getUnseenSnapshot = () => unseenCount;

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Live-subscribes to the full event log, newest first. */
export const useEvents = (): SDKEvent[] => {
  const [snapshot, setSnapshot] = useState(getSnapshot);
  useEffect(() => subscribe(() => setSnapshot(getSnapshot())), []);
  return snapshot;
};

/** Live-subscribes to the count of events pushed since the console was last viewed. */
export const useUnseenEventCount = (): number => {
  const [count, setCount] = useState(getUnseenSnapshot);
  useEffect(() => subscribe(() => setCount(getUnseenSnapshot())), []);
  return count;
};
