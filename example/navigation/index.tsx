import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';
// `SalesIQChat` is defined in the chat module but not re-exported from the package
// root; deep-import its published type declaration (see MEMORY: package only publishes
// its root type surface, so essential sub-types are imported from lib/).
import type {SalesIQChat} from '@react-native-zohosalesiq/mobilisten/lib/components/chat/types/SalesIQChat';

import HomeScreen from '../screens/HomeScreen';
import CoreScreen from '../screens/CoreScreen';
import LauncherScreen from '../screens/LauncherScreen';
import VisitorScreen from '../screens/VisitorScreen';
import ChatScreen from '../screens/ChatScreen';
import CallsScreen from '../screens/CallsScreen';
import KnowledgeBaseScreen from '../screens/KnowledgeBaseScreen';
import HomepageHelpCenterScreen from '../screens/HomepageHelpCenterScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import EventsScreen from '../screens/EventsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen';
import CallDetailScreen, {
  type CallDetailParams,
} from '../screens/CallDetailScreen';
import ResourceDetailScreen, {
  type ResourceDetailParams,
} from '../screens/ResourceDetailScreen';
import ResourceListScreen, {
  type ResourceListParams,
} from '../screens/ResourceListScreen';
import DepartmentPickerScreen, {
  type DepartmentPickerParams,
} from '../screens/DepartmentPickerScreen';
import EventDetailScreen, {
  type EventDetailParams,
} from '../screens/EventDetailScreen';
import OrdersScreen from '../screens/OrdersScreen';
import RefreshDataScreen from '../screens/RefreshDataScreen';
import UriSchemeScreen from '../screens/UriSchemeScreen';
import StoreScreen from '../store/StoreScreen';
import StoreProductScreen from '../store/StoreProductScreen';
import StoreCartScreen from '../store/StoreCartScreen';
import StoreOrderDetailScreen from '../store/StoreOrderDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  Store: undefined;
  StoreProduct: {productId: string};
  StoreCart: undefined;
  StoreOrderDetail: {orderId: string};
  Core: undefined;
  Launcher: undefined;
  Visitor: undefined;
  Chat: undefined;
  Calls: undefined;
  KnowledgeBase: undefined;
  HomepageHelpCenter: undefined;
  Notifications: undefined;
  Events: undefined;
  Settings: undefined;
  ChatDetail: {chat: SalesIQChat};
  CallDetail: CallDetailParams;
  ResourceDetail: ResourceDetailParams;
  ResourceList: ResourceListParams;
  DepartmentPicker: DepartmentPickerParams;
  EventDetail: EventDetailParams;
  Orders: undefined;
  RefreshData: undefined;
  UriScheme: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/** Human-readable page title per route — reported to SalesIQ to track the visitor's path. */
const PAGE_TITLES: Record<keyof RootStackParamList, string> = {
  Home: 'Home',
  Store: 'Zylker store',
  StoreProduct: 'Store product',
  StoreCart: 'Cart',
  StoreOrderDetail: 'Order detail',
  Core: 'Core & configuration',
  Launcher: 'Launcher',
  Visitor: 'Visitor',
  Chat: 'Chat',
  Calls: 'Calls',
  KnowledgeBase: 'Knowledge base',
  HomepageHelpCenter: 'Homepage & help center',
  Notifications: 'Notifications',
  Events: 'Events',
  Settings: 'Settings',
  ChatDetail: 'Chat detail',
  CallDetail: 'Call detail',
  ResourceDetail: 'Resource detail',
  ResourceList: 'Resources',
  DepartmentPicker: 'Department picker',
  EventDetail: 'Event detail',
  Orders: 'Orders',
  RefreshData: 'Refresh data',
  UriScheme: 'URI scheme',
};

/** Ref used to read the active route so we can report every page the visitor lands on. */
const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Reports the current page to SalesIQ via `Tracking.setPageTitle`, so the operator sees
 * the visitor's in-app navigation path (which screen they're on). Called on first ready
 * and on every navigation state change.
 */
const trackCurrentPage = () => {
  const name = navigationRef.getCurrentRoute()?.name as
    | keyof RootStackParamList
    | undefined;
  if (name) {
    ZohoSalesIQ.Tracking.setPageTitle(PAGE_TITLES[name] ?? name);
  }
};

/** Native-stack navigator, chrome-less — every screen renders its own ScreenScaffold header. */
const AppNavigator = () => (
  <NavigationContainer
    ref={navigationRef}
    onReady={trackCurrentPage}
    onStateChange={trackCurrentPage}>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Store" component={StoreScreen} />
      <Stack.Screen name="StoreProduct" component={StoreProductScreen} />
      <Stack.Screen name="StoreCart" component={StoreCartScreen} />
      <Stack.Screen name="StoreOrderDetail" component={StoreOrderDetailScreen} />
      <Stack.Screen name="Core" component={CoreScreen} />
      <Stack.Screen name="Launcher" component={LauncherScreen} />
      <Stack.Screen name="Visitor" component={VisitorScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Calls" component={CallsScreen} />
      <Stack.Screen name="KnowledgeBase" component={KnowledgeBaseScreen} />
      <Stack.Screen
        name="HomepageHelpCenter"
        component={HomepageHelpCenterScreen}
      />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      <Stack.Screen name="CallDetail" component={CallDetailScreen} />
      <Stack.Screen name="ResourceDetail" component={ResourceDetailScreen} />
      <Stack.Screen name="ResourceList" component={ResourceListScreen} />
      <Stack.Screen name="DepartmentPicker" component={DepartmentPickerScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="RefreshData" component={RefreshDataScreen} />
      <Stack.Screen name="UriScheme" component={UriSchemeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
