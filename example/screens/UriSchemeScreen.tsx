import React, {useState} from 'react';
import {View} from 'react-native';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';
import type {SalesIQUriSchemePath} from '@react-native-zohosalesiq/mobilisten';

import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import Field from '../components/ui/Field';
import Button from '../components/ui/Button';
import {showToast} from '../components/ui/Toast';

type PathType = SalesIQUriSchemePath['type'];

const PATH_TYPE_ORDER: readonly PathType[] = [
  'exact',
  'prefix',
  'suffix',
  'pattern',
];

const nextPathType = (type: PathType): PathType => {
  const index = PATH_TYPE_ORDER.indexOf(type);
  return PATH_TYPE_ORDER[(index + 1) % PATH_TYPE_ORDER.length];
};

/**
 * URI scheme builder (from Core › Advanced) — mirrors the native SalesIQUriScheme
 * (scheme + hosts + path matchers). Apply = setUriScheme(scheme). Android only.
 */
const UriSchemeScreen = () => {
  const [scheme, setScheme] = useState('myapp');
  const [hosts, setHosts] = useState<string[]>(['example.com']);
  const [newHost, setNewHost] = useState('');
  const [paths, setPaths] = useState<SalesIQUriSchemePath[]>([
    {type: 'prefix', value: '/orders'},
    {type: 'exact', value: '/support/faq'},
  ]);
  const [newPath, setNewPath] = useState('');

  const addHost = () => {
    if (!newHost.trim()) {
      return;
    }
    setHosts(current => [...current, newHost.trim()]);
    setNewHost('');
  };

  const addPath = () => {
    if (!newPath.trim()) {
      return;
    }
    setPaths(current => [...current, {type: 'prefix', value: newPath.trim()}]);
    setNewPath('');
  };

  const cyclePathType = (index: number) => {
    setPaths(current =>
      current.map((path, i) =>
        i === index ? {...path, type: nextPathType(path.type)} : path,
      ),
    );
  };

  const apply = () => {
    if (!scheme.trim()) {
      showToast('A scheme is required', 'danger');
      return;
    }
    // Register the deep-link URI scheme/hosts/paths the SDK should recognize (Android).
    ZohoSalesIQ.setUriScheme({
      scheme: scheme.trim(),
      hosts,
      paths,
    });
    showToast('URI scheme applied', 'success');
  };

  const capitalize = (type: PathType) =>
    type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <ScreenScaffold
      title="URI scheme"
      subtitle="setUriScheme(scheme, hosts, paths)"
      backLabel="Core">
      <Section title="Scheme">
        <Card>
          <Field
            label="Scheme"
            value={scheme}
            onChangeText={setScheme}
            placeholder="myapp"
            autoCapitalize="none"
          />
        </Card>
      </Section>

      <Section title="Hosts">
        <Card>
          {hosts.map((host, index) => (
            <ListRow
              key={`${host}-${index}`}
              title={host}
              titleTone="primary"
            />
          ))}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Field
                label="Add host"
                value={newHost}
                onChangeText={setNewHost}
                placeholder="example.com"
                autoCapitalize="none"
              />
            </View>
            <View style={{paddingHorizontal: 14}}>
              <Button title="Add" variant="ghost" onPress={addHost} />
            </View>
          </View>
        </Card>
      </Section>

      <Section
        title="Path matchers"
        footer="Tap a rule to cycle exact / prefix / suffix / pattern.">
        <Card>
          {paths.map((path, index) => (
            <ListRow
              key={`${path.value}-${index}`}
              title={path.value}
              subtitle={capitalize(path.type)}
              value="Change"
              onPress={() => cyclePathType(index)}
            />
          ))}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Field
                label="Add rule"
                value={newPath}
                onChangeText={setNewPath}
                placeholder="/orders"
                autoCapitalize="none"
              />
            </View>
            <View style={{paddingHorizontal: 14}}>
              <Button title="Add" variant="ghost" onPress={addPath} />
            </View>
          </View>
        </Card>
      </Section>

      <Button title="Apply URI scheme" icon="link" onPress={apply} />
    </ScreenScaffold>
  );
};

export default UriSchemeScreen;
