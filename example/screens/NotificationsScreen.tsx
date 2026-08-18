import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';

import ScreenScaffold from '../components/ui/ScreenScaffold';
import StatusBanner from '../components/ui/StatusBanner';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import SwitchRow from '../components/ui/SwitchRow';
import SegmentedControl from '../components/ui/SegmentedControl';
import ResultBlock from '../components/ui/ResultBlock';
import AppText from '../components/ui/AppText';
import Field from '../components/ui/Field';
import Button from '../components/ui/Button';
import ListRow from '../components/ui/ListRow';
import {showToast} from '../components/ui/Toast';
import {useEvents} from '../state/events';
import {isJsPush} from '../config/push';
import {getJsPushToken} from '../scripts/push';
import {openNotificationSettings} from '../scripts/permissions';
import {usePushStatus, pushHasIssue} from '../state/pushStatus';

const {ActionSource} = ZohoSalesIQ;

type SourceKey = 'app' | 'sdk';

const SOURCE_SEGMENTS: ReadonlyArray<{value: SourceKey; label: string}> = [
  {value: 'app', label: 'App'},
  {value: 'sdk', label: 'SDK'},
];

/**
 * Screen 09 — push registers automatically; status, in-app toggle, action source, last payload.
 *
 * Mode-aware (see example/config/push.ts):
 *  - 'native' — the native layer (FCM service / AppDelegate) owns push. The token field is a manual
 *    override so `registerPush` / `disablePush` can still be exercised.
 *  - 'js' — @react-native-firebase/messaging owns push. The field is prefilled with the **real** device
 *    token and can be re-fetched.
 */
const NotificationsScreen = () => {
  const [inAppEnabled, setInAppEnabled] = useState(true);
  const [source, setSource] = useState<SourceKey>('app');
  // In 'native' mode the token comes from the native layer; this field is a manual override so
  // registerPush / disablePush can be exercised. In 'js' mode it is prefilled with the real device token.
  const [pushToken, setPushToken] = useState('');
  const [badgeCount, setBadgeCount] = useState<number | null>(null);
  // Notification-permission health comes from the app-wide push-status store, which App.tsx refreshes on
  // launch and on every foreground (so the banner clears after the user enables notifications in Settings).
  const notificationsBlocked = pushHasIssue(usePushStatus());

  // In 'js' mode, load the real device token from rnfirebase so the field reflects what actually
  // registers with the SDK. No-op in 'native' mode (getJsPushToken resolves null there).
  const loadJsToken = React.useCallback(() => {
    if (!isJsPush) {
      return;
    }
    getJsPushToken()
      .then(token => {
        if (token) {
          setPushToken(token);
        }
      })
      .catch(() => {
        /* token not available yet (e.g. APNS not delivered) — leave the field as-is */
      });
  }, []);

  useEffect(loadJsToken, [loadJsToken]);

  // Notification events are captured once, centrally, in scripts/listeners.ts → state/events.ts.
  const events = useEvents();
  const lastPayload = useMemo(
    () =>
      events.find(event => event.source === 'notification')?.payload ?? null,
    [events],
  );

  const toggleInApp = (value: boolean) => {
    setInAppEnabled(value);
    // Toggle in-app foreground banners with a single boolean API.
    ZohoSalesIQ.Notification.enableInAppNotification(value);
  };

  const applySource = (value: SourceKey) => {
    setSource(value);
    // Choose who handles a notification tap: your app or the SDK.
    ZohoSalesIQ.Notification.setActionSource(
      value === 'app' ? ActionSource.APP : ActionSource.SDK,
    );
  };

  const registerPush = () => {
    if (!pushToken.trim()) {
      showToast('Paste an FCM/APNs token first', 'danger');
      return;
    }
    // Register this device's push token so it receives chat notifications (true = test device).
    ZohoSalesIQ.Notification.registerPush(pushToken.trim(), true); // test device
    showToast('Push registered', 'success');
  };

  const disablePush = () => {
    if (!pushToken.trim()) {
      showToast('Paste an FCM/APNs token first', 'danger');
      return;
    }
    // Unregister this device's push token so it stops receiving notifications.
    ZohoSalesIQ.Notification.disablePush()
      .then(() => showToast('Push disabled', 'success'))
      .catch(() => showToast('Failed to disable push', 'danger'));
  };

  // The exact flow from a messaging `onMessage` handler: is this a SalesIQ
  // push? → hand it to the SDK → read the parsed payload back.
  const handleSamplePush = () => {
    const data = {sender: 'salesiq', type: 'chat'};
    // Check whether an incoming push payload belongs to SalesIQ.
    ZohoSalesIQ.Notification.isSDKMessage(data, isSDK => {
      if (!isSDK) {
        showToast('Not a SalesIQ push (as expected for the sample)');
        return;
      }
      // Hand the SalesIQ push to the SDK to display/handle it.
      ZohoSalesIQ.Notification.process(data);
      // Read back the parsed contents of the push payload.
      ZohoSalesIQ.Notification.getPayload(data, payload => {
        showToast(`Payload parsed: ${payload ? 'ok' : 'none'}`, 'success');
      });
    });
  };

  const refreshBadge = () => {
    // Get the app icon's unread badge count from the SDK.
    ZohoSalesIQ.Notification.getBadgeCount().then(count => {
      setBadgeCount(typeof count === 'number' ? count : 0);
    });
  };

  return (
    <ScreenScaffold
      title="Notifications"
      subtitle="Push status & in-app alerts">
      {notificationsBlocked ? (
        <View style={{gap: 8}}>
          <StatusBanner
            title="Notifications are turned off"
            body="Notifications are disabled for this app, so you won't receive any notifications — chat replies, call alerts, and other messages. The system won't ask again; turn them on in Settings."
            variant="warning"
            icon="alert"
          />
          <Button
            title="Open notification settings"
            variant="secondary"
            onPress={openNotificationSettings}
          />
        </View>
      ) : null}

      <StatusBanner
        title={isJsPush ? 'Registered via JavaScript' : 'Registered via Native'}
        body={
          isJsPush
            ? pushToken
              ? 'Token received from @react-native-firebase/messaging and registered via Notification.registerPush.'
              : 'Fetching the device token from @react-native-firebase/messaging…'
            : 'The native FCM service (Android) / AppDelegate (iOS) registers the device token with the SDK. The token is not surfaced to JS in this mode.'
        }
        variant="ok"
        icon="notifications"
      />

      <Section title="Preferences">
        <Card>
          <SwitchRow
            title="In-app notifications"
            subtitle="Show alerts inside the app"
            value={inAppEnabled}
            onValueChange={toggleInApp}
          />
        </Card>
      </Section>

      <Section title="Action source">
        <SegmentedControl
          segments={SOURCE_SEGMENTS}
          value={source}
          onChange={applySource}
          accessibilityLabel="Notification action source"
        />
        <AppText
          variant="caption"
          tone="secondary"
          style={{paddingHorizontal: 6}}>
          Who handles a tap on a chat notification.
        </AppText>
      </Section>

      <Section title="Push token">
        <Card>
          <Field
            label="FCM / APNs token"
            value={pushToken}
            onChangeText={setPushToken}
            placeholder={
              isJsPush ? 'Loading real device token…' : 'Paste a device token'
            }
            autoCapitalize="none"
          />
          <AppText
            variant="caption"
            tone="secondary"
            style={{paddingHorizontal: 6, marginTop: 2}}>
            {isJsPush
              ? 'Live token from @react-native-firebase/messaging (registered automatically at startup).'
              : 'Native mode registers the token for you; use this field to exercise the APIs manually.'}
          </AppText>
          {isJsPush ? (
            <View style={{marginTop: 6}}>
              <Button title="Refresh token" variant="ghost" onPress={loadJsToken} />
            </View>
          ) : null}
          <View style={{flexDirection: 'row', gap: 10, marginTop: 6}}>
            <View style={{flex: 1}}>
              <Button title="Register push" variant="secondary" onPress={registerPush} />
            </View>
            <View style={{flex: 1}}>
              <Button title="Disable push" variant="secondary" onPress={disablePush} />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Button title="Handle sample push" variant="ghost" onPress={handleSamplePush} />
          </View>
          <ListRow
            title="Badge count"
            subtitle="getBadgeCount"
            value={badgeCount === null ? 'Tap to read' : String(badgeCount)}
            chevron
            onPress={refreshBadge}
          />
        </Card>
      </Section>

      <Section title="Last payload received">
        <ResultBlock
          data={lastPayload ?? {status: 'No notification received yet'}}
        />
      </Section>
    </ScreenScaffold>
  );
};

export default NotificationsScreen;
