import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';

import useTheme from '../theme/useTheme';
import type {RootStackParamList} from '../navigation';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import Button from '../components/ui/Button';
import AppText from '../components/ui/AppText';
import StateView from '../components/ui/StateView';
import {showToast} from '../components/ui/Toast';
import {useCart} from './catalog';
import {money, runSdk, tintFor} from './StoreScreen';

type Nav = NativeStackNavigationProp<RootStackParamList, 'StoreCart'>;

/**
 * Zylker store cart — shows how SalesIQ chat fits retail checkout moments:
 * placing an order fires a proactive trigger, and a button opens a payment chat.
 */
const StoreCartScreen = () => {
  const {colors} = useTheme();
  const nav = useNavigation<Nav>();
  const cart = useCart();
  const items = cart.items();

  const placeOrder = () => {
    // NOTE: named-action triggers are temporarily unavailable (attributes overload disabled until
    // iOS supports them). Start a standard chat at checkout instead.
    runSdk('Order placed — we’ll follow up in chat', () =>
      ZohoSalesIQ.Chat.start('I just completed checkout', null, null),
    );
    cart.clear();
    showToast('Order placed 🎉', 'success');
    nav.goBack();
  };

  return (
    <ScreenScaffold title="Your cart" backLabel="Zylker">
      <Card>
        <StateView
          empty={items.length === 0}
          emptyIcon="core"
          emptyTitle="Your cart is empty"
          emptySubtitle="Browse the store and add something you like">
          {items.map(item => {
            const tint = tintFor(colors, item.product.tint);
            return (
              <ListRow
                key={item.product.id}
                title={item.product.name}
                subtitle={`Qty ${item.qty} · ${money(item.product.price)}`}
                trailing={
                  <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                    <View style={{width: 34, height: 34, borderRadius: 9, backgroundColor: tint.bg, alignItems: 'center', justifyContent: 'center'}}>
                      <MaterialCommunityIcons name={item.product.icon} size={18} color={tint.fg} />
                    </View>
                    <MaterialCommunityIcons name="close" size={18} color={colors.textSecondary} onPress={() => cart.remove(item.product.id)} />
                  </View>
                }
              />
            );
          })}
        </StateView>
      </Card>

      {items.length > 0 ? (
        <>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 12, paddingHorizontal: 4}}>
            <AppText tone="secondary" style={{fontSize: 14}}>Total</AppText>
            <AppText weight="600" style={{fontSize: 20, color: colors.textPrimary}}>{money(cart.total())}</AppText>
          </View>
          <Button title="Place order" onPress={placeOrder} />
          <View style={{height: 10}} />
          <Button
            title="Chat about payment"
            variant="secondary"
            // Start a chat (question, customChatId 'cart', 'Support' department).
            onPress={() => runSdk('Opening chat…', () => ZohoSalesIQ.Chat.start('I have a question about payment', 'cart', 'Support'))}
          />
        </>
      ) : (
        <>
          <View style={{height: 12}} />
          <Button title="Continue shopping" variant="secondary" onPress={() => nav.goBack()} />
        </>
      )}
    </ScreenScaffold>
  );
};

export default StoreCartScreen;
