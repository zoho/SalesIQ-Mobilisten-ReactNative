import React from 'react';
import {useRoute, type RouteProp} from '@react-navigation/native';

import type {RootStackParamList} from '../navigation';
import type {EventSource} from '../state/events';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import ResultBlock from '../components/ui/ResultBlock';
import Button from '../components/ui/Button';
import {showToast} from '../components/ui/Toast';

export interface EventDetailParams {
  name: string;
  payload: unknown;
  source: EventSource;
  ts: number;
}

type EventDetailRoute = RouteProp<RootStackParamList, 'EventDetail'>;

const SOURCE_LABEL: Record<EventSource, string> = {
  chat: 'Chat listener',
  calls: 'Calls listener',
  launcher: 'Launcher listener',
  knowledgeBase: 'Knowledge base listener',
  notification: 'Notification listener',
  system: 'Top-level listener',
};

/** Event detail (from Events console) — tapping an event expands its full payload. */
const EventDetailScreen = () => {
  const {params} = useRoute<EventDetailRoute>();
  const time = new Date(params.ts).toLocaleTimeString([], {hour12: false});

  return (
    <ScreenScaffold
      title={params.name}
      subtitle={`${SOURCE_LABEL[params.source]} · ${time}`}
      backLabel="Events">
      <Section title="Payload">
        <ResultBlock data={params.payload ?? {payload: 'No payload'}} />
      </Section>
      <Button
        title="Copy payload"
        variant="secondary"
        icon="copy"
        onPress={() =>
          showToast('Payload is selectable — long-press to copy', 'default')
        }
      />
    </ScreenScaffold>
  );
};

export default EventDetailScreen;
