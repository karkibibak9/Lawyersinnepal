import Image from 'next/image';
import { getPostData, getSortedPostsData } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const postData = await getPostData(resolvedParams.slug);
    return {
      title: postData.title,
      description: postData.description,
      openGraph: {
        title: postData.title,
        description: postData.description,
        type: 'article',
        publishedTime: postData.date,
        authors: [postData.author],
      },
    };
  } catch (e) {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let postData;
  try {
    postData = await getPostData(resolvedParams.slug);
  } catch (error) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full bg-[#fcfcfc] min-h-screen">
      {/* Article Header */}
      <section className="bg-navy-900 py-20 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-navy-300 hover:text-gold-500 transition-colors text-sm uppercase tracking-widest font-bold mb-8">
            <ArrowLeft size={16} /> Back to Insights
          </Link>
          <div className="mb-6 flex justify-center">
            <span className="bg-gold-600/10 text-gold-500 border border-gold-600/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {postData.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight">
            {postData.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-navy-200 text-sm font-medium">
            <span className="flex items-center gap-2"><Calendar size={16} className="text-gold-600" /> {format(parseISO(postData.date), 'MMMM dd, yyyy')}</span>
            <span className="flex items-center gap-2"><User size={16} className="text-gold-600" /> {postData.author}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {postData.image && (
        <section className="-mt-12 container mx-auto px-4 max-w-5xl z-10 relative">
          <div className="aspect-[21/9] w-full rounded-sm overflow-hidden shadow-2xl border border-white/10 bg-navy-50">
            <Image
              src={postData.image}
              alt={`Featured image for ${postData.title}`}
              fill
              priority
              className="object-cover"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex justify-end mb-8">
            <button className="flex items-center gap-2 text-navy-500 hover:text-navy-900 transition-colors text-sm font-bold uppercase tracking-widest">
              <Share2 size={16} /> Share Article
            </button>
          </div>
          
          <article className="prose prose-lg prose-headings:font-serif prose-headings:text-navy-900 prose-p:text-navy-700 prose-a:text-gold-700 hover:prose-a:text-gold-600 prose-strong:text-navy-900 max-w-none">
            <MDXRemote source={postData.content} />
          </article>
          
          <div className="mt-16 pt-8 border-t border-navy-100 italic text-sm text-navy-500">
            Disclaimer: The information provided in this article does not, and is not intended to, constitute legal advice; instead, all information, content, and materials available on this site are for general informational purposes only.
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-navy-50 py-16 border-t border-navy-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">Need personalized legal advice?</h3>
          <p className="text-navy-600 mb-8">Schedule a consultation with our experienced legal team to discuss your specific situation.</p>
          <Link href="/appointment" className="inline-block px-8 py-3 bg-navy-900 text-white font-bold hover:bg-navy-800 transition-colors rounded-sm uppercase tracking-widest text-sm">
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
