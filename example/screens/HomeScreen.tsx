import React from 'react';
import {Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '../theme/useTheme';
import type {RootStackParamList} from '../navigation';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Card from '../components/ui/Card';
import Section from '../components/ui/Section';
import ListRow from '../components/ui/ListRow';
import AppText from '../components/ui/AppText';
import {AppIcons} from '../components/ui/icons';
import {useSettings} from '../state/settings';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

/** Screen 01 — dashboard for every module; the hero reflects automatic SDK init. */
const HomeScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<NavProp>();
  const {initStatus, initError} = useSettings();

  const heroCopy =
    initStatus === 'initialized'
      ? {
          title: 'SDK initialized at launch',
          body: 'Brand online · chat & calls available',
        }
      : initStatus === 'keysRequired'
      ? {
          title: 'Keys required',
          body: 'Add your app key and access key in Settings to initialize',
        }
      : initStatus === 'failed'
      ? {
          title: 'Initialization failed',
          body: initError ?? 'Check Settings for details and retry',
        }
      : {
          title: 'Initializing…',
          body: 'The SDK starts automatically at launch',
        };

  const dotColor =
    initStatus === 'initialized'
      ? colors.secondary
      : initStatus === 'failed'
      ? colors.danger
      : colors.accent;

  return (
    <ScreenScaffold
      title="Mobilisten"
      subtitle="SalesIQ SDK showcase"
      showBack={false}
      headerRight={
        <Pressable
          onPress={() => navigation.navigate('Settings')}
          accessibilityRole="button"
          accessibilityLabel="Settings"
          hitSlop={8}
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            backgroundColor: colors.tintPrimary,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name={AppIcons.settings}
            size={20}
            color={colors.primary}
          />
        </Pressable>
      }>
      <Card>
        <View style={{padding: 15, gap: 7}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: dotColor,
              }}
            />
            <AppText variant="subhead" weight="600" style={{fontSize: 13}}>
              {heroCopy.title}
            </AppText>
          </View>
          <AppText variant="caption" tone="secondary" style={{lineHeight: 17}}>
            {heroCopy.body}
          </AppText>
        </View>
      </Card>

      <Section title="Demo app">
        <Card>
          <ListRow
            title="Zylker store"
            subtitle="A shopping app with SalesIQ built in"
            icon="homepage"
            tint="primary"
            chevron
            onPress={() => navigation.navigate('Store')}
          />
        </Card>
      </Section>

      <Section title="Engage">
        <Card>
          <ListRow
            title="Chat"
            subtitle="Start & manage conversations"
            icon="chat"
            tint="primary"
            chevron
            onPress={() => navigation.navigate('Chat')}
          />
          <ListRow
            title="Calls"
            subtitle="Voice calls & history"
            icon="calls"
            tint="secondary"
            chevron
            onPress={() => navigation.navigate('Calls')}
          />
          <ListRow
            title="Launcher"
            subtitle="Visibility & position"
            icon="launcher"
            tint="accent"
            chevron
            onPress={() => navigation.navigate('Launcher')}
          />
        </Card>
      </Section>

      <Section title="Audience & content">
        <Card>
          <ListRow
            title="Visitor"
            icon="visitor"
            tint="secondary"
            chevron
            onPress={() => navigation.navigate('Visitor')}
          />
          <ListRow
            title="Knowledge base"
            icon="knowledgeBase"
            tint="accent"
            chevron
            onPress={() => navigation.navigate('KnowledgeBase')}
          />
          <ListRow
            title="Homepage & help center"
            icon="homepage"
            tint="primary"
            chevron
            onPress={() => navigation.navigate('HomepageHelpCenter')}
          />
        </Card>
      </Section>

      <Section title="System">
        <Card>
          <ListRow
            title="Core & configuration"
            icon="core"
            tint="primary"
            chevron
            onPress={() => navigation.navigate('Core')}
          />
          <ListRow
            title="Notifications"
            icon="notifications"
            tint="accent"
            chevron
            onPress={() => navigation.navigate('Notifications')}
          />
          <ListRow
            title="Events console"
            icon="events"
            tint="secondary"
            chevron
            onPress={() => navigation.navigate('Events')}
          />
        </Card>
      </Section>
    </ScreenScaffold>
  );
};

export default HomeScreen;
