'use client';

import variables from '@coldsurfers/design-tokens/dist/js/color/variables';
import styled from '@emotion/styled';
import { PageLayout } from 'app/blog/(components)/page-layout/page-layout';
import { NotionRenderer } from 'app/blog/(notion-render)/notion-renderer';
import { generatePDF } from 'app/blog/(pdf)/pdf.utils';
import type { AppLocale } from 'app/blog/(types)/i18n';
import Link from 'next/link';
import type { ExtendedRecordMap } from 'notion-types';
import { useEffect } from 'react';
import postStyles from '../../../../(notion-render)/post.module.css';
const Wrapper = styled.div`
  a {
    color: ${variables.oc.blue[5].value};
  }
`;

const shouldGeneratePDF = process.env.NODE_ENV === 'development';

export function PageRenderer({
  careerRecordMap,
  title,
}: {
  locale: AppLocale;
  careerRecordMap: ExtendedRecordMap;
  title: string;
}) {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (shouldGeneratePDF) {
      timeoutId = setTimeout(() => {
        generatePDF();
      }, 1500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <PageLayout title={title}>
      <Wrapper>
        {/* career */}
        <NotionRenderer recordMap={careerRecordMap} />

        {process.env.NODE_ENV === 'production' && (
          <article className={postStyles.container}>
            <Link href="/" className={postStyles.back}>
              ← Go home
            </Link>
          </article>
        )}
      </Wrapper>
    </PageLayout>
  );
}
