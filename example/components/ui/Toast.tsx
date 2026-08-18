import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../theme/useTheme';
import {radius} from '../../theme/tokens';
import AppText from './AppText';
import {AppIcons, type AppIconName} from './icons';

export type ToastTone = 'default' | 'success' | 'danger';

interface ToastMessage {
  id: number;
  text: string;
  tone: ToastTone;
}

type Listener = (message: ToastMessage) => void;
let listener: Listener | null = null;
let nextId = 1;

/** Fire a bottom toast from anywhere — screens call this after an SDK action resolves. */
export const showToast = (text: string, tone: ToastTone = 'default') => {
  listener?.({id: nextId++, text, tone});
};

const DURATION_MS = 2500;

const toneIcon: Record<ToastTone, AppIconName> = {
  default: 'info',
  success: 'check',
  danger: 'alert',
};

/** Mount once near the app root. Renders queued toasts bottom-anchored, auto-dismissed. */
const ToastHost = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState<ToastMessage | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    listener = next => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
      setMessage(next);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
      hideTimer.current = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }).start(() => setMessage(null));
      }, DURATION_MS);
    };
    return () => {
      listener = null;
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, [opacity]);

  if (!message) {
    return null;
  }

  const fg =
    message.tone === 'success'
      ? colors.secondary
      : message.tone === 'danger'
      ? colors.danger
      : colors.textPrimary;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View
        accessibilityLiveRegion="polite"
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: insets.bottom + 20,
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 0],
              }),
            },
          ],
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: radius.control,
            paddingVertical: 12,
            paddingHorizontal: 14,
            shadowColor: '#000',
            shadowOpacity: 0.16,
            shadowRadius: 12,
            shadowOffset: {width: 0, height: 6},
            elevation: 6,
          }}>
          <MaterialCommunityIcons
            name={AppIcons[toneIcon[message.tone]]}
            size={18}
            color={fg}
          />
          <AppText variant="body" style={{fontSize: 14, flex: 1}}>
            {message.text}
          </AppText>
        </View>
      </Animated.View>
    </View>
  );
};

export default ToastHost;
