import React, {useCallback, useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ZohoSalesIQCalls,
  CallComponent,
  SalesIQCallState,
} from '@react-native-zohosalesiq/mobilisten-calls';
import {
  SalesIQCallConversation,
  type SalesIQConversation,
} from '@react-native-zohosalesiq/mobilisten-core';

import type {RootStackParamList} from '../navigation';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import StateView from '../components/ui/StateView';
import Field from '../components/ui/Field';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SwitchRow from '../components/ui/SwitchRow';
import SegmentedControl from '../components/ui/SegmentedControl';
import {showToast} from '../components/ui/Toast';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Calls'>;
type ViewModeKey = 'fullScreen' | 'floating';

const VIEW_MODE_SEGMENTS: ReadonlyArray<{value: ViewModeKey; label: string}> = [
  {value: 'fullScreen', label: 'Full screen'},
  {value: 'floating', label: 'Floating'},
];

interface CallComponentRow {
  component: CallComponent;
  title: string;
}

const COMPONENT_ROWS: readonly CallComponentRow[] = [
  {component: CallComponent.OPERATOR_NAME, title: 'Operator name'},
  {component: CallComponent.OPERATOR_IMAGE, title: 'Operator image'},
  {component: CallComponent.PRE_CHAT_FORM, title: 'Pre-chat form'},
  {component: CallComponent.QUEUE_POSITION, title: 'Queue position'},
];

/**
 * `SalesIQCallStatus` is defined in the calls package but the raw status string is what
 * `getCurrentCallState()` reports; the sample app mirrors the "active" check locally.
 */
const ACTIVE_STATUSES = new Set([
  'CALLING',
  'RINGING',
  'CONNECTING',
  'CONNECTED',
  'ON_HOLD',
  'RECONNECTING',
  'QUEUE',
]);
const isCallActive = (status?: string) =>
  status ? ACTIVE_STATUSES.has(status) : false;

/** Screen 06 — active call, view mode, titles, component visibility, reply messages, history. */
const CallsScreen = () => {
  const navigation = useNavigation<NavProp>();
  const [callState, setCallState] = useState<SalesIQCallState | null>(null);
  const [viewMode, setViewMode] = useState<ViewModeKey>('fullScreen');
  const [recent, setRecent] = useState<SalesIQConversation[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [recentError, setRecentError] = useState<string | null>(null);
  const [onlineTitle, setOnlineTitle] = useState('');
  const [offlineTitle, setOfflineTitle] = useState('');
  const [replyMessages, setReplyMessages] = useState('Busy right now, Call me later');
  const [components, setComponents] = useState<Record<string, boolean>>({
    [CallComponent.OPERATOR_NAME]: true,
    [CallComponent.OPERATOR_IMAGE]: true,
    [CallComponent.PRE_CHAT_FORM]: false,
    [CallComponent.QUEUE_POSITION]: true,
  });

  const refreshCallState = useCallback(() => {
    // Get the current call's state (status, participants), or null if none.
    ZohoSalesIQCalls.getCurrentCallState()
      .then(setCallState)
      .catch(() => setCallState(null));
  }, []);

  const refreshRecent = useCallback(() => {
    setRecentLoading(true);
    setRecentError(null);
    // Fetch the visitor's past calls (call history).
    ZohoSalesIQCalls.getList()
      .then(list => setRecent(list.slice(0, 5)))
      .catch(e => setRecentError(e?.message ?? 'Failed to load recent calls'))
      .finally(() => setRecentLoading(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshCallState();
      refreshRecent();
    }, [refreshCallState, refreshRecent]),
  );

  useEffect(() => {
    // No-op on Android; primes the CallKit/PushKit stack on iOS.
    ZohoSalesIQCalls.initialiseForiOS();
    // Subscribe to call events; refresh the shown state whenever one fires.
    const subscription = ZohoSalesIQCalls.addListener(() => refreshCallState());
    return () => subscription.remove();
  }, [refreshCallState]);

  const startCall = () => {
    // Start an outgoing call (no department, mic enabled, default operator).
    ZohoSalesIQCalls.start(null, true, null)
      .then(() => {
        // Get the ID of the call that is now in progress.
        const callId = ZohoSalesIQCalls.getCurrentCallId();
        showToast(callId ? `Call started (${callId})` : 'Call started', 'success');
        refreshCallState();
      })
      .catch(() => showToast('Failed to start call', 'danger'));
  };

  const endCall = () => {
    // Hang up the current call.
    ZohoSalesIQCalls.end()
      .then(() => {
        showToast('Call ended');
        refreshCallState();
      })
      .catch(() => showToast('Failed to end call', 'danger'));
  };

  const applyViewMode = (mode: ViewModeKey) => {
    setViewMode(mode);
    if (mode === 'fullScreen') {
      // Show the call UI as a full-screen view.
      ZohoSalesIQCalls.enterFullScreenMode();
    } else {
      // Show the call UI as a small floating/picture-in-picture view.
      ZohoSalesIQCalls.enterFloatingViewMode();
    }
  };

  const applyTitles = () => {
    // Set the call screen's title text for online and offline states.
    ZohoSalesIQCalls.setTitle(
      onlineTitle.trim() || null,
      offlineTitle.trim() || null,
    );
    showToast('Call titles updated', 'success');
  };

  const applyReplyMessages = () => {
    const messages = replyMessages
      .split(',')
      .map(message => message.trim())
      .filter(Boolean);
    if (messages.length === 0) {
      showToast('Enter at least one reply message', 'danger');
      return;
    }
    // Android only: set the quick-decline reply messages for incoming calls.
    ZohoSalesIQCalls.setAndroidReplyMessages(messages);
    showToast('Reply messages set', 'success');
  };

  const toggleComponent = (component: CallComponent) => (value: boolean) => {
    setComponents(current => ({...current, [component]: value}));
    // Show or hide a single component in the call UI (operator name, image…).
    ZohoSalesIQCalls.setVisibility(component, value);
  };

  const openCallDetail = (conversation: SalesIQConversation, status?: string) => {
    navigation.navigate('CallDetail', {
      id: conversation.id,
      status,
      attenderName: conversation.attenderName,
      departmentName: conversation.departmentName,
      question: conversation.question,
      isIncoming: conversation.media?.initiatedBy === 'OPERATOR',
      startedTime: conversation.media?.createdTime,
    });
  };

  const active = isCallActive(callState?.status);

  return (
    <ScreenScaffold title="Calls" subtitle="Voice calls with your operators">
      <Section title="Active call">
        <Card>
          <ListRow
            title="Support line"
            subtitle={callState?.status ?? 'No active call'}
            icon="calls"
            tint={active ? 'secondary' : 'primary'}
            trailing={
              <Badge
                label={active ? 'Live' : 'Idle'}
                tone={active ? 'success' : 'primary'}
              />
            }
          />
          <View style={{paddingHorizontal: 14, paddingBottom: 13}}>
            <SegmentedControl
              segments={VIEW_MODE_SEGMENTS}
              value={viewMode}
              onChange={applyViewMode}
              accessibilityLabel="Call view mode"
            />
          </View>
        </Card>
      </Section>

      <View style={{flexDirection: 'row', gap: 10}}>
        <View style={{flex: 1}}>
          <Button title="Start call" icon="calls" onPress={startCall} />
        </View>
        <View style={{flex: 1}}>
          <Button title="End" variant="destructive" onPress={endCall} />
        </View>
      </View>

      <Section title="Configuration">
        <Card>
          <Field
            label="Online title"
            value={onlineTitle}
            onChangeText={setOnlineTitle}
            placeholder="On a call"
          />
          <Field
            label="Offline title"
            value={offlineTitle}
            onChangeText={setOfflineTitle}
            placeholder="Call back"
          />
          <ListRow
            title="Apply titles"
            titleTone="brand"
            chevron
            onPress={applyTitles}
          />
          {Platform.OS === 'android' ? (
            <>
              <Field
                label="Reply messages · Android (comma-separated)"
                value={replyMessages}
                onChangeText={setReplyMessages}
              />
              <ListRow
                title="Set reply messages"
                subtitle="quick decline replies"
                titleTone="brand"
                chevron
                onPress={applyReplyMessages}
              />
            </>
          ) : null}
        </Card>
      </Section>

      <Section title="Visible components">
        <Card>
          {COMPONENT_ROWS.map(row => (
            <SwitchRow
              key={row.component}
              title={row.title}
              value={components[row.component]}
              onValueChange={toggleComponent(row.component)}
            />
          ))}
        </Card>
      </Section>

      <Section title="Recent calls">
        <Card>
          <StateView
            loading={recentLoading}
            error={recentError}
            empty={recent.length === 0}
            onRetry={refreshRecent}
            skeletonRows={3}
            emptyIcon="calls"
            emptyTitle="No recent calls yet"
            emptySubtitle="Completed calls will appear here">
            {recent.map(conversation => {
              const isCall = conversation instanceof SalesIQCallConversation;
              const status = isCall ? conversation.status : undefined;
              return (
                <ListRow
                  key={conversation.id}
                  title={
                    conversation.attenderName ??
                    conversation.departmentName ??
                    'Call'
                  }
                  subtitle={status ?? conversation.question}
                  icon="calls"
                  tint={status === 'MISSED' ? 'danger' : 'secondary'}
                  chevron
                  onPress={() => openCallDetail(conversation, status)}
                />
              );
            })}
          </StateView>
        </Card>
      </Section>
    </ScreenScaffold>
  );
};

export default CallsScreen;
