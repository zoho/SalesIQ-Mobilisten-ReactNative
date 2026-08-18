import React, {useState} from 'react';
import {View} from 'react-native';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';

import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import SwitchRow from '../components/ui/SwitchRow';
import Field from '../components/ui/Field';
import Button from '../components/ui/Button';
import ResultBlock from '../components/ui/ResultBlock';
import {showToast} from '../components/ui/Toast';
import type {AppIconName, IconTint} from '../components/ui/icons';

// `SIQWidget` is defined in the Homepage module but is not re-exported from the package's
// public root index — only available at runtime via `ZohoSalesIQ.Homepage.Widget`.
const {Widget: SIQWidget} = ZohoSalesIQ.Homepage;
type SIQWidget = (typeof SIQWidget)[keyof typeof SIQWidget];

interface WidgetRow {
  widget: SIQWidget;
  title: string;
  icon: AppIconName;
  tint: IconTint;
}

const WIDGETS: readonly WidgetRow[] = [
  {widget: SIQWidget.CHAT, title: 'Chat', icon: 'chat', tint: 'primary'},
  {widget: SIQWidget.CALL, title: 'Call', icon: 'calls', tint: 'secondary'},
  {
    widget: SIQWidget.ARTICLES,
    title: 'Articles',
    icon: 'knowledgeBase',
    tint: 'accent',
  },
  {
    widget: SIQWidget.PREVIOUS_CONVERSATION,
    title: 'Previous conversation',
    icon: 'events',
    tint: 'primary',
  },
  {widget: SIQWidget.IMAGE_CARD, title: 'Image card', icon: 'article', tint: 'secondary'},
  {widget: SIQWidget.VIDEO_CARD, title: 'Video card', icon: 'article', tint: 'accent'},
];

/** Screen 08 — homepage widgets visibility + the AI/agent-backed Help Center. */
const HomepageHelpCenterScreen = () => {
  const [homepageEnabled, setHomepageEnabled] = useState(true);
  const [widgetState, setWidgetState] = useState<Record<SIQWidget, boolean>>({
    [SIQWidget.CHAT]: true,
    [SIQWidget.CALL]: true,
    [SIQWidget.ARTICLES]: true,
    [SIQWidget.PREVIOUS_CONVERSATION]: false,
    [SIQWidget.IMAGE_CARD]: true,
    [SIQWidget.VIDEO_CARD]: true,
  });
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<unknown>(null);

  const toggleHomepage = (value: boolean) => {
    setHomepageEnabled(value);
    // Show or hide the SDK's homepage (landing) view.
    ZohoSalesIQ.Homepage.setEnabled(value);
  };

  const toggleWidget = (widget: SIQWidget) => (value: boolean) => {
    setWidgetState(state => ({...state, [widget]: value}));
    // Show or hide a single widget card on the homepage.
    ZohoSalesIQ.Homepage.setVisibility(widget, value);
  };

  const askHelpCenter = () => {
    // Open the AI-backed Help Center, optionally pre-filled with a question.
    ZohoSalesIQ.HelpCenter.ask(question || undefined)
      .then(success => {
        setResult({success});
        showToast('Help center opened', 'success');
      })
      .catch(error => {
        setResult({error});
        showToast('Help center failed to open', 'danger');
      });
  };

  return (
    <ScreenScaffold title="Homepage" subtitle="Widgets & the help center">
      <Section title="Homepage">
        <Card>
          <SwitchRow
            title="Enable homepage"
            subtitle="Show the SDK landing view"
            value={homepageEnabled}
            onValueChange={toggleHomepage}
          />
        </Card>
      </Section>

      <Section title="Widgets">
        <Card>
          {WIDGETS.map(row => (
            <SwitchRow
              key={row.widget}
              title={row.title}
              icon={row.icon}
              tint={row.tint}
              value={widgetState[row.widget]}
              onValueChange={toggleWidget(row.widget)}
            />
          ))}
        </Card>
      </Section>

      <Section title="Help center">
        <Card>
          <Field
            label="Question"
            value={question}
            onChangeText={setQuestion}
            placeholder="Ask anything about the product"
          />
        </Card>
        <View style={{marginTop: 9}}>
          <Button title="Ask help center" icon="help" onPress={askHelpCenter} />
        </View>
      </Section>

      {result !== null ? (
        <ResultBlock label="Last result" data={result} />
      ) : null}
    </ScreenScaffold>
  );
};

export default HomepageHelpCenterScreen;
