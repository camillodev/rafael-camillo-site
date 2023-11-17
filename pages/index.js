import Link from '@/components/Link'
import Post from '@/components/Post'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'

// import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 3

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const posts = await getAllFilesFrontMatter('blog', otherLocale)

  return { props: { posts, locale, availableLocales: locales } }
}

export default function Home({ posts, locale, availableLocales }) {
  const { t } = useTranslation()
  const codePosts = posts.filter((p) => p.tags.find((t) => t === 'code'))
  const businessPosts = posts.filter((p) => p.tags.find((t) => t === 'business'))

  return (
    <>
      <PageSEO
        title={siteMetadata.title[locale]}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      {
        <Post
          slug={posts[0].slug}
          date={posts[0].date}
          title={posts[0].title}
          summary={posts[0].summary}
          tags={posts[0].tags}
          image={posts[0].image}
          isBanner
        />
      }
      <div className="post-category">
        <div className="section-header flex justify-between pt-12">
          <h1 className="flex text-3xl  font-extrabold leading-6">{t('common:greeting')}</h1>
          {posts.length > MAX_DISPLAY && (
            <div className=" justify-end text-base font-medium leading-6">
              <Link
                href="/blog"
                className="more text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="all posts"
              >
                {t('common:all')}
              </Link>
            </div>
          )}
        </div>
        <ul className="grid grid-cols-3 gap-4 ">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags, image } = frontMatter
            return (
              <li key={slug} className="py-12">
                <Post
                  slug={slug}
                  date={date}
                  title={title}
                  summary={summary}
                  tags={tags}
                  image={image}
                />{' '}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="post-category">
        <div className="section-header flex justify-between pt-12">
          <h1 className="flex text-3xl  font-extrabold leading-6">{t('common:code')}</h1>
          {codePosts.length > MAX_DISPLAY && (
            <div className=" justify-end text-base font-medium leading-6">
              <Link
                href="/blog"
                className="more text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="all posts"
              >
                {t('common:all')}
              </Link>
            </div>
          )}
        </div>
        <ul className="grid grid-cols-3 gap-4 ">
          {!codePosts.length && 'No posts found.'}
          {codePosts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags, image } = frontMatter
            return (
              <li key={slug} className="py-12">
                <Post
                  slug={slug}
                  date={date}
                  title={title}
                  summary={summary}
                  tags={tags}
                  image={image}
                />{' '}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="post-category">
        <div className="section-header flex justify-between pt-12">
          <h1 className="flex text-3xl  font-extrabold leading-6">{t('common:business')}</h1>
          {codePosts.length > MAX_DISPLAY && (
            <div className=" justify-end text-base font-medium leading-6">
              <Link
                href="/blog"
                className="more text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="all posts"
              >
                {t('common:all')}
              </Link>
            </div>
          )}
        </div>
        <ul className="grid grid-cols-3 gap-4 ">
          {!businessPosts.length && 'No posts found.'}
          {businessPosts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags, image } = frontMatter
            return (
              <li key={slug} className="py-12">
                <Post
                  slug={slug}
                  date={date}
                  title={title}
                  summary={summary}
                  tags={tags}
                  image={image}
                />{' '}
              </li>
            )
          })}
        </ul>
      </div>
      {/* {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm title={t('newsletter:title')} />
        </div>
      )} */}
    </>
  )
}
