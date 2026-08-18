import React, {useEffect} from 'react';
import {Pressable, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '../theme/useTheme';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Card from '../components/ui/Card';
import AppText from '../components/ui/AppText';
import {AppIcons} from '../components/ui/icons';
import {
  useEvents,
  clearEvents,
  markEventsSeen,
  type EventSource,
} from '../state/events';

type StripeToken = 'primary' | 'secondary' | 'accent';

const STRIPE_TOKEN: Record<EventSource, StripeToken> = {
  chat: 'primary',
  calls: 'secondary',
  launcher: 'accent',
  knowledgeBase: 'secondary',
  notification: 'accent',
  system: 'accent',
};

const formatTime = (ts: number) => {
  const date = new Date(ts);
  return date.toLocaleTimeString([], {hour12: false});
};

const formatPayload = (payload: unknown): string => {
  if (payload == null) {
    return '{}';
  }
  try {
    return JSON.stringify(payload);
  } catch {
    return String(payload);
  }
};

/** Screen 10 — live feed of every SDK event across chat, calls, launcher, KB, notifications. */
const EventsScreen = () => {
  const {colors} = useTheme();
  const events = useEvents();

  useEffect(() => {
    markEventsSeen();
  }, []);

  return (
    <ScreenScaffold title="Events" subtitle="Real-time SDK event stream">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 6,
        }}>
        <AppText variant="subhead" tone="secondary">
          <AppText variant="subhead" weight="600">
            {events.length}
          </AppText>{' '}
          events
        </AppText>
        <Pressable
          onPress={clearEvents}
          accessibilityRole="button"
          accessibilityLabel="Clear events"
          disabled={events.length === 0}
          hitSlop={8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            opacity: events.length === 0 ? 0.4 : 1,
          }}>
          <MaterialCommunityIcons
            name={AppIcons.close}
            size={14}
            color={colors.danger}
          />
          <AppText
            variant="caption"
            weight="600"
            style={{color: colors.danger}}>
            Clear
          </AppText>
        </Pressable>
      </View>

      <Card>
        {events.length === 0 ? (
          <View style={{padding: 24, alignItems: 'center'}}>
            <AppText variant="subhead" tone="secondary">
              No events yet — interact with the SDK to see them appear here.
            </AppText>
          </View>
        ) : (
          events.map(event => (
            <View
              key={`${event.ts}-${event.name}`}
              style={{flexDirection: 'row', gap: 11, padding: 12}}>
              <View
                style={{
                  width: 3,
                  borderRadius: 3,
                  backgroundColor: colors[STRIPE_TOKEN[event.source]],
                }}
              />
              <View style={{flex: 1, minWidth: 0}}>
                <AppText variant="subhead" weight="600" style={{fontSize: 13}}>
                  {event.name}
                </AppText>
                <AppText
                  variant="mono"
                  tone="secondary"
                  style={{fontSize: 11.5, marginTop: 2}}
                  numberOfLines={2}>
                  {formatPayload(event.payload)}
                </AppText>
              </View>
              <AppText variant="caption" tone="tertiary">
                {formatTime(event.ts)}
              </AppText>
            </View>
          ))
        )}
      </Card>
    </ScreenScaffold>
  );
};

export default EventsScreen;
