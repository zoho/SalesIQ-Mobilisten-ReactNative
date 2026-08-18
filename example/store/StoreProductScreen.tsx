import React from 'react';
import {View} from 'react-native';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';

import useTheme from '../theme/useTheme';
import type {RootStackParamList} from '../navigation';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Button from '../components/ui/Button';
import AppText from '../components/ui/AppText';
import {showToast} from '../components/ui/Toast';
import {productById, useCart} from './catalog';
import {money, runSdk, tintFor} from './StoreScreen';

type ProductRoute = RouteProp<RootStackParamList, 'StoreProduct'>;
type Nav = NativeStackNavigationProp<RootStackParamList, 'StoreProduct'>;

/**
 * Zylker store product page — add-to-cart plus an "ask about this product"
 * button that opens a chat scoped to this SKU (customChatId).
 */
const StoreProductScreen = () => {
  const {colors} = useTheme();
  const {params} = useRoute<ProductRoute>();
  const nav = useNavigation<Nav>();
  const cart = useCart();
  const product = productById(params.productId);

  if (!product) {
    return <ScreenScaffold title="Product" backLabel="Zylker"><AppText tone="secondary">Not found</AppText></ScreenScaffold>;
  }
  const tint = tintFor(colors, product.tint);

  const addToCart = () => {
    cart.add(product);
    showToast('Added to cart', 'success');
  };

  // Order/product-scoped chat: customChatId pins the conversation to this SKU.
  const askAboutProduct = () =>
    // Start a chat (question, customChatId = product id, 'Sales' department).
    runSdk('Opening chat…', () =>
      ZohoSalesIQ.Chat.start(`I have a question about ${product.name}`, product.id, 'Sales'),
    );

  return (
    <ScreenScaffold title={product.name} backLabel="Zylker">
      <View style={{height: 170, borderRadius: 16, backgroundColor: tint.bg, alignItems: 'center', justifyContent: 'center'}}>
        <MaterialCommunityIcons name={product.icon} size={72} color={tint.fg} />
      </View>

      <View style={{marginTop: 14, flexDirection: 'row', alignItems: 'center', gap: 6}}>
        <MaterialCommunityIcons name="star" size={15} color={colors.accent} />
        <AppText style={{fontSize: 12.5, color: colors.textSecondary}}>
          {product.rating} · {product.reviews.toLocaleString()} reviews
        </AppText>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8}}>
        <AppText weight="600" style={{fontSize: 22, color: colors.textPrimary}}>{money(product.price)}</AppText>
        {product.oldPrice ? (
          <AppText style={{fontSize: 14, color: colors.textSecondary, textDecorationLine: 'line-through'}}>{money(product.oldPrice)}</AppText>
        ) : null}
      </View>

      <AppText tone="secondary" style={{fontSize: 13, lineHeight: 19, marginTop: 10}}>{product.blurb}</AppText>

      <View style={{height: 18}} />
      <Button title="Add to cart" onPress={addToCart} />
      <View style={{height: 10}} />
      <Button title="Ask about this product" variant="secondary" onPress={askAboutProduct} />
      <AppText tone="secondary" style={{fontSize: 11, textAlign: 'center', marginTop: 9}}>Opens a chat scoped to this item</AppText>

      <View style={{height: 12}} />
      <Button title="View cart" variant="ghost" onPress={() => nav.navigate('StoreCart')} />
    </ScreenScaffold>
  );
};

export default StoreProductScreen;
