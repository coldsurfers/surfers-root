'use client';

import storage from '@/libs/utils/utils.storage';
import { themeUtils } from '@/libs/utils/utils.theme';
import { Button, type ColorScheme, Text } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useCallback } from 'react';

const DarkLabelText = styled(Text)`
  display: block;
  html.dark & {
    display: none;
  }
`;

const DarkLabel = () => {
  return <DarkLabelText>☀️</DarkLabelText>;
};

const LightLabelText = styled(Text)`
  display: none;
  html.dark & {
    display: block;
  }
`;

const LightLabel = () => {
  return <LightLabelText>🌕</LightLabelText>;
};

export const ColorSchemeToggle = () => {
  const toggleColorScheme = useCallback(async () => {
    const themeStorageValue = storage?.get('@coldsurf-io/theme');
    const nextTheme: ColorScheme = themeStorageValue === 'dark' ? 'light' : 'dark';
    await themeUtils.setLocalTheme(nextTheme);
    window.__setPreferredTheme(nextTheme);
  }, []);

  return (
    <Button
      onClick={toggleColorScheme}
      theme="transparent"
      style={{ marginLeft: 'auto', fontSize: 20 }}
    >
      <DarkLabel />
      <LightLabel />
    </Button>
  );
};
