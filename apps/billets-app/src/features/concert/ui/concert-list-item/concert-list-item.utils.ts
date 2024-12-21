import { StyleProp, ViewStyle } from 'react-native'

export const getConcertListItemWrapperDynamicStyles = (size: 'small' | 'large'): StyleProp<ViewStyle> => {
  return {
    width: size === 'small' ? 140 : '100%',
    padding: size === 'small' ? 0 : 12,
  }
}

export const getConcertListThumbnailWrapperDynamicStyles = (size: 'small' | 'large') => {
  return {
    borderBottomLeftRadius: size === 'small' ? 0 : 8,
    borderBottomRightRadius: size === 'small' ? 0 : 8,
  }
}

export const getConcertListBottomWrapperDynamicStyles = (size: 'small' | 'large') => {
  return {
    paddingLeft: size === 'small' ? 8 : 0,
    paddingRight: size === 'small' ? 8 : 0,
    marginTop: size === 'small' ? 8 : 16,
    marginBottom: size === 'small' ? 8 : 4,
  }
}
