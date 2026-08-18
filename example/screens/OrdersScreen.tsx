import React from 'react';
import {View} from 'react-native';
import {
  ZohoSalesIQ,
  SIQConversationScreen,
  SIQSessionType,
} from '@react-native-zohosalesiq/mobilisten';

import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import AppText from '../components/ui/AppText';
import {showToast} from '../components/ui/Toast';

interface Order {
  id: string;
  summary: string;
  status: string;
  statusTone: 'success' | 'primary' | 'warning';
  faqs: string[];
}

/** The registered custom action used to open an order-scoped chat without a question. */

const ORDERS: readonly Order[] = [
  {
    id: 'A-1024',
    summary: 'Delivered · $129.00',
    status: 'Delivered',
    statusTone: 'success',
    faqs: ['Where is my package?', 'Start a return'],
  },
  {
    id: 'A-1057',
    summary: 'Shipped · $58.00',
    status: 'Shipped',
    statusTone: 'primary',
    faqs: ['Change delivery address?'],
  },
];

/**
 * Orders showcase (customChatId business case). Reached from Chat.
 * - "Chat about this order" → Chat.startWithTrigger(action, customChatId = orderId) — no question.
 * - An FAQ row → Chat.start(question = FAQ, { customChatId: orderId }).
 * Both map the conversation to the order via customChatId so the SDK opens (or resumes) it.
 */
const OrdersScreen = () => {
  // Fallback: land the visitor in the order's conversation even if start fails.
  const presentOrderConversation = (orderId: string) => {
    // Open the chat mapped to this order id (customChatId) directly in the SDK UI.
    ZohoSalesIQ.present(
      SIQConversationScreen.withId(orderId, SIQSessionType.CHAT),
      false,
    ).catch(() => {});
  };

  const chatAboutOrder = (order: Order) => {
    // NOTE: named-action triggers are temporarily unavailable (the attributes overload is disabled
    // until iOS supports them). Start a chat tagged with the order id (customChatId) via start().
    ZohoSalesIQ.Chat.start('I need help with my order', order.id, null, error => {
      if (error) {
        showToast('Could not open order chat', 'danger');
        presentOrderConversation(order.id);
      } else {
        showToast(`Chat opened for order #${order.id}`, 'success');
      }
    });
  };

  const askAboutOrder = (order: Order, faq: string) => {
    // Start a chat with the FAQ as its question, tagged with the order id (customChatId).
    ZohoSalesIQ.Chat.start(faq, order.id, null, error => {
      if (error) {
        showToast('Could not start chat', 'danger');
        presentOrderConversation(order.id);
      } else {
        showToast(`Chat started for order #${order.id}`, 'success');
      }
    });
  };

  return (
    <ScreenScaffold
      title="Your orders"
      subtitle="A conversation per order"
      backLabel="Chat">
      <AppText
        variant="caption"
        tone="secondary"
        style={{paddingHorizontal: 6, lineHeight: 17}}>
        Demonstrates customChatId — the SDK opens (or resumes) the chat mapped to
        each order id.
      </AppText>

      {ORDERS.map((order, index) => (
        <Section key={order.id}>
          <Card>
            <ListRow
              title={`Order #${order.id}`}
              subtitle={order.summary}
              icon="grid"
              tint="accent"
              trailing={<Badge label={order.status} tone={order.statusTone} />}
            />
            {order.faqs.map(faq => (
              <ListRow
                key={faq}
                title={faq}
                icon="chat"
                tint="primary"
                onPress={() => askAboutOrder(order, faq)}
                accessibilityLabel={`Ask "${faq}" about order ${order.id}`}
              />
            ))}
            <View style={{paddingHorizontal: 12, paddingVertical: 12}}>
              <Button
                title="Chat about this order"
                icon="chat"
                variant={index === 0 ? 'primary' : 'secondary'}
                onPress={() => chatAboutOrder(order)}
              />
            </View>
          </Card>
        </Section>
      ))}

      <AppText
        variant="caption"
        tone="secondary"
        style={{paddingHorizontal: 6, lineHeight: 17}}>
        Chat icon on an FAQ → Chat.start(question, {'{'}customChatId{'}'}). "Chat
        about this order" → Chat.startWithTrigger(action, customChatId) — no
        question needed.
      </AppText>
    </ScreenScaffold>
  );
};

export default OrdersScreen;
