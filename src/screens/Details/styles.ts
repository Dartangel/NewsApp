import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 16,
    gap: 12,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: Colors.imageBackground,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  meta: {
    color: Colors.textSecondary,
  },
  text: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  button: {
    marginTop: 12,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.textWhite,
    fontWeight: '600',
  },
  secondary: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryText: {
    color: Colors.textPrimary,
  },
});
