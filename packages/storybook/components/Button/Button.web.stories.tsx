// stories/MyButton.stories.tsx
import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ColorSchemeProvider, useColorScheme} from '@coldsurfers/ocean-road';

import {MyButton} from './Button';

export default {
  title: 'components/MyButton',
  component: MyButton,
} as ComponentMeta<typeof MyButton>;

const HelloButton = () => {
  const theme = useColorScheme();
  console.log(theme);
  return (
    <div
      style={{
        backgroundColor: theme.colorGray0,
        width: '100px',
        height: '100px',
      }}
    />
  );
};

export const Basic: ComponentStory<typeof MyButton> = () => (
  <ColorSchemeProvider colorScheme="userPreference">
    <HelloButton />
  </ColorSchemeProvider>
);

Basic.args = {
  text: 'Hello World',
  color: 'purple',
};
