import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function SEO({ 
  title = 'Euro Connect Sim - Internet en Europa', 
  description = 'Mantente conectado en toda Europa con nuestras SIMs de datos de alta velocidad. Olvídate del roaming y las complicaciones.',
  keywords = 'sim europa, esim europa, internet europa, roaming europa',
  image = '/og-image.png',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website'
}: SEOProps) {
  const siteTitle = `${title} | Euro Connect Sim`;
  
  return (
    <Helmet>
      {/* Etiquetas SEO básicas */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}