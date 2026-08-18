import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '../theme/useTheme';
import {radius} from '../theme/tokens';
import type {RootStackParamList} from '../navigation';
import ScreenScaffold from '../components/ui/ScreenScaffold';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ListRow from '../components/ui/ListRow';
import SwitchRow from '../components/ui/SwitchRow';
import Field from '../components/ui/Field';
import Button from '../components/ui/Button';
import ResultBlock from '../components/ui/ResultBlock';
import {AppIcons} from '../components/ui/icons';
import {showToast} from '../components/ui/Toast';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'KnowledgeBase'>;

const {Resource} = ZohoSalesIQ;

interface RecentArticle {
  id: string;
  title: string;
  category: string;
}

const RECENTLY_VIEWED: readonly RecentArticle[] = [
  {id: 'a1', title: 'Getting started with live chat', category: 'Onboarding'},
  {id: 'a2', title: 'Setting up push notifications', category: 'Configuration'},
];

const RECENT_COUNT_OPTIONS = [3, 5, 10] as const;

/** Screen 07 — search, paged resources, single resource, departments, categorize, combine. */
const KnowledgeBaseScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<NavProp>();
  const [search, setSearch] = useState('');
  const [singleResourceId, setSingleResourceId] = useState('');
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(true);
  const [groupByCategory, setGroupByCategory] = useState(true);
  const [combineDepartments, setCombineDepartments] = useState(false);
  const [recentCount, setRecentCount] = useState<number>(5);
  const [result, setResult] = useState<unknown>(null);

  useEffect(() => {
    // Check whether the articles knowledge base is enabled.
    ZohoSalesIQ.KnowledgeBase.isEnabled(Resource.ARTICLES, enabled =>
      setShowKnowledgeBase(Boolean(enabled)),
    );
  }, []);

  const toggleVisibility = (value: boolean) => {
    setShowKnowledgeBase(value);
    // Show or hide the articles resource in the SDK UI.
    ZohoSalesIQ.KnowledgeBase.setVisibility(Resource.ARTICLES, value);
  };

  const toggleGrouping = (value: boolean) => {
    setGroupByCategory(value);
    // Group articles by category (vs. a flat list).
    ZohoSalesIQ.KnowledgeBase.categorize(Resource.ARTICLES, value);
  };

  const toggleCombine = (value: boolean) => {
    setCombineDepartments(value);
    // Merge articles from all departments into one combined list.
    ZohoSalesIQ.KnowledgeBase.combineDepartments(Resource.ARTICLES, value);
  };

  const cycleRecentCount = () => {
    const index = RECENT_COUNT_OPTIONS.indexOf(
      recentCount as (typeof RECENT_COUNT_OPTIONS)[number],
    );
    const next =
      RECENT_COUNT_OPTIONS[(index + 1) % RECENT_COUNT_OPTIONS.length];
    setRecentCount(next);
    // Set how many recently-viewed articles the SDK keeps/shows.
    ZohoSalesIQ.KnowledgeBase.setRecentlyViewedCount(next);
    showToast(`Recently-viewed count: ${next}`, 'success');
  };

  const openResources = () => {
    navigation.navigate('ResourceList', {
      title: 'Resources',
      searchKey: search.trim() || undefined,
    });
  };

  const submitSearch = () => {
    if (!search.trim()) {
      showToast('Type a search term first', 'default');
      return;
    }
    openResources();
  };

  const fetchCategories = () => {
    // Fetch the article categories (optionally under a parent category).
    ZohoSalesIQ.KnowledgeBase.getCategories(
      Resource.ARTICLES,
      null,
      null,
      (error, categories) => {
        if (error?.message) {
          setResult({error});
          showToast('Failed to load categories', 'danger');
          return;
        }
        setResult({categories});
        const first = categories?.[0];
        if (first?.id) {
          navigation.navigate('ResourceList', {
            title: first.name ?? 'Category',
            parentCategoryId: first.id,
          });
        } else {
          showToast('No categories returned', 'default');
        }
      },
    );
  };

  const fetchResourceDepartments = () => {
    // Fetch the departments that have knowledge base resources.
    ZohoSalesIQ.KnowledgeBase.getResourceDepartments((error, departments) => {
      if (error?.message) {
        setResult({error});
        showToast('Failed to load departments', 'danger');
        return;
      }
      setResult({departments});
      const first = departments?.[0];
      if (first?.id) {
        navigation.navigate('ResourceList', {
          title: first.name ?? 'Department',
          departmentId: first.id,
        });
      } else {
        showToast('No resource departments returned', 'default');
      }
    });
  };

  const openSingleResource = () => {
    if (!singleResourceId.trim()) {
      showToast('Enter a resource ID first', 'danger');
      return;
    }
    navigation.navigate('ResourceDetail', {
      id: singleResourceId.trim(),
      languageFallback: true,
    });
  };

  const openArticle = (article: RecentArticle) => {
    // Open a single article by its resource ID in the SDK UI.
    ZohoSalesIQ.KnowledgeBase.open(
      Resource.ARTICLES,
      article.id,
      (error, success) => {
        setResult(error?.message ? {error} : {success});
      },
    );
  };

  return (
    <ScreenScaffold
      title="Knowledge Base"
      subtitle="Articles, categories, and departments">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: radius.card,
          paddingHorizontal: 13,
          paddingVertical: 11,
        }}>
        <MaterialCommunityIcons
          name={AppIcons.search}
          size={18}
          color={colors.textTertiary}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={submitSearch}
          returnKeyType="search"
          placeholder="Search articles"
          placeholderTextColor={colors.textTertiary}
          accessibilityLabel="Search articles"
          style={{
            flex: 1,
            fontSize: 14.5,
            color: colors.textPrimary,
            padding: 0,
          }}
        />
      </View>

      <Section title="Visibility">
        <Card>
          <SwitchRow
            title="Show knowledge base"
            subtitle="isEnabled · setVisibility"
            value={showKnowledgeBase}
            onValueChange={toggleVisibility}
          />
          <SwitchRow
            title="Group by category"
            value={groupByCategory}
            onValueChange={toggleGrouping}
          />
          <SwitchRow
            title="Combine departments"
            value={combineDepartments}
            onValueChange={toggleCombine}
          />
          <ListRow
            title="Recently-viewed count"
            value={`${recentCount}`}
            onPress={cycleRecentCount}
          />
        </Card>
      </Section>

      <Section title="Fetch">
        <Card>
          <ListRow
            title="Resources"
            subtitle="dept / category / page"
            icon="knowledgeBase"
            tint="accent"
            chevron
            onPress={openResources}
          />
          <ListRow
            title="Categories"
            icon="homepage"
            tint="primary"
            chevron
            onPress={fetchCategories}
          />
          <ListRow
            title="Resource departments"
            icon="visitor"
            tint="secondary"
            chevron
            onPress={fetchResourceDepartments}
          />
          <Field
            label="Single resource ID (+ language fallback)"
            value={singleResourceId}
            onChangeText={setSingleResourceId}
            placeholder="resource id"
            autoCapitalize="none"
          />
          <ListRow
            title="Open single resource"
            subtitle="getSingleResource"
            icon="article"
            tint="accent"
            chevron
            onPress={openSingleResource}
          />
        </Card>
      </Section>

      <Section title="Recently viewed">
        <Card>
          {RECENTLY_VIEWED.map(article => (
            <ListRow
              key={article.id}
              title={article.title}
              subtitle={article.category}
              icon="article"
              tint="accent"
              chevron
              onPress={() => openArticle(article)}
            />
          ))}
        </Card>
      </Section>

      <Button
        title="Fetch categories"
        variant="secondary"
        icon="knowledgeBase"
        onPress={fetchCategories}
      />

      {result !== null ? (
        <ResultBlock label="Last result" data={result} />
      ) : null}
    </ScreenScaffold>
  );
};

export default KnowledgeBaseScreen;
