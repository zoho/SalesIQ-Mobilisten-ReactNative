import React from 'react';
import {View} from 'react-native';
import {useRoute, type RouteProp} from '@react-navigation/native';
import {
  ZohoSalesIQ,
  SIQConversationScreen,
  SIQSessionType,
} from '@react-native-zohosalesiq/mobilisten';

import type {RootStackParamList} from '../navigation';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import {showToast} from '../components/ui/Toast';

export interface CallDetailParams {
  id: string;
  status?: string;
  attenderName?: string;
  departmentName?: string;
  question?: string;
  isIncoming?: boolean;
  startedTime?: number;
  duration?: string;
}

type CallDetailRoute = RouteProp<RootStackParamList, 'CallDetail'>;

/** Call detail (from Calls › Recent) — Open = present(SIQConversationScreen.withId(id, call)). */
const CallDetailScreen = () => {
  const {params} = useRoute<CallDetailRoute>();

  const openConversation = () => {
    // Open this specific call conversation by its ID in the SDK UI.
    ZohoSalesIQ.present(
      SIQConversationScreen.withId(params.id, SIQSessionType.CALL),
      false,
    )
      .then(success => {
        if (success) {
          showToast('Opening conversation…', 'success');
        }
      })
      .catch(() => {
        showToast('Could not open conversation', 'danger');
      });
  };

  const missed = params.status === 'MISSED';
  const started = params.startedTime
    ? new Date(params.startedTime).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

  return (
    <ScreenScaffold
      title="Call"
      subtitle={`callId · ${params.id}`}
      backLabel="Calls">
      <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
        <Badge
          label={params.status ?? 'Unknown'}
          tone={missed ? 'warning' : 'success'}
        />
        <Badge
          label={params.isIncoming ? 'Incoming' : 'Outgoing'}
          tone="primary"
        />
      </View>

      <Section title="Details">
        <Card>
          <ListRow
            title={params.attenderName ?? 'Support line'}
            subtitle={
              params.attenderName
                ? `Operator: ${params.attenderName}`
                : 'No operator'
            }
            icon="calls"
            tint={missed ? 'danger' : 'secondary'}
          />
          <ListRow title="Department" value={params.departmentName ?? '—'} />
          <ListRow title="Started" value={started} />
          <ListRow title="Duration" value={params.duration ?? '—'} />
        </Card>
      </Section>

      <Button
        title="Open conversation"
        icon="calls"
        onPress={openConversation}
      />
    </ScreenScaffold>
  );
};

export default CallDetailScreen;
