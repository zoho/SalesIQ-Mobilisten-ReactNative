import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ZohoSalesIQ,
  ZSIQChatComponent,
  SIQConversationScreen,
  SIQSessionType,
} from '@react-native-zohosalesiq/mobilisten';

import useTheme from '../theme/useTheme';
import {radius} from '../theme/tokens';
import type {RootStackParamList} from '../navigation';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import Field from '../components/ui/Field';
import SwitchRow from '../components/ui/SwitchRow';
import Button from '../components/ui/Button';
import ResultBlock from '../components/ui/ResultBlock';
import AppText from '../components/ui/AppText';
import {showToast} from '../components/ui/Toast';
import {useDepartments} from '../state/departments';
import ConversationAttributesEditor, {
  buildAttributes,
  emptyAttributesDraft,
  type AttributesDraft,
} from '../components/ConversationAttributesEditor';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;

interface ComponentRow {
  component: ZSIQChatComponent;
  title: string;
}

/** The full ChatComponent set (MEDIA_CAPTURE excluded — deprecated). */
const COMPONENT_ROWS: readonly ComponentRow[] = [
  {component: ZSIQChatComponent.OPERATOR_IMAGE, title: 'Operator image'},
  {component: ZSIQChatComponent.RATING, title: 'Rating'},
  {component: ZSIQChatComponent.FEEDBACK, title: 'Feedback'},
  {component: ZSIQChatComponent.SCREENSHOT, title: 'Screenshot'},
  {component: ZSIQChatComponent.PRE_CHAT_FORM, title: 'Pre-chat form'},
  {component: ZSIQChatComponent.VISITOR_NAME, title: 'Visitor name'},
  {component: ZSIQChatComponent.EMAIL_TRANSCRIPT, title: 'Email transcript'},
  {component: ZSIQChatComponent.FILE_SHARE, title: 'File sharing'},
  {component: ZSIQChatComponent.TAKE_PHOTO, title: 'Take photo'},
  {component: ZSIQChatComponent.RECORD_VIDEO, title: 'Record video'},
  {component: ZSIQChatComponent.MEDIA_LIBRARY, title: 'Media library'},
  {component: ZSIQChatComponent.END, title: 'End'},
  {component: ZSIQChatComponent.END_WHEN_IN_QUEUE, title: 'End · when in queue'},
  {component: ZSIQChatComponent.END_WHEN_BOT_CONNECTED, title: 'End · when bot connected'},
  {component: ZSIQChatComponent.END_WHEN_OPERATOR_CONNECTED, title: 'End · when operator connected'},
  {component: ZSIQChatComponent.REOPEN, title: 'Reopen'},
  {component: ZSIQChatComponent.CALL, title: 'Call'},
  {component: ZSIQChatComponent.FILE_SHARING_WHEN_BOT_CONNECTED, title: 'File sharing · when bot connected'},
  {component: ZSIQChatComponent.VOICE_NOTE_WHEN_BOT_CONNECTED, title: 'Voice note · when bot connected'},
];

/** Screen 05 — start / trigger, manage, behavior, component visibility, operator image, orders. */
const ChatScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<NavProp>();
  const {departments} = useDepartments();

  const [question, setQuestion] = useState('');
  const [triggerAction, setTriggerAction] = useState('');
  // Three independent attribute sets so each path can be tested with distinct values.
  const [globalDraft, setGlobalDraft] = useState<AttributesDraft>(emptyAttributesDraft);
  const [chatId, setChatId] = useState('');
  const [onlineTitle, setOnlineTitle] = useState('');
  const [offlineTitle, setOfflineTitle] = useState('');
  const [waitingTime, setWaitingTime] = useState('30');
  const [hideQueue, setHideQueue] = useState(false);
  const [feedbackAfterSkip, setFeedbackAfterSkip] = useState(true);
  const [allowOffline, setAllowOffline] = useState(false);
  const [actionName, setActionName] = useState('');
  const [actionTimeout, setActionTimeout] = useState('30');
  const [attenderId, setAttenderId] = useState('');
  const [attenderImage, setAttenderImage] = useState<string | null>(null);
  const [components, setComponents] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      COMPONENT_ROWS.map(row => [
        row.component,
        row.component !== ZSIQChatComponent.PRE_CHAT_FORM,
      ]),
    ),
  );
  const [result, setResult] = useState<unknown>(null);

  const handleResult =
    (okMessage: string, failMessage: string) =>
    (error: {message?: string} | null, value: unknown) => {
      setResult(error?.message ? {error} : {result: value});
      showToast(
        // Surface the SDK's actual reason (e.g. code 702 "Parallel conversations
        // are currently disabled…") instead of a generic failure message.
        error?.message ? `${failMessage}: ${error.message}` : okMessage,
        error?.message ? 'danger' : 'success',
      );
    };

  const startConversation = () => {
    const cb = handleResult('Conversation started', 'Failed to start chat');
    ZohoSalesIQ.Chat.start(question || 'How can we help?', null, null, cb);
  };

  const startWithTrigger = () => {
    if (!triggerAction.trim()) {
      showToast('Enter a value first', 'danger');
      return;
    }
    const cb = handleResult('Trigger fired', 'Trigger failed');
    ZohoSalesIQ.Chat.startWithTrigger(triggerAction.trim(), null, cb);
  };

  const applyAttributes = () => {
    // Attach the global attribute set to the current/next conversation.
    const attributes = buildAttributes(globalDraft, departments);
    if (!attributes) {
      showToast('Fill at least one attribute first', 'danger');
      return;
    }
    ZohoSalesIQ.Conversation.setAttributes(attributes)
      .then(() => showToast('Attributes set', 'success'))
      .catch(() => showToast('Failed to set attributes', 'danger'));
  };

  const openById = () => {
    if (!chatId.trim()) {
      showToast('Enter a chat ID first', 'danger');
      return;
    }
    // Open an existing conversation by its chat ID.
    ZohoSalesIQ.present(
      SIQConversationScreen.withId(chatId.trim(), SIQSessionType.CHAT),
    );
    showToast('Opening chat…', 'success');
  };

  const getChats = () => {
    // Fetch the list of the visitor's conversations. Uses the callback-based
    // ZohoSalesIQ.getChats() — the Promise-based Chat.getList is pending a
    // re-model around SalesIQConversation.
    ZohoSalesIQ.getChats((error, chats) => {
      if (error) {
        setResult({error});
        showToast('Failed to load chats', 'danger');
        return;
      }
      setResult({chats});
      const first = chats?.[0];
      if (first) {
        navigation.navigate('ChatDetail', {chat: first});
      } else {
        showToast('No chats returned', 'default');
      }
    });
  };

  const endChat = () => {
    if (!chatId.trim()) {
      showToast('Enter a chat ID to end', 'danger');
      return;
    }
    // End (close) a conversation by its chat ID.
    ZohoSalesIQ.Chat.end(chatId.trim())
      .then(() => showToast('End chat requested', 'success'))
      .catch(() => showToast('Could not end chat', 'danger'));
  };

  const applyTitles = () => {
    // Set the chat window's title bar text for online and offline states.
    ZohoSalesIQ.Chat.setTitle(
      onlineTitle.trim() || null,
      offlineTitle.trim() || null,
    );
    // Prefill the chat's opening question shown to the visitor.
    ZohoSalesIQ.Chat.setQuestion(onlineTitle.trim() || 'How can we help?');
    // Set the message shown when all operators are offline.
    ZohoSalesIQ.Chat.setOfflineMessage(
      offlineTitle.trim() || 'We are away — leave us a message.',
    );
    showToast('Chat titles & messages updated', 'success');
  };

  const applyWaitingTime = () => {
    const seconds = Number(waitingTime);
    if (!Number.isFinite(seconds) || seconds < 0) {
      showToast('Enter waiting time in seconds', 'danger');
      return;
    }
    // Set how long (seconds) to wait for an operator before offering offline.
    ZohoSalesIQ.Chat.setWaitingTime(seconds);
    showToast(`Waiting time: ${seconds}s`, 'success');
  };

  const registerAction = () => {
    if (!actionName.trim()) {
      showToast('Enter a chat action name first', 'danger');
      return;
    }
    // Register a custom chat action your app can respond to during a chat.
    ZohoSalesIQ.ChatActions.register(actionName.trim());
    const timeout = Number(actionTimeout);
    if (Number.isFinite(timeout) && timeout > 0) {
      // Set how long (seconds) the SDK waits for the action to be handled.
      ZohoSalesIQ.ChatActions.setTimeout(timeout);
    }
    showToast(`Chat action "${actionName.trim()}" registered`, 'success');
  };

  const fetchOperatorImage = () => {
    if (!attenderId.trim()) {
      showToast('Enter an attender ID first', 'danger');
      return;
    }
    // Fetch an operator's (attender's) profile image by their ID.
    ZohoSalesIQ.Chat.fetchAttenderImage(attenderId.trim(), true)
      .then(image => {
        if (!image) {
          showToast('Could not fetch operator image', 'danger');
          return;
        }
        setAttenderImage(image);
        showToast('Operator image fetched', 'success');
      })
      .catch(() => showToast('Could not fetch operator image', 'danger'));
  };

  const toggleComponent = (component: ZSIQChatComponent) => (value: boolean) => {
    setComponents(current => ({...current, [component]: value}));
    // Show or hide a single component in the chat window (rating, file share…).
    ZohoSalesIQ.Chat.setVisibility(component, value);
  };

  const imageSource = attenderImage
    ? attenderImage.startsWith('data:') || attenderImage.startsWith('http')
      ? attenderImage
      : `data:image/png;base64,${attenderImage}`
    : null;

  return (
    <ScreenScaffold title="Chat" subtitle="Conversations & window components">
      <Button
        title="Start a conversation"
        icon="chat"
        onPress={startConversation}
      />
      <Button
        title="Orders demo — a chat per order"
        icon="grid"
        variant="secondary"
        onPress={() => navigation.navigate('Orders')}
      />
      <AppText
        variant="caption"
        tone="secondary"
        style={{paddingHorizontal: 6, lineHeight: 17}}>
        customChatId maps a chat to a business entity (order / ticket). See the
        Orders showcase.
      </AppText>

      <Section
        title="Start chat"
        footer="Chat.start(question, customChatId?, departmentName?, callback?)">
        <Card>
          <Field
            label="Question"
            value={question}
            onChangeText={setQuestion}
            placeholder="How can we help?"
          />
          <ListRow
            title="Start conversation"
            titleTone="brand"
            chevron
            onPress={startConversation}
          />
        </Card>
      </Section>

      <Section
        title="Start with trigger"
        footer="Chat.startWithTrigger(customChatId?, departmentName?, callback?)">
        <Card>
          <Field
            label="Trigger action name"
            value={triggerAction}
            onChangeText={setTriggerAction}
            placeholder="custom action name"
            autoCapitalize="none"
          />
          <ListRow
            title="Fire trigger"
            titleTone="brand"
            chevron
            onPress={startWithTrigger}
          />
        </Card>
      </Section>

      <Section
        title="Global conversation attributes"
        footer="Conversation.setAttributes(attributes) — applies to the current / next conversation.">
        <Card>
          <ConversationAttributesEditor
            draft={globalDraft}
            onChange={setGlobalDraft}
            departments={departments}
          />
          <ListRow
            title="Set attributes"
            subtitle="Conversation.setAttributes"
            titleTone="brand"
            chevron
            onPress={applyAttributes}
          />
        </Card>
      </Section>

      <Section title="Manage">
        <Card>
          <Field
            label="Chat ID"
            value={chatId}
            onChangeText={setChatId}
            placeholder="Paste a conversation ID"
            autoCapitalize="none"
          />
          <ListRow
            title="Open by ID"
            titleTone="brand"
            chevron
            onPress={openById}
          />
          <ListRow
            title="Get chats"
            subtitle="opens the first result in Chat detail"
            value="All"
            chevron
            onPress={getChats}
          />
          <ListRow title="End chat" titleTone="danger" onPress={endChat} />
        </Card>
      </Section>

      <Section title="Behavior">
        <Card>
          <Field
            label="Online title"
            value={onlineTitle}
            onChangeText={setOnlineTitle}
            placeholder="We're here"
          />
          <Field
            label="Offline title"
            value={offlineTitle}
            onChangeText={setOfflineTitle}
            placeholder="Leave a message"
          />
          <ListRow
            title="Apply titles"
            titleTone="brand"
            chevron
            onPress={applyTitles}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Field
                label="Waiting time (s)"
                value={waitingTime}
                onChangeText={setWaitingTime}
                keyboardType="number-pad"
              />
            </View>
            <View style={{paddingHorizontal: 14}}>
              <Button title="Apply" variant="ghost" onPress={applyWaitingTime} />
            </View>
          </View>
          <SwitchRow
            title="Hide queue time"
            value={hideQueue}
            onValueChange={value => {
              setHideQueue(value);
              // Show or hide the queue position/wait time in the chat window.
              ZohoSalesIQ.Chat.hideQueueTime(value);
            }}
          />
          <SwitchRow
            title="Show feedback after skip"
            value={feedbackAfterSkip}
            onValueChange={value => {
              setFeedbackAfterSkip(value);
              // Still show the feedback form even if the visitor skipped rating.
              ZohoSalesIQ.Chat.showFeedbackAfterSkip(value);
            }}
          />
          <SwitchRow
            title="Allow chat in offline mode"
            subtitle="Android only"
            value={allowOffline}
            onValueChange={value => {
              setAllowOffline(value);
              // Android only: let visitors start a chat while operators are offline.
              ZohoSalesIQ.Chat.allowChatInOfflineMode(value);
            }}
          />
          <ListRow
            title="Show feedback (up to 5 min)"
            titleTone="brand"
            chevron
            onPress={() => {
              // Allow the feedback form to appear for up to 300s after a chat ends.
              ZohoSalesIQ.Chat.showFeedback(300);
              showToast('Feedback window configured', 'success');
            }}
          />
        </Card>
      </Section>

      <Section title="Chat actions">
        <Card>
          <Field
            label="Action name"
            value={actionName}
            onChangeText={setActionName}
            placeholder="e.g. verify_account"
            autoCapitalize="none"
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Field
                label="Timeout (s)"
                value={actionTimeout}
                onChangeText={setActionTimeout}
                keyboardType="number-pad"
              />
            </View>
            <View style={{paddingHorizontal: 14}}>
              <Button title="Register" variant="ghost" onPress={registerAction} />
            </View>
          </View>
        </Card>
      </Section>

      <Section title="Visible components" footer="Full ChatComponent set — 19 toggles.">
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

      <Section title="Operator image">
        <Card>
          <Field
            label="Attender ID"
            value={attenderId}
            onChangeText={setAttenderId}
            placeholder="operator id"
            autoCapitalize="none"
          />
          <ListRow
            title="Fetched avatar"
            subtitle="fetchAttenderImage"
            titleTone="brand"
            trailing={
              imageSource ? (
                <Image
                  source={{uri: imageSource}}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: radius.pill,
                    backgroundColor: colors.cardAlt,
                  }}
                />
              ) : (
                <AppText variant="subhead" tone="brand" weight="600">
                  Fetch
                </AppText>
              )
            }
            onPress={fetchOperatorImage}
          />
        </Card>
      </Section>

      {result !== null ? (
        <ResultBlock label="Last result" data={result} />
      ) : null}
    </ScreenScaffold>
  );
};

export default ChatScreen;
