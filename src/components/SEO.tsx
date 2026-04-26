import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  schema?: object;
  canonical?: string;
}

export default function SEO({ 
  title, 
  description, 
  keywords = [], 
  image = "/og-image.png", 
  url = "https://newsmore.com", 
  type = "website",
  schema,
  canonical
}: SEOProps) {
  const fullTitle = `${title} | News More`;
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : url);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Brand Identification */}
      <meta name="application-name" content="News More" />
      <meta name="apple-mobile-web-app-title" content="News More" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
