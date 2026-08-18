import React, {type ReactNode} from 'react';
import {View} from 'react-native';
import AppText from './AppText';

interface SectionProps {
  /** Uppercase 11/600 letter-spaced section label. Omit for label-less groups. */
  title?: string;
  children: ReactNode;
  /** Optional caption rendered under the section content (12 secondary). */
  footer?: string;
}

/** Section: header label + 9pt gap to content, 6pt horizontal label inset. */
const Section = ({title, children, footer}: SectionProps) => (
  <View style={{gap: 9}}>
    {title ? (
      <AppText
        variant="sectionLabel"
        tone="tertiary"
        style={{paddingHorizontal: 6}}>
        {title}
      </AppText>
    ) : null}
    {children}
    {footer ? (
      <AppText
        variant="caption"
        tone="secondary"
        style={{paddingHorizontal: 6}}>
        {footer}
      </AppText>
    ) : null}
  </View>
);

export default Section;
