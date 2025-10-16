import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getLegalDocument } from '@/lib/content';
import { generateHreflangAlternates } from '@/lib/hreflang';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const doc = await getLegalDocument('terms', locale);
  const hreflangAlternates = generateHreflangAlternates({ locale, path: 'terms' });
  
  if (!doc) {
    return { 
      title: 'Terms of Service',
      alternates: hreflangAlternates,
    };
  }
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    alternates: hreflangAlternates,
  };
}

const components = {
  Link,
};

const TermsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const doc = await getLegalDocument('terms', locale);

  if (!doc) {
    return null;
  }

  const lastUpdated = doc.frontmatter.lastUpdated;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
          <article className="prose dark:prose-invert lg:prose-lg">
            <h1>{doc.frontmatter.title}</h1>
            {lastUpdated ? (
              <p><strong>Last Updated:</strong> {lastUpdated}</p>
            ) : null}
            <MDXRemote
              source={doc.content}
              components={components}
              options={{ mdxOptions: { remarkPlugins: [], rehypePlugins: [] } }}
            />
          </article>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
