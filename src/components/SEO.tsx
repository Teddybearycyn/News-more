import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  keywords?: string[];
  structuredData?: object;
  author?: string;
  date?: string;
}

export default function SEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  keywords,
  structuredData,
  author,
  date,
}: SEOProps) {
  const siteName = 'News More Expert';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Your ultimate resource for freelancing, IT support, technical engineering, and geopolitical insights. Stay informed with expert analysis.';
  const metaDescription = description || defaultDescription;
  const url = canonical ? `https://newsmore.expert${canonical}` : 'https://newsmore.expert';
  const defaultImage = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';
  const metaImage = ogImage || defaultImage;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Article Specific Meta Tags */}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {ogType === 'article' && date && (
        <meta property="article:published_time" content={date} />
      )}

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
