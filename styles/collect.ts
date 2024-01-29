import { StyleSheet } from 'react-native';

const collectStyles = StyleSheet.create({
  buttons: {
    height: 160,
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    padding: 16,
    backgroundColor: '#E5E5E5',
    borderRadius: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    maxHeight: 38,
    zIndex:1
  },
});

export { collectStyles };
