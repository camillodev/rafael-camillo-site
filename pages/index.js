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
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9">{t('common:greeting')}</h1>
      </div>
      <ul className="grid grid-cols-3 gap-4 divide-y divide-gray-200 dark:divide-gray-700">
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
            // <li key={slug} className="py-12">
            //   <article>
            //     <div className="grid grid-cols-3 gap-4">
            //       <div className="col-span-1">
            //         <dl>
            //           <dt className="sr-only">{t('common:pub')}</dt>
            //           <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            //             <time dateTime={date}>{formatDate(date, locale)}</time>
            //           </dd>
            //         </dl>
            //       </div>
            //       <div className="col-span-2">
            //         <h2 className="text-2xl font-bold leading-8 tracking-tight">
            //           <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
            //             {title}
            //           </Link>
            //         </h2>
            //         <div className="flex flex-wrap">
            //           {tags.map((tag) => (
            //             <Tag key={tag} text={tag} />
            //           ))}
            //         </div>
            //         <div className="prose max-w-none text-gray-500 dark:text-gray-400">
            //           {summary}
            //         </div>
            //         <div className="text-base font-medium leading-6">
            //           <Link
            //             href={`/blog/${slug}`}
            //             className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            //             aria-label={`Read "${title}"`}
            //           >
            //             {t('common:more')} &rarr;
            //           </Link>
            //         </div>
            //       </div>
            //     </div>
            //   </article>
            // </li>
          )
        })}
      </ul>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            {t('common:all')} &rarr;
          </Link>
        </div>
      )}
      {/* {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm title={t('newsletter:title')} />
        </div>
      )} */}
    </>
  )
}
