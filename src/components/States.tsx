import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { Localization } from '../constants/localization';

export const LoadingState: FC = () => {
  return (
    <View style={styles.center}>
      <ActivityIndicator />
    </View>
  );
};

type EmptyStateProps = {
  text?: string;
};

export const EmptyState: FC<EmptyStateProps> = ({ text = Localization.noResults }) => {
  return (
    <View style={styles.center}> 
      <Text style={styles.gray}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  gray: {
    color: Colors.textSecondary,
  },
});
