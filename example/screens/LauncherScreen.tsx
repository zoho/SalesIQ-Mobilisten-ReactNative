import React, {useState} from 'react';
import {View} from 'react-native';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';

import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import SwitchRow from '../components/ui/SwitchRow';
import Field from '../components/ui/Field';
import SegmentedControl from '../components/ui/SegmentedControl';
import Button from '../components/ui/Button';
import AppText from '../components/ui/AppText';
import {showToast} from '../components/ui/Toast';

const {VisibilityMode} = ZohoSalesIQ.Launcher;
type LauncherVisibilityMode =
  (typeof VisibilityMode)[keyof typeof VisibilityMode];

type VisibilityKey = 'always' | 'activeChat' | 'never';

const VISIBILITY_SEGMENTS: ReadonlyArray<{
  value: VisibilityKey;
  label: string;
}> = [
  {value: 'always', label: 'Always'},
  {value: 'activeChat', label: 'Active chat'},
  {value: 'never', label: 'Never'},
];

const VISIBILITY_MODE: Record<VisibilityKey, LauncherVisibilityMode> = {
  always: VisibilityMode.ALWAYS,
  activeChat: VisibilityMode.WHEN_ACTIVE_CHAT,
  never: VisibilityMode.NEVER,
};

const VISIBILITY_COPY: Record<VisibilityKey, string> = {
  always: 'Shown at all times, even without an active conversation.',
  activeChat: 'Only shown while the visitor has an active conversation.',
  never: 'The launcher never appears; present the SDK from your own UI.',
};

/** Screen 03 — launcher visibility, drag-to-dismiss, operator image, position. */
const LauncherScreen = () => {
  const [visibility, setVisibility] = useState<VisibilityKey>('always');
  const [dragToDismiss, setDragToDismiss] = useState(true);
  const [operatorImage, setOperatorImage] = useState(true);
  const [customLauncher, setCustomLauncher] = useState(false);
  const [minPressDuration, setMinPressDuration] = useState('250');
  const [horizontal, setHorizontal] = useState<'Left' | 'Right'>('Right');
  const [vertical, setVertical] = useState<'Top' | 'Bottom'>('Bottom');

  const applyLauncherSettings = () => {
    const mode = VISIBILITY_MODE[visibility];
    if (customLauncher) {
      // Apply the visibility rule to your own custom launcher view.
      ZohoSalesIQ.Launcher.setVisibilityModeToCustomLauncher(mode);
    } else {
      // Show the built-in launcher with the chosen visibility rule.
      ZohoSalesIQ.Launcher.show(mode);
    }
    // Let the user drag the launcher to a dismiss target to hide it.
    ZohoSalesIQ.Launcher.enableDragToDismiss(dragToDismiss);
    const duration = Number(minPressDuration);
    if (Number.isFinite(duration) && duration >= 0) {
      // Set how long (ms) the launcher must be pressed before it responds.
      ZohoSalesIQ.Launcher.setMinimumPressDuration(duration);
    }
    // Show the connected operator's photo on the launcher.
    ZohoSalesIQ.Launcher.showOperatorImage(operatorImage);
    // Android only: set the launcher's on-screen corner position.
    ZohoSalesIQ.setLauncherPropertiesForAndroid({
      horizontalDirection:
        horizontal === 'Left'
          ? ZohoSalesIQ.Launcher.HORIZONTAL_LEFT
          : ZohoSalesIQ.Launcher.HORIZONTAL_RIGHT,
      verticalDirection:
        vertical === 'Top'
          ? ZohoSalesIQ.Launcher.VERTICAL_TOP
          : ZohoSalesIQ.Launcher.VERTICAL_BOTTOM,
    });
    showToast('Launcher settings applied', 'success');
  };

  return (
    <ScreenScaffold
      title="Launcher"
      subtitle="How and where the launcher appears">
      <Section title="Visibility mode">
        <SegmentedControl
          segments={VISIBILITY_SEGMENTS}
          value={visibility}
          onChange={setVisibility}
          accessibilityLabel="Launcher visibility mode"
        />
        <AppText
          variant="caption"
          tone="secondary"
          style={{paddingHorizontal: 6}}>
          {VISIBILITY_COPY[visibility]}
        </AppText>
      </Section>

      <Section title="Behavior">
        <Card>
          <SwitchRow
            title="Drag to dismiss"
            subtitle="Let users swipe the launcher away"
            value={dragToDismiss}
            onValueChange={setDragToDismiss}
          />
          <SwitchRow
            title="Operator image"
            subtitle="Show agent photo in launcher"
            value={operatorImage}
            onValueChange={setOperatorImage}
          />
          <SwitchRow
            title="Custom launcher"
            subtitle="Use your own trigger view"
            value={customLauncher}
            onValueChange={setCustomLauncher}
          />
          <Field
            label="Min press duration (ms)"
            value={minPressDuration}
            onChangeText={setMinPressDuration}
            keyboardType="number-pad"
          />
        </Card>
      </Section>

      <Section title="Position" footer="Android only.">
        <Card>
          <ListRow
            title="Horizontal"
            value={horizontal}
            onPress={() =>
              setHorizontal(h => (h === 'Left' ? 'Right' : 'Left'))
            }
          />
          <ListRow
            title="Vertical"
            value={vertical}
            onPress={() => setVertical(v => (v === 'Top' ? 'Bottom' : 'Top'))}
          />
        </Card>
      </Section>

      <View>
        <Button
          title="Apply launcher settings"
          icon="launcher"
          onPress={applyLauncherSettings}
        />
      </View>
    </ScreenScaffold>
  );
};

export default LauncherScreen;
