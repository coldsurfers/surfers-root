'use client';

import storage from '@/libs/utils/utils.storage';
import { themeUtils } from '@/libs/utils/utils.theme';
import { Button, type ColorScheme, Text, useColorScheme } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useCallback, useEffect } from 'react';

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
  const { setTheme } = useColorScheme();

  const toggleColorScheme = useCallback(async () => {
    const themeStorageValue = storage?.get('@coldsurf-io/theme');
    const nextTheme: ColorScheme = themeStorageValue === 'dark' ? 'light' : 'dark';
    await themeUtils.setLocalTheme(nextTheme);
    window.__setPreferredTheme(nextTheme);
    setTheme(nextTheme);
  }, [setTheme]);

  useEffect(() => {
    const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    function handleThemeChange(e: MediaQueryListEvent) {
      // 초기에 유저가 브라우저를 통해 진입 후, 다크모드/라이트모드 변경이 있을시에만 ocean road theme 변경을 위해 실행
      if (e.matches) {
        // console.log('🌙 사용자 다크모드로 변경');
        setTheme('dark');
      } else {
        // console.log('☀️ 사용자 라이트모드로 변경');
        setTheme('light');
      }
    }
    // 변화 감지 리스너 등록 (최초 감지는 하지 않음)
    darkModeMedia.addEventListener('change', handleThemeChange);

    return () => {
      darkModeMedia.removeEventListener('change', handleThemeChange);
    };
  }, [setTheme]);

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
