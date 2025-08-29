import React, { FC, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../navigation/types';
import { CATEGORIES, NewsCategory } from '../../config';
import { useNewsApi } from '../../hooks/useNewsApi';
import NewsCard from '../../components/NewsCard';
import SearchBar from '../../components/SearchBar';
import { EmptyState, LoadingState } from '../../components/States';
import { styles } from './styles';
import { Localization } from '../../constants/localization';

export const FeedScreen: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Feed'>>();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<NewsCategory>('');

  const {
    articles,
    isLoading,
    isRefreshing,
    isEndReachedLoading,
    search,
    changeCategory,
    refresh,
    loadMore,
    reset,
  } = useNewsApi();

  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmitSearch = () => {
    search(query, category);
  };

  const onChangeCategory = (cat: NewsCategory) => {
    setCategory(cat);
    changeCategory(cat, query);
  };

  const categoryChips = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const isActive = category === cat.value;
      return (
        <Pressable
          key={cat.value || 'all'}
          onPress={() => onChangeCategory(cat.value)}
          style={[styles.chip, isActive && styles.chipActive]}
        >
          <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
            {cat.label}
          </Text>
        </Pressable>
      );
    });
  }, [category, onChangeCategory]);

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      <SearchBar value={query} onChangeText={setQuery} onSubmit={onSubmitSearch} placeholder={Localization.searchPlaceholder} />
      <View style={styles.filters}>
        {categoryChips}
      </View>
      {isLoading && articles.length === 0 ? (
        <LoadingState />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          renderItem={({ item }) => (
            <NewsCard article={item} onPress={() => navigation.navigate('Details', { article: item })} />
          )}
          onRefresh={refresh}
          refreshing={isRefreshing}
          onEndReachedThreshold={0.5}
          onEndReached={loadMore}
          ListFooterComponent={isEndReachedLoading ? <ActivityIndicator style={styles.footerActivity} /> : null}
          contentContainerStyle={articles.length === 0 ? styles.flexGrow : undefined}
          ListEmptyComponent={!isLoading ? <EmptyState /> : null}
        />
      )}
    </View>
  );
};
