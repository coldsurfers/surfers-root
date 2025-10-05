'use client';

import { Spinner, colors } from '@coldsurfers/ocean-road';
import 'katex/dist/katex.min.css'; // For equations
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { ExtendedRecordMap } from 'notion-types';
import 'prismjs/themes/prism-tomorrow.css'; // For syntax highlighting
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type MapImageUrlFn, NotionRenderer as NR, type NotionComponents } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import { Tweet as TweetEmbed } from 'react-tweet';

function isNotionImage(url: string) {
  return url.startsWith('https://prod-files-secure.s3.us-west-2.amazonaws.com');
}

const Code = dynamic(
  () =>
    import('react-notion-x/build/third-party/code').then(async (m) => {
      // additional prism syntaxes
      const Prism = (await import('prismjs')).default;
      await Promise.all([
        import('prismjs/components/prism-markup-templating.js'),
        import('prismjs/components/prism-markup.js'),
        import('prismjs/components/prism-bash.js'),
        import('prismjs/components/prism-c.js'),
        // import('prismjs/components/prism-cpp.js'),
        import('prismjs/components/prism-csharp.js'),
        import('prismjs/components/prism-docker.js'),
        import('prismjs/components/prism-java.js'),
        import('prismjs/components/prism-kotlin.js'),
        import('prismjs/components/prism-js-templates.js'),
        import('prismjs/components/prism-coffeescript.js'),
        import('prismjs/components/prism-diff.js'),
        import('prismjs/components/prism-git.js'),
        import('prismjs/components/prism-go.js'),
        import('prismjs/components/prism-graphql.js'),
        import('prismjs/components/prism-handlebars.js'),
        import('prismjs/components/prism-less.js'),
        import('prismjs/components/prism-makefile.js'),
        import('prismjs/components/prism-markdown.js'),
        import('prismjs/components/prism-objectivec.js'),
        import('prismjs/components/prism-ocaml.js'),
        import('prismjs/components/prism-python.js'),
        import('prismjs/components/prism-reason.js'),
        import('prismjs/components/prism-rust.js'),
        import('prismjs/components/prism-sass.js'),
        import('prismjs/components/prism-scss.js'),
        import('prismjs/components/prism-solidity.js'),
        import('prismjs/components/prism-sql.js'),
        import('prismjs/components/prism-stylus.js'),
        import('prismjs/components/prism-swift.js'),
        import('prismjs/components/prism-wasm.js'),
        import('prismjs/components/prism-yaml.js'),
      ]);
      Prism.highlightAll();
      return m.Code;
    }),
  {
    ssr: false,
  }
);
// comment
// const Collection = dynamic(() => import('react-notion-x/build/third-party/collection').then((m) => m.Collection))

function Tweet({ id }: { id: string }) {
  return <TweetEmbed id={id} />;
}

const CustomImage = (props: {
  alt: string;
  className?: string;
  fill?: boolean;
  height?: number;
  onLoad?: () => void;
  priority: boolean;
  src: string;
  style: object;
  width?: number;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(props.src.includes('/api/notion-image-proxy'));

  useEffect(() => {
    const currentImg = imgRef.current;
    const onImageLoadOrError = () => {
      setIsLoading(false);
    };
    currentImg?.addEventListener('load', onImageLoadOrError);
    currentImg?.addEventListener('error', onImageLoadOrError);

    return () => {
      if (currentImg) {
        currentImg.removeEventListener('load', onImageLoadOrError);
        currentImg.removeEventListener('error', onImageLoadOrError);
      }
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Spinner />
        </div>
      ) : null}
      <img
        ref={imgRef}
        {...props}
        style={{
          background: isLoading ? colors.oc.violet[4].value : colors.oc.black.value,
          width: '100%',
          height: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'contain',
        }}
        alt={props.alt}
      />
    </>
  );
};

export const NotionRenderer = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  const components = useMemo<Partial<NotionComponents>>(() => {
    return {
      Code,
      Collection: () => null,
      nextLink: Link,
      Tweet,
      Image: CustomImage,
    };
  }, []);
  const mapImageUrl = useCallback<MapImageUrlFn>((url, block) => {
    if (!url) {
      return '';
    }
    if (isNotionImage(url)) {
      return `/api/notion-image-proxy?url=${encodeURIComponent(url)}&id=${block.id}`;
    }
    return url;
  }, []);

  return (
    <NR
      recordMap={recordMap}
      components={components}
      forceCustomImages
      mapImageUrl={mapImageUrl}
      isImageZoomable
      previewImages
    />
  );
};
