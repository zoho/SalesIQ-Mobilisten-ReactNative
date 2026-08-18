import React from 'react';
import {View} from 'react-native';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';

import useTheme from '../theme/useTheme';
import type {RootStackParamList} from '../navigation';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AppText from '../components/ui/AppText';
import {showToast} from '../components/ui/Toast';
import {ORDERS, productById} from './catalog';
import {money, runSdk, tintFor} from './StoreScreen';

type OrderRoute = RouteProp<RootStackParamList, 'StoreOrderDetail'>;
type Nav = NativeStackNavigationProp<RootStackParamList, 'StoreOrderDetail'>;

/**
 * Zylker store order detail — an order status timeline plus a "get help" button
 * that opens a chat pinned to this order id (customChatId).
 */
const StoreOrderDetailScreen = () => {
  const {colors} = useTheme();
  const {params} = useRoute<OrderRoute>();
  const nav = useNavigation<Nav>();
  const order = ORDERS.find(o => o.id === params.orderId);

  if (!order) {
    return <ScreenScaffold title="Order" backLabel="Zylker"><AppText tone="secondary">Not found</AppText></ScreenScaffold>;
  }
  const product = productById(order.productId)!;
  const tint = tintFor(colors, product.tint);
  const delivered = order.status === 'Delivered';

  const steps = [
    {label: `Ordered · ${order.placed}`, done: true},
    {label: `Shipped · Jul 5`, done: order.status !== 'Processing'},
    {label: order.eta, done: delivered},
  ];

  // Order-scoped chat: the conversation is pinned to this order id.
  const getHelp = () =>
    // Start a chat (question, customChatId = order id, 'Support' department).
    runSdk('Opening chat…', () =>
      ZohoSalesIQ.Chat.start(`I need help with order ${order.id}`, order.id, 'Support'),
    );

  return (
    <ScreenScaffold title={`Order #${order.id}`} backLabel="Zylker">
      <Card>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12}}>
          <View style={{width: 46, height: 46, borderRadius: 10, backgroundColor: tint.bg, alignItems: 'center', justifyContent: 'center'}}>
            <MaterialCommunityIcons name={product.icon} size={24} color={tint.fg} />
          </View>
          <View style={{flex: 1}}>
            <AppText style={{fontSize: 13, color: colors.textPrimary}}>{product.name}</AppText>
            <AppText tone="secondary" style={{fontSize: 12, marginTop: 2}}>Qty 1 · {money(product.price)}</AppText>
          </View>
          <View style={{backgroundColor: delivered ? colors.tintSecondary : colors.tintPrimary, borderRadius: 8, paddingHorizontal: 9, paddingVertical: 3}}>
            <AppText weight="600" style={{fontSize: 11, color: delivered ? colors.secondary : colors.primary}}>{order.status}</AppText>
          </View>
        </View>
      </Card>

      <View style={{marginTop: 16, paddingLeft: 6}}>
        {steps.map((s, i) => (
          <View key={i}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <MaterialCommunityIcons
                name={s.done ? 'check-circle' : 'truck-outline'}
                size={18}
                color={s.done ? colors.secondary : colors.textSecondary}
              />
              <AppText style={{fontSize: 12.5, color: s.done ? colors.textPrimary : colors.textSecondary}}>{s.label}</AppText>
            </View>
            {i < steps.length - 1 ? (
              <View style={{width: 1.5, height: 14, backgroundColor: colors.border, marginLeft: 8, marginVertical: 2}} />
            ) : null}
          </View>
        ))}
      </View>

      <View style={{height: 18}} />
      <Button title="Get help with this order" onPress={getHelp} />
      <View style={{height: 10}} />
      <View style={{flexDirection: 'row', gap: 10}}>
        <View style={{flex: 1}}>
          <Button title="Track" variant="secondary" onPress={() => showToast('Tracking opened')} />
        </View>
        <View style={{flex: 1}}>
          <Button title="Return" variant="secondary" onPress={getHelp} />
        </View>
      </View>
    </ScreenScaffold>
  );
};

export default StoreOrderDetailScreen;
