import Link from 'next/link';
import Image from 'next/image';
import { BLOG_AUTHOR_NAME, BLOG_AUTHOR_PROFILE, getSortedPostsData } from '@/lib/blog';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { absoluteUrl, defaultOgImage, SITE_NAME } from '@/lib/seo';

export const metadata = {
  title: 'Nepal Law Blog | Legal Guides for Divorce, Property, Business',
  description: 'Read practical Nepal law guides on divorce, property, criminal defense, company registration, FDI, labor, tax, and litigation from LawyerInNepal.',
  alternates: { canonical: absoluteUrl('/blog') },
  openGraph: {
    title: 'Nepal Law Blog | LawyerInNepal',
    description: 'Practical legal guides for the public and businesses in Nepal.',
    url: absoluteUrl('/blog'),
    images: [defaultOgImage],
  },
};

export default function BlogListingPage() {
  // Re-optimized image loading v2
  const allPosts = getSortedPostsData();
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Nepal Law Blog by LawyerInNepal',
    description: metadata.description,
    url: absoluteUrl('/blog'),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.svg'),
      },
    },
    author: {
      '@type': 'Person',
      name: BLOG_AUTHOR_NAME,
      url: absoluteUrl(BLOG_AUTHOR_PROFILE),
    },
    blogPost: allPosts.slice(0, 12).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: BLOG_AUTHOR_NAME,
        url: absoluteUrl(BLOG_AUTHOR_PROFILE),
      },
    })),
  };

  return (
    <div className="flex flex-col w-full bg-navy-900 min-h-screen">
      {/* Header */}
      <section className="bg-navy-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Legal Insights</h1>
          <p className="text-navy-100 max-w-2xl mx-auto text-lg leading-relaxed opacity-90">
            Stay informed with the latest legal developments, case studies, and practical guides to navigating the law in Nepal.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allPosts.map((post, index) => (
              <article key={post.slug} className="bg-navy-800 border border-navy-700 rounded-sm overflow-hidden gold-glow transition-all group flex flex-col shadow-2xl">
                {post.image && (
                  <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-navy-950">
                    <Image
                      src={`${post.image.split('?')[0]}?auto=format&fit=crop`}
                      alt={`Featured image for ${post.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                      loading={index === 0 ? undefined : 'lazy'}
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-gold-600 text-navy-900 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm z-10 shadow-lg">
                      {post.category}
                    </div>
                  </Link>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] text-navy-400 mb-4 uppercase tracking-[0.2em] font-bold">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gold-600" /> {format(parseISO(post.date), 'MMM dd, yyyy')}</span>
                  </div>
                  <h2 className="text-xl font-serif font-bold text-white mb-4 line-clamp-2 group-hover:text-gold-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-navy-200 text-sm leading-relaxed mb-6 line-clamp-3 opacity-80">
                    {post.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-navy-700 flex items-center justify-between">
                    <Link href={BLOG_AUTHOR_PROFILE} className="flex items-center gap-2 text-xs text-navy-200 font-bold uppercase tracking-wider opacity-60 hover:text-gold-600 transition-colors">
                      <User size={14} className="text-gold-600" />
                      {post.author}
                    </Link>
                    <Link href={`/blog/${post.slug}`} className="text-gold-600 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {allPosts.length === 0 && (
            <div className="text-center py-20 text-navy-400 font-serif italic">
              No articles have been published yet. Check back soon for legal updates.
            </div>
          )}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
    </div>
  );
}
