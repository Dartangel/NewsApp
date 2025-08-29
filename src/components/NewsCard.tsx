import React, { FC, memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Article } from '../types/news';
import { Colors } from '../constants/colors';
import { Localization } from '../constants/localization';

type Props = {
  article: Article;
  onPress: () => void;
};

const NewsCard: FC<Props> = memo(({ article, onPress }) => {
  const imageSource = article.urlToImage ? { uri: article.urlToImage } : require('../assets/placeholder.png');
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
        <Text style={styles.meta} numberOfLines={1}>
          {article.source?.name || Localization.unknownSource} • {new Date(article.publishedAt).toLocaleString()}
        </Text>
      </View>
    </Pressable>
  );
});

export default NewsCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.imageBackground,
  },
  content: {
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  meta: {
    color: Colors.textSecondary,
  },
});
