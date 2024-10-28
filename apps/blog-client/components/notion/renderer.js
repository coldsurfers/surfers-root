import { Fragment } from 'react'

import Link from 'next/link'
import { highlight, languages } from 'prismjs'

import { Tweet } from 'react-tweet'
import styles from '../../styles/post.module.css'
import SpotifyEmbed from '../embed'
import Text from '../text'

const SUPPORTED_VIDEO_URLS = ['https://www.youtube.com', 'https://youtube.com']

export function renderBlock(block) {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p key={id}>
          <Text title={value.rich_text} />
        </p>
      )
    case 'heading_1':
      return (
        <h1 key={id}>
          <Text title={value.rich_text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2 key={id}>
          <Text title={value.rich_text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3 key={id}>
          <Text title={value.rich_text} />
        </h3>
      )
    case 'bulleted_list': {
      return (
        <ul className={styles.list} key={id}>
          {value.children.map((child) => renderBlock(child))}
        </ul>
      )
    }
    case 'numbered_list': {
      return (
        <ol key={id}>{value.children.map((child) => renderBlock(child))}</ol>
      )
    }
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li key={id}>
          <Text title={value.rich_text} />
          {/* eslint-disable-next-line no-use-before-define */}
          {!!block.children && renderNestedList(block)}
        </li>
      )
    case 'to_do':
      return (
        <div key={id}>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <Text title={value.rich_text} />
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details key={id}>
          <summary>
            <Text title={value.rich_text} />
          </summary>
          {block.children?.map((child) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      )
    case 'child_page':
      return (
        <div key={id} className={styles.childPage}>
          <strong>{value?.title}</strong>
          {block.children.map((child) => renderBlock(child))}
        </div>
      )
    case 'image': {
      const src =
        value.type === 'external' ? value.external.url : value.file.url
      const caption = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure key={id}>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    }
    case 'divider':
      return <hr key={id} />
    case 'quote':
      return (
        <blockquote
          key={id}
          className={styles.blockquote}
          style={{
            fontWeight: value.rich_text[0].annotations.bold ? 'bold' : 'normal',
            fontStyle: value.rich_text[0].annotations.bold
              ? 'italic'
              : 'normal',
          }}
        >
          {value.rich_text[0].plain_text}
        </blockquote>
      )
    case 'code':
      return (
        <pre key={id} className={[styles.pre, `language-${value.language}`]}>
          <code
            className={[styles.code_block, `language-${value.language}`]}
            key={id}
            dangerouslySetInnerHTML={{
              __html: highlight(
                value.rich_text[0].plain_text,
                languages[value.language] || languages.javascript,
                value.language
              ),
            }}
          />
        </pre>
      )
    case 'file': {
      const srcFile =
        value.type === 'external' ? value.external.url : value.file.url
      const splitSourceArray = srcFile.split('/')
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1]
      const captionFile = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure key={id}>
          <div className={styles.file}>
            📎{' '}
            <Link href={srcFile} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {captionFile && <figcaption>{captionFile}</figcaption>}
        </figure>
      )
    }
    case 'bookmark': {
      const href = value.url
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.bookmark}
        >
          {href}
        </a>
      )
    }
    case 'table': {
      return (
        <table key={id} className={styles.table}>
          <tbody>
            {block.children?.map((child, index) => {
              const RowElement =
                value.has_column_header && index === 0 ? 'th' : 'td'
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell, i) => (
                    <RowElement key={`${cell.plain_text}-${i}`}>
                      <Text title={cell} />
                    </RowElement>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }
    case 'column_list': {
      return (
        <div key={id} className={styles.row}>
          {block.children.map((childBlock) => renderBlock(childBlock))}
        </div>
      )
    }
    case 'column': {
      return (
        <div key={id}>{block.children.map((child) => renderBlock(child))}</div>
      )
    }
    case 'callout':
      return (
        <div
          key={id}
          style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            background: '#000000',
            padding: '0.5rem',
          }}
        >
          {value.icon.emoji} {value.rich_text[0].plain_text}
        </div>
      )
    case 'embed':
      if (block.embed.url.includes('spotify')) {
        return <SpotifyEmbed key={id} spotifyURL={block.embed.url} />
      }
      if (block.embed.url.includes('twitter')) {
        const { url: tweetUrl } = block.embed
        const tweetId = tweetUrl?.split('/')?.pop()
        if (tweetId) {
          return <Tweet key={id} id={tweetId} />
        }
        return null
      }
      return null
    case 'video':
      // eslint-disable-next-line no-case-declarations
      const videoUrl = block.video?.external?.url ?? ''
      // eslint-disable-next-line no-case-declarations
      const isSupportedVideoUrl = SUPPORTED_VIDEO_URLS.some((supported) =>
        videoUrl.startsWith(supported)
      )
      if (isSupportedVideoUrl) {
        return (
          <iframe
            key={id}
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{
              width: '100%',
              minHeight: '360px',
            }}
          />
        )
      }
      return `❌ Unsupported video url (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`
  }
}

export function renderNestedList(blocks) {
  const value = blocks
  if (!value) return null

  const isNumberedList = value.children[0].type === 'numbered_list_item'

  if (isNumberedList) {
    return <ol>{value.children.map((block) => renderBlock(block))}</ol>
  }
  return (
    <ul className={styles.list}>
      {value.children.map((block) => renderBlock(block))}
    </ul>
  )
}
