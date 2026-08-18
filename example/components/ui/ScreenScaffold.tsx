import React, {type ReactNode} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  View,
  type ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../theme/useTheme';
import AppText from './AppText';
import {AppIcons} from './icons';
import {usePushStatus, pushHasIssue} from '../../state/pushStatus';

interface ScreenScaffoldProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Show the back affordance. Defaults to true for any screen but Home. */
  showBack?: boolean;
  /** Label shown next to the back chevron. Defaults to "Home". */
  backLabel?: string;
  /** Trailing header accessory (e.g. a settings icon button on Home). */
  headerRight?: ReactNode;
  contentContainerStyle?: ViewStyle;
}

/** Safe-area page → back affordance → large title 28/600 → subtitle → scrollable content. */
const ScreenScaffold = ({
  title,
  subtitle,
  children,
  showBack = true,
  backLabel = 'Home',
  headerRight,
  contentContainerStyle,
}: ScreenScaffoldProps) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  // Global push-health indicator: when notifications are off, show a warning bell on every screen's header
  // that jumps to the Notifications screen (where the in-detail banner + Open-Settings button live).
  const hasPushIssue = pushHasIssue(usePushStatus());

  return (
    <View style={{flex: 1, backgroundColor: colors.page}}>
      <StatusBar
        barStyle={colors.statusBarStyle}
        backgroundColor={colors.page}
      />
      <View
        style={{
          paddingTop: insets.top + 6,
          paddingHorizontal: 20,
          paddingBottom: 12,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            {showBack ? (
              <Pressable
                onPress={() => navigation.goBack()}
                accessibilityRole="button"
                accessibilityLabel={`Back to ${backLabel}`}
                hitSlop={8}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: colors.tintPrimary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                  alignSelf: 'flex-start',
                }}>
                <MaterialCommunityIcons
                  name={AppIcons.back}
                  size={20}
                  color={colors.primary}
                />
              </Pressable>
            ) : null}
            <AppText
              variant="largeTitle"
              style={{fontSize: 27}}
              accessibilityRole="header">
              {title}
            </AppText>
            {subtitle ? (
              <AppText
                variant="subhead"
                tone="secondary"
                style={{marginTop: 3}}>
                {subtitle}
              </AppText>
            ) : null}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            {hasPushIssue ? (
              <Pressable
                onPress={() => navigation.navigate('Notifications' as never)}
                accessibilityRole="button"
                accessibilityLabel="Notifications are turned off. Open the Notifications screen."
                hitSlop={8}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: colors.tintDanger,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* A slashed "notifications-off" bell in a danger tint — reads as "notifications are off / needs
                    attention", not as an unread count (which a red dot would imply). */}
                <MaterialCommunityIcons
                  name="bell-off-outline"
                  size={20}
                  color={colors.danger}
                />
              </Pressable>
            ) : null}
            {headerRight}
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={[
          {
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 28,
            gap: 16,
          },
          contentContainerStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default ScreenScaffold;

export type {ScreenScaffoldProps};
