import Link from 'next/link'
import Image from 'next/image'
import kebabCase from '@/lib/utils/kebabCase'

const Post = ({ slug, date, title, tags, image, isBanner = false }) => {
  return (
    <Link href={`/blog/${kebabCase(slug)}`}>
      <a key={slug} className="py-12">
        <article className="post-card post tag-community tag-legends">
          <div className={`post-card-image ${isBanner ? 'banner-image' : ''}`}>
            {image ? (
              <Image src={image} alt={title} layout="fill" objectFit="cover" />
            ) : (
              <Image src="/static/images/generic.jpg" alt={title} layout="fill" objectFit="cover" />
            )}
          </div>

          <div className="post-card-content">
            <header className="post-card-header">
              <span className="post-card-tag">{tags[0]}</span>
              <h2 className={`post-card-title ${isBanner ? 'banner-title' : ''}`}>{title}</h2>{' '}
            </header>
          </div>
        </article>
      </a>
    </Link>
  )
}

export default Post
