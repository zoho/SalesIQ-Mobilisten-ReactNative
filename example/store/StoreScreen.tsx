import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';
import {ZohoSalesIQCalls} from '@react-native-zohosalesiq/mobilisten-calls';
import type {SalesIQVisitorProfile} from '@react-native-zohosalesiq/mobilisten';

import useTheme from '../theme/useTheme';
import type {RootStackParamList} from '../navigation';
import AppText from '../components/ui/AppText';
import Button from '../components/ui/Button';
import Field from '../components/ui/Field';
import SwitchRow from '../components/ui/SwitchRow';
import {showToast} from '../components/ui/Toast';
import {PRODUCTS, ORDERS, cartStore, productById, useCart, type Product} from './catalog';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Store'>;
type TabKey = 'shop' | 'orders' | 'help' | 'account';

export const money = (n: number) => `$${n}`;

/** Fires an SDK call, toasting failure; safe to call before the SDK is live.
 *  Handles both sync calls and Promise-returning ones (only toasts success once the
 *  promise resolves, so async failures aren't reported as success). */
export const runSdk = (label: string, fn: () => unknown) => {
  const ok = () => {
    if (label) showToast(label, 'success');
  };
  const fail = () => showToast('Add keys in Settings to run live');
  try {
    const result = fn();
    if (result != null && typeof (result as {then?: unknown}).then === 'function') {
      (result as Promise<unknown>).then(ok, fail);
    } else {
      ok();
    }
  } catch {
    fail();
  }
};

/** Opens a fresh support conversation (used by the launcher FAB + Help). */
const openSupportChat = (question: string) =>
  // Start a new chat with the given opening question.
  runSdk('Opening chat…', () => ZohoSalesIQ.Chat.start(question));

export const tintFor = (colors: ReturnType<typeof useTheme>['colors'], t: Product['tint']) =>
  t === 'secondary'
    ? {bg: colors.tintSecondary, fg: colors.secondary}
    : t === 'accent'
    ? {bg: colors.tintAccent, fg: colors.accent}
    : {bg: colors.tintPrimary, fg: colors.primary};

/** Zylker demo store — a self-contained shopping app that shows SalesIQ woven
 *  into real retail moments. Additive: its own route; no catalog screen changes. */
const StoreScreen = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<Nav>();
  const cart = useCart();
  const [tab, setTab] = useState<TabKey>('shop');

  useEffect(() => {
    // A retailer keeps the chat launcher visible everywhere in the store.
    // Show the floating chat launcher and keep it always visible.
    runSdk('', () => ZohoSalesIQ.Launcher.show(ZohoSalesIQ.Launcher.VisibilityMode.ALWAYS));
    // Page title is reported centrally on navigation (see navigation/index.tsx),
    // which tracks the visitor's path across every screen.
  }, []);

  const tabs: {key: TabKey; label: string; icon: string}[] = [
    {key: 'shop', label: 'Shop', icon: 'storefront-outline'},
    {key: 'orders', label: 'Orders', icon: 'package-variant-closed'},
    {key: 'help', label: 'Help', icon: 'lifebuoy'},
    {key: 'account', label: 'Account', icon: 'account-outline'},
  ];

  return (
    <View style={{flex: 1, backgroundColor: colors.page}}>
      <View style={{paddingTop: insets.top + 10, paddingHorizontal: 16, paddingBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <AppText weight="600" style={{fontSize: 20, color: colors.textPrimary}}>Zylker</AppText>
        <Pressable onPress={() => nav.navigate('StoreCart')} hitSlop={8} accessibilityRole="button" accessibilityLabel="Cart">
          <View>
            <MaterialCommunityIcons name="cart-outline" size={23} color={colors.textPrimary} />
            {cart.count() > 0 ? (
              <View style={{position: 'absolute', top: -6, right: -8, minWidth: 16, height: 16, borderRadius: 8, paddingHorizontal: 3, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center'}}>
                <AppText style={{fontSize: 10, color: '#FFFFFF'}}>{cart.count()}</AppText>
              </View>
            ) : null}
          </View>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 150}} showsVerticalScrollIndicator={false}>
        {tab === 'shop' ? <ShopTab nav={nav} /> : null}
        {tab === 'orders' ? <OrdersTab nav={nav} /> : null}
        {tab === 'help' ? <HelpTab /> : null}
        {tab === 'account' ? <AccountTab /> : null}
      </ScrollView>

      <Pressable
        onPress={() => openSupportChat('Hi, I need help with Zylker')}
        accessibilityRole="button"
        accessibilityLabel="Chat with support"
        style={{position: 'absolute', right: 18, bottom: insets.bottom + 74, width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', elevation: 4}}>
        <MaterialCommunityIcons name="message-text-outline" size={24} color="#FFFFFF" />
      </Pressable>

      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8, paddingBottom: insets.bottom + 8}}>
        {tabs.map(t => {
          const active = t.key === tab;
          return (
            <Pressable key={t.key} onPress={() => setTab(t.key)} accessibilityRole="button" style={{flex: 1, alignItems: 'center', gap: 3}}>
              <MaterialCommunityIcons name={t.icon} size={22} color={active ? colors.primary : colors.textSecondary} />
              <AppText style={{fontSize: 10.5, color: active ? colors.primary : colors.textSecondary}}>{t.label}</AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

// ── Shop tab ──────────────────────────────────────────────────────────────────
const ShopTab = ({nav}: {nav: Nav}) => {
  const {colors} = useTheme();
  return (
    <View>
      <View style={{marginTop: 4, marginBottom: 14, height: 40, borderRadius: 11, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 8}}>
        <MaterialCommunityIcons name="magnify" size={18} color={colors.textSecondary} />
        <AppText style={{fontSize: 13, color: colors.textSecondary}}>Search products</AppText>
      </View>
      <View style={{backgroundColor: colors.tintPrimary, borderRadius: 14, padding: 15, marginBottom: 16}}>
        <AppText weight="600" style={{fontSize: 14, color: colors.primary}}>Summer sale · up to 20% off</AppText>
        <AppText style={{fontSize: 12, color: colors.primary, marginTop: 2, opacity: 0.85}}>Free delivery over $50</AppText>
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
        {PRODUCTS.map(p => {
          const tint = tintFor(colors, p.tint);
          return (
            <Pressable key={p.id} onPress={() => nav.navigate('StoreProduct', {productId: p.id})} style={{width: '48.5%', marginBottom: 12, backgroundColor: colors.card, borderRadius: 13, borderWidth: 1, borderColor: colors.border, padding: 10}}>
              <View style={{height: 78, borderRadius: 10, backgroundColor: tint.bg, alignItems: 'center', justifyContent: 'center'}}>
                <MaterialCommunityIcons name={p.icon} size={34} color={tint.fg} />
              </View>
              <AppText style={{fontSize: 12.5, color: colors.textPrimary, marginTop: 8}}>{p.name}</AppText>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3}}>
                <AppText weight="600" style={{fontSize: 13.5, color: colors.textPrimary}}>{money(p.price)}</AppText>
                {p.oldPrice ? <AppText style={{fontSize: 11, color: colors.textSecondary, textDecorationLine: 'line-through'}}>{money(p.oldPrice)}</AppText> : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

// ── Orders tab ────────────────────────────────────────────────────────────────
const OrdersTab = ({nav}: {nav: Nav}) => {
  const {colors} = useTheme();
  return (
    <View style={{marginTop: 4}}>
      <AppText weight="600" style={{fontSize: 16, color: colors.textPrimary, marginBottom: 12}}>Your orders</AppText>
      {ORDERS.map(o => {
        const p = productById(o.productId)!;
        const tint = tintFor(colors, p.tint);
        const delivered = o.status === 'Delivered';
        return (
          <Pressable key={o.id} onPress={() => nav.navigate('StoreOrderDetail', {orderId: o.id})} style={{backgroundColor: colors.card, borderRadius: 13, borderWidth: 1, borderColor: colors.border, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 12}}>
            <View style={{width: 46, height: 46, borderRadius: 10, backgroundColor: tint.bg, alignItems: 'center', justifyContent: 'center'}}>
              <MaterialCommunityIcons name={p.icon} size={24} color={tint.fg} />
            </View>
            <View style={{flex: 1}}>
              <AppText style={{fontSize: 13, color: colors.textPrimary}}>{p.name}</AppText>
              <AppText style={{fontSize: 12, color: colors.textSecondary, marginTop: 2}}>#{o.id} · {o.placed}</AppText>
            </View>
            <View style={{backgroundColor: delivered ? colors.tintSecondary : colors.tintPrimary, borderRadius: 8, paddingHorizontal: 9, paddingVertical: 3}}>
              <AppText weight="600" style={{fontSize: 11, color: delivered ? colors.secondary : colors.primary}}>{o.status}</AppText>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

// ── Help tab ──────────────────────────────────────────────────────────────────
const HELP_TOPICS = [
  {icon: 'package-variant', title: 'Track or change my delivery'},
  {icon: 'backup-restore', title: 'Returns and refunds'},
  {icon: 'credit-card-outline', title: 'Payment and billing'},
];

const HelpTab = () => {
  const {colors} = useTheme();
  useEffect(() => {
    // Pre-warm the knowledge base the way a help center would.
    try {
      // Fetch the first page of knowledge base articles (extended Promise
      // overload; child-category resources not needed for the pre-warm).
      ZohoSalesIQ.KnowledgeBase.getResources(
        ZohoSalesIQ.Resource.ARTICLES,
        null, null, 1, 10, null, false,
      ).catch(() => {
        /* SDK not live — the static topics below still render */
      });
    } catch {
      /* SDK not live — the static topics below still render */
    }
  }, []);

  const requestCallback = () =>
    // Start an outgoing call to an operator (no department, mic enabled).
    runSdk('Callback requested', () => ZohoSalesIQCalls.start(null, true, null));

  return (
    <View style={{marginTop: 4}}>
      <AppText weight="600" style={{fontSize: 19, color: colors.textPrimary}}>How can we help?</AppText>
      <View style={{marginTop: 12, marginBottom: 14, height: 38, borderRadius: 10, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 11, gap: 7}}>
        <MaterialCommunityIcons name="magnify" size={17} color={colors.textSecondary} />
        <AppText style={{fontSize: 12.5, color: colors.textSecondary}}>Search help articles</AppText>
      </View>
      <AppText style={{fontSize: 11, color: colors.textSecondary, marginBottom: 6}}>Popular topics</AppText>
      <View style={{backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border, overflow: 'hidden'}}>
        {HELP_TOPICS.map((t, i) => (
          <Pressable key={t.title} onPress={() => openSupportChat(`I need help: ${t.title}`)} style={{flexDirection: 'row', alignItems: 'center', gap: 11, padding: 12, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.borderSubtle}}>
            <MaterialCommunityIcons name={t.icon} size={18} color={colors.accent} />
            <AppText style={{flex: 1, fontSize: 12.5, color: colors.textPrimary}}>{t.title}</AppText>
            <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textSecondary} />
          </Pressable>
        ))}
      </View>
      <View style={{backgroundColor: colors.tintPrimary, borderRadius: 12, padding: 14, marginTop: 16}}>
        <AppText weight="600" style={{fontSize: 13, color: colors.primary}}>Still need help?</AppText>
        <AppText style={{fontSize: 12, color: colors.primary, opacity: 0.85, marginTop: 2, marginBottom: 12}}>Our team replies in a few minutes.</AppText>
        <Button title="Start live chat" onPress={() => openSupportChat('Hi, I have a question')} />
        <View style={{height: 10}} />
        <Button title="Request a callback" variant="secondary" onPress={requestCallback} />
      </View>
    </View>
  );
};

// ── Account tab ───────────────────────────────────────────────────────────────
const AccountTab = () => {
  const {colors} = useTheme();
  const [name, setName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@example.com');
  const [inApp, setInApp] = useState(true);

  const signIn = () => {
    const [first, ...rest] = name.trim().split(' ');
    const profile: SalesIQVisitorProfile = {
      firstName: first || undefined,
      lastName: rest.join(' ') || undefined,
      emailID: email.trim() || undefined,
      customInfo: {tier: 'Gold', lifetimeOrders: '14'},
    };
    // Set the visitor's profile (name, email, custom info) on the SDK.
    runSdk('Signed in', () => ZohoSalesIQ.Visitor.updateProfile(profile));
  };

  return (
    <View style={{marginTop: 4}}>
      <View style={{alignItems: 'center', marginBottom: 18}}>
        <View style={{width: 64, height: 64, borderRadius: 32, backgroundColor: colors.tintPrimary, alignItems: 'center', justifyContent: 'center'}}>
          <MaterialCommunityIcons name="account" size={34} color={colors.primary} />
        </View>
        <AppText weight="600" style={{fontSize: 16, color: colors.textPrimary, marginTop: 10}}>{name || 'Guest'}</AppText>
      </View>
      <View style={{backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 14}}>
        <Field label="Name" value={name} onChangeText={setName} />
        <Field label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      </View>
      <View style={{height: 12}} />
      <Button title="Sign in" onPress={signIn} />
      <View style={{marginTop: 16, backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border}}>
        <SwitchRow
          title="Order notifications"
          subtitle="Shipping and delivery alerts"
          value={inApp}
          onValueChange={v => {
            setInApp(v);
            // Turn in-app foreground chat/notification banners on or off.
            runSdk(v ? 'Notifications on' : 'Notifications off', () =>
              ZohoSalesIQ.Notification.enableInAppNotification(v),
            );
          }}
        />
      </View>
    </View>
  );
};

export default StoreScreen;
