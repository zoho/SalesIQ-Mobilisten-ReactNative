import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useRoute, type RouteProp} from '@react-navigation/native';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';
// `Resource` is defined in the knowledge-base module but not re-exported from the
// package root; deep-import its published type declaration from lib/.
import type {Resource} from '@react-native-zohosalesiq/mobilisten/lib/components/knowledgebase/types/Resource';

import type {RootStackParamList} from '../navigation';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import AppText from '../components/ui/AppText';
import {showToast} from '../components/ui/Toast';

export interface ResourceDetailParams {
  id: string;
  title?: string;
  category?: string;
  /** Fetch the full resource in the default language if the current one is missing. */
  languageFallback?: boolean;
}

type ResourceDetailRoute = RouteProp<RootStackParamList, 'ResourceDetail'>;

const {Resource: ResourceKind} = ZohoSalesIQ;

/**
 * Resource detail (from KB › Resources). Loads the full resource via
 * getSingleResource (+ optional language fallback); "Open in SDK viewer" = KnowledgeBase.open.
 */
const ResourceDetailScreen = () => {
  const {params} = useRoute<ResourceDetailRoute>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handle = (result: Resource) => {
      setLoading(false);
      setResource(result);
    };
    const fail = () => {
      setLoading(false);
      showToast('Could not load resource', 'danger');
    };
    if (params.languageFallback) {
      // Fetch one article by ID, falling back to the default language if needed.
      ZohoSalesIQ.KnowledgeBase.getSingleResource(
        ResourceKind.ARTICLES,
        params.id,
        true,
      )
        .then(handle)
        .catch(fail);
    } else {
      // Fetch one article by ID in the current language only (legacy callback form).
      ZohoSalesIQ.KnowledgeBase.getSingleResource(
        ResourceKind.ARTICLES,
        params.id,
        (error, result) => {
          if (error?.message) {
            fail();
          } else {
            handle(result);
          }
        },
      );
    }
  }, [params.id, params.languageFallback]);

  const openInViewer = () => {
    // Open this article by ID in the SDK's built-in article viewer.
    ZohoSalesIQ.KnowledgeBase.open(
      ResourceKind.ARTICLES,
      params.id,
      (error, success) => {
        showToast(
          error?.message ? 'Could not open article' : 'Opening article…',
          error?.message ? 'danger' : 'success',
        );
        void success;
      },
    );
  };

  const title = resource?.title ?? params.title ?? 'Article';
  const category = resource?.category?.name ?? params.category;
  const authorRaw = resource?.modifier?.name ?? resource?.creator?.name;
  const author = authorRaw != null ? String(authorRaw) : undefined;
  const stats = resource?.stats;

  return (
    <ScreenScaffold
      title="Article"
      subtitle={title}
      backLabel="Knowledge base">
      <Section title="Overview">
        <Card>
          <ListRow
            title={title}
            icon="article"
            tint="accent"
            trailing={
              category ? <Badge label={category} tone="success" /> : undefined
            }
          />
          {author ? (
            <ListRow
              title={author}
              subtitle={
                resource?.modifiedTime
                  ? `Updated ${new Date(
                      resource.modifiedTime,
                    ).toLocaleDateString()}`
                  : 'Author'
              }
              icon="visitor"
              tint="secondary"
            />
          ) : null}
          {stats ? (
            <ListRow
              title="Stats"
              value={`${stats.liked ?? 0} liked · ${stats.viewed ?? 0} viewed`}
            />
          ) : null}
        </Card>
      </Section>

      <Section title="Content">
        <Card separated={false}>
          <View style={{paddingHorizontal: 14, paddingVertical: 13}}>
            <AppText
              variant="subhead"
              tone="secondary"
              style={{lineHeight: 20}}>
              {loading
                ? 'Loading article…'
                : resource?.content ??
                  'This article has no inline content — open it in the SDK viewer to read the full text.'}
            </AppText>
          </View>
        </Card>
      </Section>

      <Button
        title="Open in SDK viewer"
        icon="book"
        onPress={openInViewer}
      />
    </ScreenScaffold>
  );
};

export default ResourceDetailScreen;
