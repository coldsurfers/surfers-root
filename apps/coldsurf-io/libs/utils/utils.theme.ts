export const themeUtils = {
  setLocalTheme: async (theme: 'dark' | 'light') => {
    await fetch('/api/local-theme', {
      method: 'POST',
      body: JSON.stringify({
        theme,
      }),
    });
  },
};
