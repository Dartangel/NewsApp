import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flexGrow: {
    flexGrow: 1,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 8,
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 32,
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: Colors.active,
    borderColor: Colors.active,
  },
  chipText: {
    color: Colors.textPrimary,
  },
  chipTextActive: {
    color: Colors.textWhite,
  },
  footerActivity: {
    margin: 16,
  },
});

