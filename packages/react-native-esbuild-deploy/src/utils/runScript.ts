import type { ReactNode } from 'react';

export const runScript = (scriptContent: string, sourceURL: string) => {
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
    throw new Error(`Unknown module: ${name}`);
  };

  // Execute the script function with `require`, `module`, and `exports`.
  const module = { exports: {} };
  scriptFunction(requireFn, module, module.exports);
  return module as {
    exports: {
      default: {
        SomeScreen: () => ReactNode;
      };
    };
  };
};
