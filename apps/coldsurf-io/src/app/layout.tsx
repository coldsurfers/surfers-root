import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { FirebaseContext } from '../contexts/firebase-context/firebase-context';
import { OceanRoadThemeContext } from '../contexts/ocean-road-theme-context/ocean-road-theme-context';
import { PageLayout } from './(ui)/page-layout/page-layout';

export const metadata: Metadata = {
  title: 'We Support Artists | COLDSURF',
  description: 'We help to create your own artist life',
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon.ico',
    apple: '/icons/favicon.ico',
  },
};

const notoSansKR = Noto_Sans_KR({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansKR.className}>
        <script
          // https://github.com/reactjs/react.dev/blob/4bae717f59787b4c741f600ee2d2decb07fba226/src/pages/_document.tsx#L103
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: `
                (function () {
                  function setTheme(newTheme) {
                    window.__theme = newTheme;
                    if (newTheme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else if (newTheme === 'light') {
                      document.documentElement.classList.remove('dark');
                    }
                  }

                  var preferredTheme;
                  try {
                    preferredTheme = localStorage.getItem('theme');
                  } catch (err) { }

                  window.__setPreferredTheme = function(newTheme) {
                    preferredTheme = newTheme;
                    setTheme(newTheme);
                    try {
                      localStorage.setItem('theme', newTheme);
                    } catch (err) { }
                  };

                  var initialTheme = preferredTheme;
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

                  if (!initialTheme) {
                    initialTheme = darkQuery.matches ? 'dark' : 'light';
                  }
                  setTheme(initialTheme);

                  darkQuery.addEventListener('change', function (e) {
                    if (!preferredTheme) {
                      setTheme(e.matches ? 'dark' : 'light');
                    }
                  });

                  // Detect whether the browser is Mac to display platform specific content
                  // An example of such content can be the keyboard shortcut displayed in the search bar
                  document.documentElement.classList.add(
                      window.navigator.platform.includes('Mac')
                      ? "platform-mac"
                      : "platform-win"
                  );
                })();
            `,
          }}
        />
        <FirebaseContext>
          <OceanRoadThemeContext>
            <PageLayout>{children}</PageLayout>
          </OceanRoadThemeContext>
        </FirebaseContext>
      </body>
    </html>
  );
}
