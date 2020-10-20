import React from 'react'
import Head from 'next/head'
import slugify from '@sindresorhus/slugify'
import styled from '@emotion/styled'
import Md from 'react-markdown'
import { A } from 'components'
import { getYoutubeId } from 'shared/utils'

const Styled = styled.div`
  h1 {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    margin-bottom: var(--vertical-6);
    font-size: 34px;
    line-height: 42px;

    @media (min-width: 768px) {
      margin-bottom: var(--vertical-2);
      font-size: 48px;
      line-height: 60px;
    }
  }

  .md-wrapper {
    display: flex;
    justify-content: center;
  }

  .text-wrapper {
    width: 100%;
    max-width: 768px;

    h2 {
      line-height: 1.3;
    }

    a {
      text-decoration: underline;
    }

    .p {
      margin-top: 28px;
      margin-bottom: 1rem;
      font-size: 18px;
      line-height: 28px;

      &:first-child {
        margin-top: 0;
      }

      .aspectRatio {
        margin-top: 28px;
      }

      @media (min-width: 768px) {
        font-size: 21px;
        line-height: 32px;
      }
    }

    .aspectRatio {
      position: relative;
      width: 100%;
      padding-top: 56.25%;

      & > iframe {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }

    .img-wrapper {
      display: flex;
    }
  }
`

function Post({ post }) {
  const slug = slugify(post.title)
  const metaTitle = `${post.title}. Читать на Released`
  const url = `https://released.at/blog/${post.id}-${slug}`
  const description = `Новости из мира игр, кино и сериалов в блоге Released`

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="title" content={metaTitle} />
        <meta name="description" content={description} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={metaTitle} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={description} />
      </Head>
      <Styled>
        <h1>{post.title}</h1>
        <div className="md-wrapper">
          <div className="text-wrapper">
            <Md
              source={post.body}
              renderers={{
                paragraph: ({ children }) => {
                  return <div className="p">{children}</div>
                },
                link: ({ href, children }) => {
                  if (href.includes('youtube.com')) {
                    return (
                      <div className="aspectRatio">
                        <iframe
                          title="Trailer"
                          frameBorder="0"
                          className="lazyload"
                          allowFullScreen
                          width="100%"
                          height="100%"
                          data-src={`https://www.youtube.com/embed/${getYoutubeId(
                            href,
                          )}`}
                        />
                      </div>
                    )
                  }

                  if (href.includes('released.at/release')) {
                    const { pathname } = new URL(href)

                    return (
                      <A href="/release/[id]" as={pathname} target="_blank">
                        {children}
                      </A>
                    )
                  }

                  return (
                    <A
                      href={href}
                      next={false}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      {children}
                    </A>
                  )
                },
              }}
            />
          </div>
        </div>
      </Styled>
    </>
  )
}

export default Post
