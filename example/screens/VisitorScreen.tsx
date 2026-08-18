import React, {useState} from 'react';
import {View, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ZohoSalesIQ, SIQSalutation} from '@react-native-zohosalesiq/mobilisten';
import type {SalesIQVisitorProfile} from '@react-native-zohosalesiq/mobilisten';

import {AppIcons} from '../components/ui/icons';
import useTheme from '../theme/useTheme';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import Field from '../components/ui/Field';
import Button from '../components/ui/Button';
import ResultBlock from '../components/ui/ResultBlock';
import {showToast} from '../components/ui/Toast';

const SALUTATIONS: readonly SIQSalutation[] = [
  SIQSalutation.Mr,
  SIQSalutation.Ms,
  SIQSalutation.Mrs,
  SIQSalutation.Dr,
  SIQSalutation.Prof,
  SIQSalutation.None,
];

const salutationLabel = (value: SIQSalutation) =>
  value === SIQSalutation.None
    ? 'None'
    : value.charAt(0).toUpperCase() + value.slice(1);

interface CustomInfoEntry {
  key: string;
  value: string;
}

/** Screen 04 — full profile via Visitor.updateProfile; no deprecated setName/setEmail/etc. */
const VisitorScreen = () => {
  const {colors} = useTheme();
  const [salutation, setSalutation] = useState<SIQSalutation>(SIQSalutation.Mr);
  const [firstName, setFirstName] = useState('Jordan');
  const [lastName, setLastName] = useState('Rivera');
  const [email, setEmail] = useState('jordan@acme.com');
  const [phoneCode, setPhoneCode] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState('');
  const [customInfo, setCustomInfo] = useState<CustomInfoEntry[]>([
    {key: 'plan', value: 'Enterprise'},
  ]);
  const [customActionName, setCustomActionName] = useState('');
  const [result, setResult] = useState<unknown>(null);

  const cycleSalutation = () => {
    const index = SALUTATIONS.indexOf(salutation);
    setSalutation(SALUTATIONS[(index + 1) % SALUTATIONS.length]);
  };

  const addCustomInfoRow = () => {
    setCustomInfo(rows => [...rows, {key: '', value: ''}]);
  };

  const removeCustomInfoRow = (index: number) => {
    setCustomInfo(rows => rows.filter((_, i) => i !== index));
  };

  const updateProfile = () => {
    const info = customInfo.reduce<Record<string, string>>((acc, row) => {
      if (row.key.trim()) {
        acc[row.key.trim()] = row.value;
      }
      return acc;
    }, {});

    const profile: SalesIQVisitorProfile = {
      salutation,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      emailID: email || undefined,
      userID: userId || undefined,
      // Country dialing code (e.g. "+1") and number are sent as separate fields.
      phone:
        phone || phoneCode
          ? {code: phoneCode || undefined, number: phone || undefined}
          : undefined,
      customInfo: Object.keys(info).length ? info : undefined,
    };

    // Set the visitor's profile details (name, email, phone, custom info).
    ZohoSalesIQ.Visitor.updateProfile(profile)
      .then(() => {
        setResult(profile);
        showToast('Profile updated', 'success');
      })
      .catch(() => showToast('Could not update profile', 'danger'));
  };

  const registerVisitor = () => {
    if (!userId.trim()) {
      showToast('Add a user ID first', 'danger');
      return;
    }
    // Identify this visitor to the SDK with a unique ID (a known/logged-in user).
    ZohoSalesIQ.registerVisitor(userId.trim(), (error, success) => {
      setResult(error?.message ? {error} : {success});
      showToast(
        error?.message ? 'Registration failed' : 'Visitor registered',
        error?.message ? 'danger' : 'success',
      );
    });
  };

  const performCustomAction = () => {
    if (!customActionName.trim()) {
      showToast('Enter a custom action name first', 'danger');
      return;
    }
    // Trigger a named custom action for this visitor.
    ZohoSalesIQ.Visitor.performCustomAction(customActionName.trim())
      .then(() =>
        showToast(`Custom action "${customActionName.trim()}" fired`, 'success'),
      )
      .catch(() => showToast('Could not fire custom action', 'danger'));
  };

  const unregisterVisitor = () => {
    // Clear the identified visitor (e.g. on logout), reverting to a guest.
    ZohoSalesIQ.unregisterVisitor(error => {
      setResult(error?.message ? {error} : {success: true});
      showToast(
        error?.message ? 'Unregister failed' : 'Visitor unregistered',
        error?.message ? 'danger' : 'success',
      );
    });
  };

  return (
    <ScreenScaffold
      title="Visitor"
      subtitle="Profile, custom info, and registration">
      <Section title="Profile">
        <Card>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Field
                label="First name"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={{flex: 1}}>
              <Field
                label="Last name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>
          <ListRow
            title="Salutation"
            value={salutationLabel(salutation)}
            chevron
            onPress={cycleSalutation}
          />
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Field
            label="Country code"
            value={phoneCode}
            onChangeText={setPhoneCode}
            placeholder="+1"
            keyboardType="phone-pad"
          />
          <Field
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="(555) 000-0000"
            keyboardType="phone-pad"
          />
          <Field
            label="User ID"
            value={userId}
            onChangeText={setUserId}
            placeholder="Unique visitor identifier"
            autoCapitalize="none"
          />
        </Card>
      </Section>

      <Section title="Custom info">
        <Card>
          {customInfo.map((row, index) => (
            <View
              key={index}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <Field
                  label={index === 0 ? 'Key' : `Key ${index + 1}`}
                  value={row.key}
                  onChangeText={text =>
                    setCustomInfo(rows =>
                      rows.map((r, i) => (i === index ? {...r, key: text} : r)),
                    )
                  }
                  placeholder="e.g. plan"
                  autoCapitalize="none"
                />
              </View>
              <View style={{flex: 1}}>
                <Field
                  label={index === 0 ? 'Value' : `Value ${index + 1}`}
                  value={row.value}
                  onChangeText={text =>
                    setCustomInfo(rows =>
                      rows.map((r, i) =>
                        i === index ? {...r, value: text} : r,
                      ),
                    )
                  }
                  placeholder="e.g. Enterprise"
                />
              </View>
              <Pressable
                onPress={() => removeCustomInfoRow(index)}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Remove field"
                style={{paddingLeft: 8, paddingTop: 6}}>
                <MaterialCommunityIcons
                  name={AppIcons.close}
                  size={20}
                  color={colors.danger}
                />
              </Pressable>
            </View>
          ))}
          <ListRow
            title="Add key / value"
            icon="plus"
            tint="primary"
            titleTone="brand"
            onPress={addCustomInfoRow}
          />
        </Card>
      </Section>

      <Button title="Update profile" onPress={updateProfile} />

      <Section title="Registration">
        <Card>
          <Field
            label="Visitor ID"
            value={userId}
            onChangeText={setUserId}
            placeholder="Unique registered-visitor id"
            autoCapitalize="none"
          />
          <Field
            label="Custom action name"
            value={customActionName}
            onChangeText={setCustomActionName}
            placeholder="e.g. open_offer"
            autoCapitalize="none"
          />
          <ListRow
            title="Fire custom action"
            titleTone="brand"
            chevron
            onPress={performCustomAction}
          />
        </Card>
      </Section>

      <View style={{flexDirection: 'row', gap: 10}}>
        <View style={{flex: 1}}>
          <Button
            title="Register visitor"
            variant="secondary"
            onPress={registerVisitor}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            title="Unregister"
            variant="secondary"
            onPress={unregisterVisitor}
          />
        </View>
      </View>

      {result !== null ? (
        <ResultBlock label="Last result" data={result} />
      ) : null}
    </ScreenScaffold>
  );
};

export default VisitorScreen;
