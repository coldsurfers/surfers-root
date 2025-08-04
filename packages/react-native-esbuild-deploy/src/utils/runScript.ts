import type { ReactNode } from 'react';

export const runScript = <T>(scriptContent: string, sourceURL: string) => {
  // eslint-disable-next-line no-new-func
  const scriptFunction = new Function(
    'require',
    'module',
    'exports',
    `${scriptContent}\n//# sourceURL=${sourceURL}`
  );

  // Create a `require` function for React Native modules.
  const requireFn = (name: string) => {
    if (name === 'react') {
      return require('react');
    }
    if (name === 'react-native') {
      return require('react-native');
    }
    if (name === '@d11/react-native-fast-image') {
      return require('@d11/react-native-fast-image');
    }
    if (name === 'react/jsx-runtime') {
      return require('react/jsx-runtime');
    }
    if (name === 'react-native-reanimated') {
      return require('react-native-reanimated');
    }
    if (name === 'react-native-gesture-handler') {
      return require('react-native-gesture-handler');
    }
    if (name === '@gorhom/bottom-sheet') {
      return require('@gorhom/bottom-sheet');
    }
    if (name === '@tanstack/react-query') {
      return require('@tanstack/react-query');
    }
    if (name === '@coldsurfers/ocean-road') {
      return require('@coldsurfers/ocean-road');
    }
    if (name === '@coldsurfers/ocean-road/native') {
      return require('@coldsurfers/ocean-road/native');
    }
    if (name === '@coldsurfers/ocean-road-extension') {
      return require('@coldsurfers/ocean-road-extension');
    }
    if (name === '@coldsurfers/ocean-road-extension/native') {
      return require('@coldsurfers/ocean-road-extension/native');
    }
    if (name === '@coldsurfers/navigation-utils') {
      return require('@coldsurfers/navigation-utils');
    }
    if (name === '@emotion/native') {
      return require('@emotion/native');
    }
    if (name === 'lucide-react-native') {
      return require('lucide-react-native');
    }
    if (name === '@coldsurfers/ocean-road-extension') {
      return require('@coldsurfers/ocean-road-extension');
    }
    if (name === '@coldsurfers/ocean-road-extension/native') {
      return require('@coldsurfers/ocean-road-extension/native');
    }
    if (name === '@react-navigation/native') {
      return require('@react-navigation/native');
    }
    if (name === '@coldsurfers/shared-utils') {
      return require('@coldsurfers/shared-utils');
    }
    if (name === '@coldsurfers/openapi-client') {
      return require('@coldsurfers/openapi-client');
    }
    if (name === '@coldsurfers/openapi-client/native') {
      return require('@coldsurfers/openapi-client/native');
    }
    if (name === 'react-native-device-info') {
      return require('react-native-device-info');
    }
    throw new Error(`Unknown module: ${name}`);
  };

  // Execute the script function with `require`, `module`, and `exports`.
  const module = { exports: {} };
  scriptFunction(requireFn, module, module.exports);
  return module as {
    exports: {
      default: T;
    };
  };
};
