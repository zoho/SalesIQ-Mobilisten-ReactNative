import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ZohoSalesIQ,
  SIQConversationScreen,
  SIQKnowledgeBaseScreen,
  SIQConversationList,
  SIQConversationFilter,
  SIQSessionBehavior,
  SIQSessionType,
} from '@react-native-zohosalesiq/mobilisten';
import {CommunicationMode} from '@react-native-zohosalesiq/mobilisten-core';

import type {RootStackParamList} from '../navigation';
import {nextLanguage} from '../constants/languages';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import StatusBanner from '../components/ui/StatusBanner';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import SwitchRow from '../components/ui/SwitchRow';
import Field from '../components/ui/Field';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SegmentedControl from '../components/ui/SegmentedControl';
import ResultBlock from '../components/ui/ResultBlock';
import AppText from '../components/ui/AppText';
import {showToast} from '../components/ui/Toast';
import {useSettings} from '../state/settings';
import {useSelectedDepartment} from '../state/selection';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Core'>;

type ScreenKind = 'conversation' | 'knowledgeBase';
type SessionKind = 'chat' | 'call';
type BehaviorKind = 'none' | 'alwaysNew' | 'continueOrNew';
type ListKind = 'chat' | 'call' | 'all' | 'none';
type FilterKind = 'ongoing' | 'ended' | 'all';
type ThemeSourceKind = 'portal' | 'sdk';

const SCREEN_SEGMENTS: ReadonlyArray<{value: ScreenKind; label: string}> = [
  {value: 'conversation', label: 'Conversation'},
  {value: 'knowledgeBase', label: 'Knowledge base'},
];


const SESSION_TO_TYPE: Record<SessionKind, SIQSessionType> = {
  chat: SIQSessionType.CHAT,
  call: SIQSessionType.CALL,
};

const LIST_FACTORY: Record<
  ListKind,
  (filter: SIQConversationFilter) => ReturnType<typeof SIQConversationList.all>
> = {
  chat: SIQConversationList.chat,
  call: SIQConversationList.call,
  all: SIQConversationList.all,
  none: SIQConversationList.none,
};

const FILTER_VALUE: Record<FilterKind, SIQConversationFilter> = {
  ongoing: SIQConversationFilter.ONGOING,
  ended: SIQConversationFilter.ENDED,
  all: SIQConversationFilter.ALL,
};

const cycle = <T,>(order: readonly T[], value: T): T =>
  order[(order.indexOf(value) + 1) % order.length];

/** Screen 02 — the deepest screen: present() builder, config auth/fonts, advanced, flags, status. */
const CoreScreen = () => {
  const {initStatus, initError} = useSettings();
  const navigation = useNavigation<NavProp>();
  const department = useSelectedDepartment();

  // Present builder
  const [screenKind, setScreenKind] = useState<ScreenKind>('conversation');
  const [sessionKind, setSessionKind] = useState<SessionKind>('chat');
  const [behaviorKind, setBehaviorKind] =
    useState<BehaviorKind>('continueOrNew');
  const [listKind, setListKind] = useState<ListKind>('all');
  const [filterKind, setFilterKind] = useState<FilterKind>('ongoing');
  // Knowledge base screen: optional article id to open directly.
  const [articleId, setArticleId] = useState('');

  // Configuration
  const [language, setLanguage] = useState('English');
  const [operatorEmail, setOperatorEmail] = useState('');
  const [pageTitle, setPageTitle] = useState('Checkout screen');
  const [sessionId, setSessionId] = useState('');

  // Configuration builder (applied at next init)
  const [customFonts, setCustomFonts] = useState(true);

  // Advanced
  const [themeSource, setThemeSource] = useState<ThemeSourceKind>('portal');

  // Configuration flags
  const [neutralRatingDisabled, setNeutralRatingDisabled] = useState(false);
  const [trackStorageSpace, setTrackStorageSpace] = useState(true);
  const [endSessionInApp, setEndSessionInApp] = useState(false);

  // Status
  const [chatEnabled, setChatEnabled] = useState<boolean | null>(null);
  const [unreadCount, setUnreadCount] = useState<number | null>(null);
  const [communicationMode, setCommunicationMode] =
    useState<CommunicationMode | null>(null);
  const [multipleRestricted, setMultipleRestricted] = useState<boolean | null>(
    null,
  );
  const [result, setResult] = useState<unknown>(null);

  const refreshStatus = useCallback(() => {
    // Check whether live chat is currently available (brand online).
    ZohoSalesIQ.isChatEnabled(setChatEnabled);
    // Get the number of unread chat messages, for a badge.
    ZohoSalesIQ.getChatUnreadCount(setUnreadCount);
    // Check whether opening multiple simultaneous chats is blocked.
    ZohoSalesIQ.isMultipleOpenChatRestricted(setMultipleRestricted);
    // Get the enabled communication mode (chat, call, or both).
    ZohoSalesIQ.getCommunicationMode()
      .then(mode => setCommunicationMode(mode))
      .catch(() => setCommunicationMode(null));
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshStatus();
    }, [refreshStatus]),
  );

  const applyPageTitle = () => {
    // Set the current app screen name, sent as context with the next chat.
    ZohoSalesIQ.Tracking.setPageTitle(pageTitle);
    showToast('Page title updated', 'success');
  };

  const applySessionId = () => {
    if (!sessionId.trim()) {
      showToast('Enter a session ID first', 'danger');
      return;
    }
    // Tag the chat session with your own identifier.
    ZohoSalesIQ.setSessionId(sessionId.trim());
    showToast('Session ID updated', 'success');
  };

  const applyOperatorEmail = () => {
    if (!operatorEmail.trim()) {
      showToast('Enter an operator email first', 'danger');
      return;
    }
    // Route the next chat to a specific operator by email.
    ZohoSalesIQ.Chat.setOperatorEmail(operatorEmail.trim());
    showToast('Operator email set', 'success');
  };

  const cycleLanguage = () => {
    const next = nextLanguage(language);
    setLanguage(next.label);
    // Set the language used for the SDK's chat UI.
    ZohoSalesIQ.setLanguage(next.code);
    showToast(`Language set to ${next.label}`, 'success');
  };

  const buildScreen = () => {
    if (screenKind === 'knowledgeBase') {
      // Build a screen that shows knowledge base articles, or a specific
      // article when an id is supplied.
      return SIQKnowledgeBaseScreen.articles(articleId.trim() || undefined);
    }
    // Build the conversation list (chat/call/all/none) filtered by status.
    const list = LIST_FACTORY[listKind](FILTER_VALUE[filterKind]);
    // Choose how tapping opens a session: reuse existing, or force a new one.
    let behavior = SIQSessionBehavior.none;
    if (behaviorKind === 'alwaysNew') {
      // Always start a brand-new chat/call session.
      behavior = SIQSessionBehavior.alwaysNew(SESSION_TO_TYPE[sessionKind]);
    } else if (behaviorKind === 'continueOrNew') {
      // Continue an existing session if there is one, otherwise start a new one.
      behavior = SIQSessionBehavior.continueOrNew(SESSION_TO_TYPE[sessionKind]);
    }
    // Assemble the conversation screen from the chosen list + behavior.
    return SIQConversationScreen.withList(list, behavior);
  };

  const presentSdk = () => {
    // Open (present) the built SDK screen; false = no animation override.
    ZohoSalesIQ.present(buildScreen(), false)
      .then(success => {
        setResult({success});
        showToast('Presented', 'success');
      })
      .catch(error => {
        setResult({error});
        showToast('Could not present screen', 'danger');
      });
  };

  const dismissUi = () => {
    // Close any SDK screen the user currently has open.
    ZohoSalesIQ.dismissUI();
    showToast('SDK UI dismissed');
  };

  const applyThemeSource = () => {
    const next: ThemeSourceKind = themeSource === 'portal' ? 'sdk' : 'portal';
    setThemeSource(next);
    // Choose where UI theming comes from: portal settings or the SDK config.
    ZohoSalesIQ.setThemeSource(next);
    showToast(`Theme source: ${next}`, 'success');
  };

  const toggleFlag = (
    key: 'NeutralRatingDisabled' | 'TrackStorageSpace' | 'ShowEndSessionInInAppNotification',
    setter: (value: boolean) => void,
  ) => (value: boolean) => {
    setter(value);
    // Toggle a named SDK configuration flag on or off.
    ZohoSalesIQ.updateConfiguration(key, value);
  };

  const communicationLabel =
    communicationMode === CommunicationMode.CHAT_AND_CALL
      ? 'chat + call'
      : communicationMode === CommunicationMode.CALL
      ? 'call'
      : communicationMode === CommunicationMode.CHAT
      ? 'chat'
      : '…';

  const behaviorValue =
    behaviorKind === 'none'
      ? 'None'
      : behaviorKind === 'alwaysNew'
      ? 'Always new'
      : 'Continue / new';

  const bannerVariant =
    initStatus === 'initialized'
      ? 'ok'
      : initStatus === 'failed'
      ? 'danger'
      : 'info';
  const bannerTitle =
    initStatus === 'initialized'
      ? 'Initialized at app launch'
      : initStatus === 'keysRequired'
      ? 'Keys required'
      : initStatus === 'failed'
      ? 'Initialization failed'
      : 'Initializing…';
  const bannerBody =
    initStatus === 'keysRequired'
      ? 'Add your app key and access key in Settings — the SDK initializes on next launch.'
      : initStatus === 'failed'
      ? initError ??
        'The SDK could not initialize. Check the app key / access key and that the bundle id matches the SalesIQ portal.'
      : 'Automatic with your stored keys — no manual init.';

  return (
    <ScreenScaffold
      title="Core & Config"
      subtitle="Configuration, navigation & status">
      <StatusBanner
        title={bannerTitle}
        body={bannerBody}
        variant={bannerVariant}
      />

      <Section title="Status">
        <Card separated={false}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
              padding: 14,
            }}>
            <Badge
              label={chatEnabled ? 'Brand online' : 'Brand offline'}
              tone={chatEnabled ? 'success' : 'warning'}
              icon={chatEnabled ? 'check' : undefined}
            />
            <Badge
              label={chatEnabled ? 'Chat available' : 'Chat unavailable'}
              tone={chatEnabled ? 'primary' : 'warning'}
            />
            <Badge label={`Mode: ${communicationLabel}`} tone="primary" />
            <Badge
              label={unreadCount === null ? 'Unread…' : `${unreadCount} unread`}
              tone="warning"
            />
            <Badge
              label={
                multipleRestricted === null
                  ? 'Multi-chat…'
                  : multipleRestricted
                  ? 'Multi-chat: restricted'
                  : 'Multi-chat: allowed'
              }
              tone="primary"
            />
          </View>
        </Card>
      </Section>

      <Section title="Present a screen">
        <Card>
          <View style={{paddingHorizontal: 14, paddingTop: 12}}>
            <SegmentedControl
              segments={SCREEN_SEGMENTS}
              value={screenKind}
              onChange={setScreenKind}
              accessibilityLabel="Screen type"
            />
          </View>
          {screenKind === 'conversation' ? (
            <>
              <ListRow
                title="Session type"
                subtitle="SIQConversationScreen"
                value={sessionKind === 'chat' ? 'Chat' : 'Call'}
                onPress={() =>
                  setSessionKind(current =>
                    current === 'chat' ? 'call' : 'chat',
                  )
                }
              />
              <ListRow
                title="Session behavior"
                value={behaviorValue}
                chevron
                onPress={() =>
                  setBehaviorKind(current =>
                    current === 'none'
                      ? 'alwaysNew'
                      : current === 'alwaysNew'
                      ? 'continueOrNew'
                      : 'none',
                  )
                }
              />
              <ListRow
                title="List"
                subtitle="withList(type, filter)"
                value={`${listKind} · ${filterKind}`}
                onPress={() =>
                  setListKind(current =>
                    cycle<ListKind>(
                      ['all', 'chat', 'call', 'none'],
                      current,
                    ),
                  )
                }
              />
              <ListRow
                title="List filter"
                value={filterKind}
                onPress={() =>
                  setFilterKind(current =>
                    cycle<FilterKind>(['ongoing', 'ended', 'all'], current),
                  )
                }
              />
            </>
          ) : (
            <>
              <ListRow
                title="Type"
                subtitle="ResourceType.articles"
                value="Articles"
              />
              <View style={{paddingHorizontal: 14, paddingBottom: 12}}>
                <Field
                  label="Article ID"
                  value={articleId}
                  onChangeText={setArticleId}
                  placeholder="Optional — open a specific article"
                  autoCapitalize="none"
                />
              </View>
            </>
          )}
        </Card>
        <Button
          title="present(PresentOptions)"
          icon="nav"
          onPress={presentSdk}
        />
        <Button title="Dismiss UI" variant="secondary" onPress={dismissUi} />
      </Section>

      <Section title="Configuration">
        <Card>
          <ListRow
            title="Language"
            icon="globe"
            tint="primary"
            value={language}
            chevron
            onPress={cycleLanguage}
          />
          <ListRow
            title="Department"
            subtitle="Route new chats"
            value={department}
            chevron
            onPress={() =>
              navigation.navigate('DepartmentPicker', {
                backLabel: 'Core',
                selected: department,
              })
            }
          />
          <Field
            label="Operator email"
            value={operatorEmail}
            onChangeText={setOperatorEmail}
            placeholder="agent@brand.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Field
            label="Page title"
            value={pageTitle}
            onChangeText={setPageTitle}
          />
          <Field
            label="Session ID"
            value={sessionId}
            onChangeText={setSessionId}
            placeholder="Optional identifier"
            autoCapitalize="none"
          />
        </Card>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View style={{flex: 1}}>
            <Button
              title="Set email"
              variant="secondary"
              onPress={applyOperatorEmail}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              title="Set title"
              variant="secondary"
              onPress={applyPageTitle}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              title="Set ID"
              variant="secondary"
              onPress={applySessionId}
            />
          </View>
        </View>
      </Section>

      <Section
        title="Configuration builder"
        footer="Applied at the automatic init call.">
        <Card>
          <SwitchRow
            title="Custom fonts"
            subtitle="regular · medium"
            icon="article"
            tint="primary"
            value={customFonts}
            onValueChange={setCustomFonts}
          />
        </Card>
      </Section>

      <Section title="Advanced">
        <Card>
          <ListRow
            title="Theme source"
            subtitle="setThemeSource"
            icon="sun"
            tint="primary"
            value={themeSource === 'portal' ? 'Portal' : 'SDK'}
            onPress={applyThemeSource}
          />
          <ListRow
            title="Refresh data"
            subtitle="display / secret fields"
            icon="events"
            tint="secondary"
            chevron
            onPress={() => navigation.navigate('RefreshData')}
          />
          <ListRow
            title="URI scheme"
            subtitle="setUriScheme"
            icon="link"
            tint="primary"
            chevron
            onPress={() => navigation.navigate('UriScheme')}
          />
        </Card>
      </Section>

      <Section title="Configuration flags">
        <Card>
          <SwitchRow
            title="Neutral rating disabled"
            value={neutralRatingDisabled}
            onValueChange={toggleFlag(
              'NeutralRatingDisabled',
              setNeutralRatingDisabled,
            )}
          />
          <SwitchRow
            title="Track storage space"
            value={trackStorageSpace}
            onValueChange={toggleFlag(
              'TrackStorageSpace',
              setTrackStorageSpace,
            )}
          />
          <SwitchRow
            title="End session in in-app"
            value={endSessionInApp}
            onValueChange={toggleFlag(
              'ShowEndSessionInInAppNotification',
              setEndSessionInApp,
            )}
          />
        </Card>
      </Section>

      <Section title="Response">
        <ResultBlock
          data={
            result ?? {
              isSDKEnabled: chatEnabled ?? false,
              communicationMode: communicationLabel,
            }
          }
        />
      </Section>

      <AppText
        variant="caption"
        tone="tertiary"
        style={{paddingHorizontal: 6, lineHeight: 16}}>
        The conversation data provider (setDataProvider) is handled on a separate
        RN branch and intentionally omitted here.
      </AppText>
    </ScreenScaffold>
  );
};

export default CoreScreen;
