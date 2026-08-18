import React, {useState} from 'react';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';
import type {SalesIQData} from '@react-native-zohosalesiq/mobilisten';

import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Field from '../components/ui/Field';
import SegmentedControl from '../components/ui/SegmentedControl';
import Button from '../components/ui/Button';
import ResultBlock from '../components/ui/ResultBlock';
import AppText from '../components/ui/AppText';
import {showToast} from '../components/ui/Toast';

type FieldType = SalesIQData['type'];

const FIELD_SEGMENTS: ReadonlyArray<{value: FieldType; label: string}> = [
  {value: 'displayFields', label: 'Display fields'},
  {value: 'secretFields', label: 'Secret fields'},
];

/**
 * Refresh data (from Core › Advanced) — refreshData(SalesIQData). Invokes the registered
 * conversation data provider, then pushes the resolved fields to the server.
 */
const RefreshDataScreen = () => {
  const [fieldType, setFieldType] = useState<FieldType>('displayFields');
  const [conversationId, setConversationId] = useState('');
  const [result, setResult] = useState<unknown>(null);
  const [busy, setBusy] = useState(false);

  const refresh = () => {
    if (!conversationId.trim()) {
      showToast('Enter a conversation ID first', 'danger');
      return;
    }
    setBusy(true);
    // Re-fetch display/secret field values for a conversation from your data provider.
    ZohoSalesIQ.refreshData({type: fieldType, conversationId: conversationId.trim()})
      .then(() => { setResult({success: true}); showToast('Data refreshed', 'success'); })
      .catch((error) => { setResult({error}); showToast('Refresh failed', 'danger'); })
      .finally(() => setBusy(false));
  };

  return (
    <ScreenScaffold
      title="Refresh data"
      subtitle="refreshData(SalesIQData)"
      backLabel="Core">
      <Section title="Field type">
        <SegmentedControl
          segments={FIELD_SEGMENTS}
          value={fieldType}
          onChange={setFieldType}
          accessibilityLabel="Field type"
        />
      </Section>

      <Section title="Conversation">
        <Card>
          <Field
            label="Conversation ID"
            value={conversationId}
            onChangeText={setConversationId}
            placeholder="c_8f2a"
            autoCapitalize="none"
          />
        </Card>
      </Section>

      <AppText
        variant="caption"
        tone="secondary"
        style={{paddingHorizontal: 6, lineHeight: 17}}>
        Invokes the registered conversation data provider, then pushes the
        resolved fields to the server.
      </AppText>

      <Button title="Refresh" icon="refresh" loading={busy} onPress={refresh} />

      {result !== null ? (
        <ResultBlock label="Response" data={result} />
      ) : null}
    </ScreenScaffold>
  );
};

export default RefreshDataScreen;
