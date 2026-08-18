import React from 'react';
import {View} from 'react-native';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ZohoSalesIQ,
  SIQConversationScreen,
  SIQSessionType,
} from '@react-native-zohosalesiq/mobilisten';

import type {RootStackParamList} from '../navigation';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import Field from '../components/ui/Field';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import {showToast} from '../components/ui/Toast';

type ChatDetailRoute = RouteProp<RootStackParamList, 'ChatDetail'>;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'ChatDetail'>;

/** Chat detail (from Chat › Get chats) — Open = present(SIQConversationScreen.withId(id, chat)), End = endChat(id). */
const ChatDetailScreen = () => {
  const {params} = useRoute<ChatDetailRoute>();
  const navigation = useNavigation<NavProp>();
  const {chat} = params;
  const chatId = chat.id ?? '';

  const openChat = () => {
    if (!chatId) {
      showToast('This chat has no ID', 'danger');
      return;
    }
    // Open this conversation in the SDK chat window by its ID.
    ZohoSalesIQ.present(
      SIQConversationScreen.withId(chatId, SIQSessionType.CHAT),
    );
    showToast('Opening conversation…', 'success');
  };

  const endChat = () => {
    if (!chatId) {
      showToast('This chat has no ID', 'danger');
      return;
    }
    // End (close) this conversation by its ID.
    ZohoSalesIQ.Chat.end(chatId)
      .then(() => showToast('End chat requested', 'success'))
      .catch(() => showToast('Could not end chat', 'danger'));
    navigation.goBack();
  };

  const lastMessage =
    chat.lastMessage ?? chat.recentMessage?.text ?? 'No messages yet';

  return (
    <ScreenScaffold
      title="Conversation"
      subtitle={chatId ? `chatId · ${chatId}` : 'Chat detail'}
      backLabel="Chat">
      <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
        <Badge
          label={chat.status ?? 'Unknown'}
          tone={chat.status === 'CONNECTED' ? 'success' : 'primary'}
          icon={chat.status === 'CONNECTED' ? 'check' : undefined}
        />
        {chat.unreadCount ? (
          <Badge label={`${chat.unreadCount} unread`} tone="warning" />
        ) : null}
        {chat.rating ? (
          <Badge label={`Rating ${chat.rating}`} tone="primary" />
        ) : null}
      </View>

      <Section title="Details">
        <Card>
          <ListRow
            title={chat.attenderName ?? 'Unassigned'}
            subtitle={chat.attenderEmail ?? 'No operator email'}
            icon="visitor"
            tint="secondary"
          />
          <ListRow
            title="Department"
            value={chat.departmentName ?? '—'}
          />
          <Field
            label="Question"
            value={chat.question ?? 'No question'}
            editable={false}
          />
          <Field label="Last message" value={lastMessage} editable={false} />
        </Card>
      </Section>

      <Button title="Open chat" icon="chat" onPress={openChat} />
      <Button title="End chat" variant="destructive" onPress={endChat} />
    </ScreenScaffold>
  );
};

export default ChatDetailScreen;
