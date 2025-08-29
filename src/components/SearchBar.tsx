import React, { FC } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../constants/colors';
import { Localization } from '../constants/localization';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  onSubmit: () => void;
  placeholder?: string;
};

const SearchBar: FC<Props> = ({ value, onChangeText, onSubmit, placeholder }) => {
  return (
    <View style={styles.toolbar}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || Localization.search}
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
      <Pressable style={styles.searchBtn} onPress={onSubmit}>
        <Text style={styles.searchBtnText}>{Localization.searchButton}</Text>
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    padding: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchBtn: {
    marginLeft: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchBtnText: {
    color: Colors.textWhite,
    fontWeight: '600',
  },
});
