import React, {useState} from 'react';
import {Modal, Pressable, ScrollView, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type {
  SalesIQConversationAttributes,
  SalesIQDepartment,
} from '@react-native-zohosalesiq/mobilisten-core';

import useTheme from '../theme/useTheme';
import Field from './ui/Field';
import ListRow from './ui/ListRow';
import Button from './ui/Button';
import AppText from './ui/AppText';
import {departmentKey} from '../state/departments';

/** Editable draft backing one attribute set (global / start / trigger). */
export interface AttributesDraft {
  name: string;
  additionalInfo: string;
  displayPicture: string;
  /** Selected department keys (id, or name when id is absent). */
  departmentKeys: string[];
}

export const emptyAttributesDraft = (): AttributesDraft => ({
  name: '',
  additionalInfo: '',
  displayPicture: '',
  departmentKeys: [],
});

/**
 * Builds a `SalesIQConversationAttributes` from a draft + the full department list, including only the
 * fields the user actually filled in. Returns `null` when everything is empty (so callers can skip the SDK
 * call). Selected departments are resolved back to full `SalesIQDepartment` objects (which carry
 * `communicationMode`, required natively).
 */
export function buildAttributes(
  draft: AttributesDraft,
  allDepartments: SalesIQDepartment[],
): SalesIQConversationAttributes | null {
  const attributes: SalesIQConversationAttributes = {};
  if (draft.name.trim()) {
    attributes.name = draft.name.trim();
  }
  if (draft.additionalInfo.trim()) {
    attributes.additionalInfo = draft.additionalInfo.trim();
  }
  if (draft.displayPicture.trim()) {
    attributes.displayPicture = draft.displayPicture.trim();
  }
  const selected = allDepartments.filter(department =>
    draft.departmentKeys.includes(departmentKey(department)),
  );
  if (selected.length > 0) {
    attributes.departments = selected;
  }
  return Object.keys(attributes).length > 0 ? attributes : null;
}

interface Props {
  draft: AttributesDraft;
  onChange: (draft: AttributesDraft) => void;
  departments: SalesIQDepartment[];
}

/**
 * name / additionalInfo / displayPicture inputs + a **"Select department(s)"** chooser that opens a modal
 * checkbox list (Apply to commit, Cancel to discard). Pure: the parent owns the draft, so each attribute
 * set (global setAttributes, Chat.start, Chat.startWithTrigger) keeps its own values.
 */
const ConversationAttributesEditor = ({draft, onChange, departments}: Props) => {
  const {colors} = useTheme();
  const set = (patch: Partial<AttributesDraft>) => onChange({...draft, ...patch});

  const [pickerOpen, setPickerOpen] = useState(false);
  // Working copy while the modal is open, so "Cancel" discards and "Apply" commits.
  const [tempKeys, setTempKeys] = useState<string[]>([]);

  const openPicker = () => {
    setTempKeys(draft.departmentKeys);
    setPickerOpen(true);
  };
  const toggleTemp = (key: string) =>
    setTempKeys(current =>
      current.includes(key)
        ? current.filter(k => k !== key)
        : [...current, key],
    );
  const applyPicker = () => {
    set({departmentKeys: tempKeys});
    setPickerOpen(false);
  };

  const selectedNames = departments
    .filter(department => draft.departmentKeys.includes(departmentKey(department)))
    .map(department => department.name ?? department.id ?? '');
  const summary =
    selectedNames.length === 0
      ? 'None'
      : selectedNames.length <= 2
      ? selectedNames.join(', ')
      : `${selectedNames.length} selected`;

  return (
    <View>
      <Field
        label="Name"
        value={draft.name}
        onChangeText={text => set({name: text})}
        placeholder="Conversation display name"
      />
      <Field
        label="Additional info"
        value={draft.additionalInfo}
        onChangeText={text => set({additionalInfo: text})}
        placeholder="Any extra info to display"
        multiline
      />
      <Field
        label="Display picture (URL)"
        value={draft.displayPicture}
        onChangeText={text => set({displayPicture: text})}
        placeholder="https://…"
        autoCapitalize="none"
        keyboardType="url"
      />
      <ListRow
        title="Select department(s)"
        subtitle="Route the conversation"
        value={summary}
        chevron
        onPress={openPicker}
      />

      <Modal
        visible={pickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerOpen(false)}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.45)',
            justifyContent: 'flex-end',
          }}
          onPress={() => setPickerOpen(false)}>
          {/* Stop taps inside the sheet from dismissing it. */}
          <Pressable
            onPress={() => {}}
            style={{
              backgroundColor: colors.page,
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              paddingHorizontal: 18,
              paddingTop: 16,
              paddingBottom: 24,
              maxHeight: '75%',
            }}>
            <AppText variant="subhead" weight="600" style={{marginBottom: 4}}>
              Select department(s)
            </AppText>
            <AppText
              variant="caption"
              tone="secondary"
              style={{marginBottom: 10}}>
              {departments.length > 0
                ? 'Tick departments to route this conversation, then Apply.'
                : 'No departments loaded yet (fetched after init).'}
            </AppText>

            <ScrollView style={{flexGrow: 0}}>
              {departments.map(department => {
                const key = departmentKey(department);
                const checked = tempKeys.includes(key);
                return (
                  <ListRow
                    key={key}
                    title={department.name ?? department.id ?? key}
                    subtitle={`${department.communicationMode}${
                      department.available ? ' · online' : ' · offline'
                    }`}
                    trailing={
                      <MaterialCommunityIcons
                        name={
                          checked ? 'checkbox-marked' : 'checkbox-blank-outline'
                        }
                        size={22}
                        color={checked ? colors.primary : colors.textTertiary}
                      />
                    }
                    onPress={() => toggleTemp(key)}
                  />
                );
              })}
            </ScrollView>

            <View style={{flexDirection: 'row', gap: 10, marginTop: 14}}>
              <View style={{flex: 1}}>
                <Button
                  title="Cancel"
                  variant="ghost"
                  onPress={() => setPickerOpen(false)}
                />
              </View>
              <View style={{flex: 1}}>
                <Button title="Apply" onPress={applyPicker} />
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ConversationAttributesEditor;
