import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';
// `Resource` is defined in the knowledge-base module but not re-exported from the
// package root; deep-import its published type declaration from lib/.
import type {Resource} from '@react-native-zohosalesiq/mobilisten/lib/components/knowledgebase/types/Resource';

import type {RootStackParamList} from '../navigation';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import Button from '../components/ui/Button';
import StateView from '../components/ui/StateView';

export interface ResourceListParams {
  title: string;
  /** Filter resources to a category (parentCategoryId). */
  parentCategoryId?: string;
  /** Filter resources to a resource department. */
  departmentId?: string;
  /** Optional search key applied to getResources. */
  searchKey?: string;
}

type ResourceListRoute = RouteProp<RootStackParamList, 'ResourceList'>;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'ResourceList'>;

const {Resource: ResourceKind} = ZohoSalesIQ;
const PAGE_LIMIT = 20;

/**
 * Category / department drill-in (from KB › Categories / Departments). Lists
 * paged getResources filtered by the passed category/department; rows tap through
 * to Resource detail.
 */
const ResourceListScreen = () => {
  const {params} = useRoute<ResourceListRoute>();
  const navigation = useNavigation<NavProp>();
  const [resources, setResources] = useState<Resource[]>([]);
  const [page, setPage] = useState(1);
  const [moreAvailable, setMoreAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(
    (targetPage: number) => {
      setLoading(true);
      if (targetPage === 1) setError(null);
      // Fetch a page of articles, filtered by department/category/search key
      // (legacy callback form).
      ZohoSalesIQ.KnowledgeBase.getResources(
        ResourceKind.ARTICLES,
        params.departmentId ?? null,
        params.parentCategoryId ?? null,
        targetPage,
        PAGE_LIMIT,
        params.searchKey ?? null,
        (err, list, moreDataAvailable) => {
          setLoading(false);
          if (err?.message) {
            if (targetPage === 1)
              setError(err.message ?? 'Could not load articles');
            return;
          }
          setResources(current =>
            targetPage === 1 ? list : [...current, ...list],
          );
          setMoreAvailable(Boolean(moreDataAvailable));
          setPage(targetPage);
        },
      );
    },
    [params.departmentId, params.parentCategoryId, params.searchKey],
  );

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const subtitle = loading
    ? 'Loading…'
    : `${resources.length} article${resources.length === 1 ? '' : 's'}`;

  return (
    <ScreenScaffold
      title={params.title}
      subtitle={subtitle}
      backLabel="Knowledge base">
      <Card>
        <StateView
          loading={loading && resources.length === 0}
          error={error}
          empty={resources.length === 0}
          onRetry={() => fetchPage(1)}
          skeletonRows={5}
          emptyIcon="article"
          emptyTitle="No articles found"
          emptySubtitle="Try another category or search key">
          {resources.map((resource, index) => (
            <ListRow
              key={resource.id ?? `${index}`}
              title={resource.title ?? 'Untitled article'}
              subtitle={resource.category?.name}
              icon="article"
              tint="accent"
              chevron
              onPress={() =>
                navigation.navigate('ResourceDetail', {
                  id: resource.id ?? '',
                  title: resource.title,
                  category: resource.category?.name,
                })
              }
            />
          ))}
        </StateView>
      </Card>
      {moreAvailable ? (
        <Button
          title="Load more"
          variant="secondary"
          loading={loading}
          onPress={() => fetchPage(page + 1)}
        />
      ) : null}
    </ScreenScaffold>
  );
};

export default ResourceListScreen;
