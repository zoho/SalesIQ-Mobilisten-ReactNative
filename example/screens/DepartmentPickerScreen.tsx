import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';
import type {SalesIQDepartment} from '@react-native-zohosalesiq/mobilisten-core';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '../theme/useTheme';
import type {RootStackParamList} from '../navigation';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import StateView from '../components/ui/StateView';
import {AppIcons} from '../components/ui/icons';
import {showToast} from '../components/ui/Toast';
import {setSelectedDepartment} from '../state/selection';

export interface DepartmentPickerParams {
  /** Label shown next to the back chevron (the screen that opened the picker). */
  backLabel?: string;
  /** The currently selected department name, marked with a check. */
  selected?: string;
}

type NavProp = NativeStackNavigationProp<RootStackParamList, 'DepartmentPicker'>;
type PickerRoute = RouteProp<RootStackParamList, 'DepartmentPicker'>;

/**
 * Department picker (from getDepartments) — tap records the selection, no drill-in.
 * Uses `Conversation.getDepartments()` (current API) with the raw departments callback
 * as a fallback source of names.
 */
const DepartmentPickerScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<NavProp>();
  const {params} = useRoute<PickerRoute>();
  const [departments, setDepartments] = useState<SalesIQDepartment[]>([]);
  const [selected, setSelected] = useState(params?.selected ?? 'Support');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    // Fetch the list of support departments configured in your portal.
    ZohoSalesIQ.Conversation.getDepartments()
      .then(list => setDepartments(list))
      .catch(e => setError(e?.message ?? 'Failed to load departments'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const choose = (name: string) => {
    setSelected(name);
    // Record the chosen department; new chats are routed to it via the
    // `departmentName` argument of ZohoSalesIQ.Chat.start(...).
    setSelectedDepartment(name);
    showToast(`Routing new chats to ${name}`, 'success');
    navigation.goBack();
  };

  return (
    <ScreenScaffold
      title="Department"
      subtitle="Route new chats to…"
      backLabel={params?.backLabel ?? 'Core'}>
      <Card>
        <StateView
          loading={loading}
          error={error}
          empty={departments.length === 0}
          onRetry={load}
          skeletonRows={4}
          emptyIcon="department"
          emptyTitle="No departments"
          emptySubtitle="Sign in with real keys to list departments">
          {departments.map((department, index) => {
            const name = department.name ?? department.id ?? `Dept ${index + 1}`;
            const online = department.available ?? false;
            return (
              <ListRow
                key={department.id ?? name}
                title={name}
                subtitle={online ? 'Online' : 'Offline'}
                trailing={
                  name === selected ? (
                    <MaterialCommunityIcons
                      name={AppIcons.check}
                      size={18}
                      color={colors.primary}
                    />
                  ) : undefined
                }
                onPress={() => choose(name)}
              />
            );
          })}
        </StateView>
      </Card>
    </ScreenScaffold>
  );
};

export default DepartmentPickerScreen;
