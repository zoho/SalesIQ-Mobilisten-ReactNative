import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';

import useTheme from '../theme/useTheme';
import type {ThemeMode} from '../theme/ThemeProvider';
import {nextLanguage} from '../constants/languages';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import SwitchRow from '../components/ui/SwitchRow';
import Field from '../components/ui/Field';
import SegmentedControl from '../components/ui/SegmentedControl';
import {showToast} from '../components/ui/Toast';
import {
  setCredentials,
  hasPlaceholderKeys,
  useSettings,
} from '../state/settings';

/** Mirrors `@react-native-zohosalesiq/mobilisten`'s package version at the time of writing. */
const SDK_VERSION = '13.0.0-beta.1';

const APPEARANCE_SEGMENTS: ReadonlyArray<{value: ThemeMode; label: string}> = [
  {value: 'light', label: 'Light'},
  {value: 'dark', label: 'Dark'},
  {value: 'system', label: 'System'},
];

/**
 * Screen 11 — appearance, language, credentials (keys-required state), logger, SDK version.
 * `reRegisterPush` and `setThemeForiOS` are documented iOS-only and intentionally omitted here.
 */
const SettingsScreen = () => {
  const {mode, setMode} = useTheme();
  const {appKey, accessKey, initStatus} = useSettings();
  const [language, setLanguage] = useState('English');
  const [loggerEnabled, setLoggerEnabled] = useState(false);
  const [appKeyDraft, setAppKeyDraft] = useState(
    hasPlaceholderKeys(appKey, accessKey) ? '' : appKey,
  );
  const [accessKeyDraft, setAccessKeyDraft] = useState(
    hasPlaceholderKeys(appKey, accessKey) ? '' : accessKey,
  );

  useEffect(() => {
    // Check whether SDK debug logging is currently on.
    ZohoSalesIQ.Logger.isEnabled(enabled => setLoggerEnabled(Boolean(enabled)));
  }, []);

  const cycleLanguage = () => {
    const next = nextLanguage(language);
    setLanguage(next.label);
    // Set the language used for the SDK's chat UI.
    ZohoSalesIQ.setLanguage(next.code);
  };

  const toggleLogger = (value: boolean) => {
    setLoggerEnabled(value);
    // Turn SDK debug logging on or off.
    ZohoSalesIQ.Logger.setEnabled(value);
  };

  const saveCredentials = () => {
    if (!appKeyDraft.trim() || !accessKeyDraft.trim()) {
      showToast('Both keys are required', 'danger');
      return;
    }
    setCredentials(appKeyDraft.trim(), accessKeyDraft.trim());
    showToast('Keys saved — restart the app to initialize', 'success');
  };

  return (
    <ScreenScaffold
      title="Settings"
      subtitle="Appearance, credentials, and developer tools">
      <Section title="Appearance">
        <SegmentedControl
          segments={APPEARANCE_SEGMENTS}
          value={mode}
          onChange={setMode}
          accessibilityLabel="Appearance"
        />
      </Section>

      <Section title="Preferences">
        <Card>
          <ListRow
            title="Language"
            icon="globe"
            tint="primary"
            value={language}
            chevron
            onPress={cycleLanguage}
          />
        </Card>
      </Section>

      <Section title="Credentials">
        <Card>
          <Field
            label="App key"
            value={appKeyDraft}
            onChangeText={setAppKeyDraft}
            placeholder="<YOUR_APP_KEY>"
            autoCapitalize="none"
          />
          <Field
            label="Access key"
            value={accessKeyDraft}
            onChangeText={setAccessKeyDraft}
            placeholder="<YOUR_ACCESS_KEY>"
            autoCapitalize="none"
          />
          {initStatus === 'keysRequired' ? (
            <ListRow
              title="Keys required"
              subtitle="Add keys — the SDK initializes on next launch"
              icon="key"
              tint="danger"
            />
          ) : null}
          <ListRow
            title="Save keys"
            titleTone="brand"
            onPress={saveCredentials}
          />
        </Card>
      </Section>

      <Section title="Developer">
        <Card>
          <SwitchRow
            title="Debug logs"
            subtitle="Capture SDK logs on device"
            icon="logs"
            tint="accent"
            value={loggerEnabled}
            onValueChange={toggleLogger}
          />
          <ListRow
            title="Write test log"
            subtitle="iOS only · writeLogForiOS"
            titleTone="brand"
            chevron
            onPress={() => {
              // iOS only: write a custom line into the SDK log at the given level.
              ZohoSalesIQ.Logger.writeLogForiOS(
                'Sample log from the demo app',
                ZohoSalesIQ.Logger.INFO,
              );
              showToast('Log written (iOS)', 'success');
            }}
          />
          <ListRow
            title="Set log path"
            subtitle="iOS only · setPathForiOS"
            titleTone="brand"
            chevron
            onPress={() => {
              // iOS only: set the on-disk folder where SDK logs are written.
              ZohoSalesIQ.Logger.setPathForiOS('mobilisten/logs');
              showToast('Log path set (iOS)', 'success');
            }}
          />
          <ListRow
            title="Clear logs"
            subtitle="iOS only · clearLogsForiOS"
            titleTone="brand"
            chevron
            onPress={() => {
              // iOS only: delete all SDK logs stored on the device.
              ZohoSalesIQ.Logger.clearLogsForiOS();
              showToast('Logs cleared (iOS)', 'success');
            }}
          />
          <ListRow
            title="View logs"
            titleTone="brand"
            chevron
            onPress={() =>
              Linking.openURL(
                'https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-logger.html',
              )
            }
          />
          <ListRow title="SDK version" value={SDK_VERSION} />
        </Card>
      </Section>
    </ScreenScaffold>
  );
};

export default SettingsScreen;
