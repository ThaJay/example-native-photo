import * as React from 'react';

import { Text, TextProps } from './Themed';

function mergeStyles (componentStyle, propStyle) {
  if (propStyle) return {...componentStyle, ...propStyle}
  else return componentStyle
}

export function MonoText(props: TextProps) {
  return <Text {...props} style={mergeStyles(props.style, monoTextStyle)} />;
}

const monoTextStyle = { fontFamily: 'space-mono' }
