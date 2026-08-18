import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '../../theme/useTheme';
import AppText from './AppText';
import Button from './Button';
import {AppIcons, type AppIconName} from './icons';

interface StateViewProps {
  /** Fetch in flight — shows shimmering skeleton rows. Wins over every other state. */
  loading?: boolean;
  /** Non-null message — shows the error block with a Retry button (if onRetry given). */
  error?: string | null;
  /** No data after a successful load — shows the empty block. */
  empty?: boolean;
  onRetry?: () => void;
  /** Skeleton row count while loading. */
  skeletonRows?: number;
  emptyIcon?: AppIconName;
  emptyTitle?: string;
  emptySubtitle?: string;
  children?: React.ReactNode;
}

/** One skeleton placeholder row: pulsing icon box + two text bars. */
const SkeletonRow = ({first, pulse}: {first: boolean; pulse: Animated.Value}) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 13,
        paddingHorizontal: 14,
        borderTopWidth: first ? 0 : 1,
        borderTopColor: colors.borderSubtle,
      }}>
      <Animated.View
        style={{width: 34, height: 34, borderRadius: 10, backgroundColor: colors.cardAlt, opacity: pulse}}
      />
      <View style={{flex: 1, gap: 7}}>
        <Animated.View
          style={{height: 11, width: '52%', borderRadius: 6, backgroundColor: colors.cardAlt, opacity: pulse}}
        />
        <Animated.View
          style={{height: 9, width: '78%', borderRadius: 6, backgroundColor: colors.cardAlt, opacity: pulse}}
        />
      </View>
    </View>
  );
};

/** Centered icon + title + subtitle used for the empty and error blocks. */
const CenteredBlock = ({
  icon,
  tint,
  title,
  subtitle,
  action,
}: {
  icon: AppIconName;
  tint: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) => {
  const {colors} = useTheme();
  return (
    <View style={{alignItems: 'center', paddingVertical: 30, paddingHorizontal: 20, gap: 4}}>
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tint,
          marginBottom: 6,
        }}>
        <MaterialCommunityIcons name={AppIcons[icon]} size={22} color={colors.textSecondary} />
      </View>
      <AppText weight="600" style={{fontSize: 14, textAlign: 'center'}}>
        {title}
      </AppText>
      {subtitle ? (
        <AppText variant="caption" tone="secondary" style={{textAlign: 'center', lineHeight: 17}}>
          {subtitle}
        </AppText>
      ) : null}
      {action ? <View style={{marginTop: 12, alignSelf: 'stretch'}}>{action}</View> : null}
    </View>
  );
};

/**
 * Standardized async surface — drop inside a `Card` in place of a hand-rolled
 * `loading ? … : empty ? … : list` ternary. Precedence: loading → error → empty
 * → children.
 */
const StateView = ({
  loading,
  error,
  empty,
  onRetry,
  skeletonRows = 3,
  emptyIcon = 'search',
  emptyTitle = 'Nothing here yet',
  emptySubtitle,
  children,
}: StateViewProps) => {
  const {colors} = useTheme();
  const pulse = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    if (!loading) return;
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {toValue: 1, duration: 700, useNativeDriver: true}),
        Animated.timing(pulse, {toValue: 0.45, duration: 700, useNativeDriver: true}),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [loading, pulse]);

  if (loading) {
    return (
      <View accessibilityRole="progressbar" accessibilityLabel="Loading">
        {Array.from({length: skeletonRows}).map((_, i) => (
          <SkeletonRow key={i} first={i === 0} pulse={pulse} />
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <CenteredBlock
        icon="alert"
        tint={colors.tintDanger}
        title="Couldn’t load"
        subtitle={error}
        action={onRetry ? <Button title="Retry" variant="secondary" onPress={onRetry} /> : undefined}
      />
    );
  }

  if (empty) {
    return (
      <CenteredBlock
        icon={emptyIcon}
        tint={colors.cardAlt}
        title={emptyTitle}
        subtitle={emptySubtitle}
        action={onRetry ? <Button title="Refresh" variant="ghost" onPress={onRetry} /> : undefined}
      />
    );
  }

  return <>{children}</>;
};

export default StateView;
