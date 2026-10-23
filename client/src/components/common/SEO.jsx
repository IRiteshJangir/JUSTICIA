import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, ogImage }) => {
  const siteName = "JUSTICIA - Advocates & Legal Consultants";
  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDesc = "Premium law firm providing expert legal consultancy and representation.";

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default SEO;
