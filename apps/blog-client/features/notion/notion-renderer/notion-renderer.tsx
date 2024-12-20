'use client'

import 'katex/dist/katex.min.css' // For equations
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ExtendedRecordMap } from 'notion-types'
import 'prismjs/themes/prism-tomorrow.css' // For syntax highlighting
import { NotionRenderer as NR } from 'react-notion-x'
import 'react-notion-x/src/styles.css'
import { Tweet as TweetEmbed } from 'react-tweet'

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      import('prismjs/components/prism-markup-templating.js'),
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-c.js'),
      // import('prismjs/components/prism-cpp.js'),
      import('prismjs/components/prism-csharp.js'),
      import('prismjs/components/prism-docker.js'),
      import('prismjs/components/prism-java.js'),
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
    ])
    return m.Code
  }),
)
// comment
// const Collection = dynamic(() => import('react-notion-x/build/third-party/collection').then((m) => m.Collection))

function Tweet({ id }: { id: string }) {
  return <TweetEmbed id={id} />
}

export const NotionRenderer = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  return (
    <NR
      recordMap={recordMap}
      components={{
        Code,
        Collection: () => null,
        nextLink: Link,
        Tweet,
      }}
      mapImageUrl={(url, block) => {
        return `/api/notion-image-proxy?url=${url}&id=${block.id}`
      }}
      previewImages={true}
    />
  )
}
