import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ROUTE_SEO_MAP, DEFAULT_SEO_CONFIG } from '../data/seoConfig';

export default function SEOHead() {
  const { currentRoute, selectedProperty, seoSettings } = useApp();

  useEffect(() => {
    // Current SEO configuration
    const activeSeo = {
      ...DEFAULT_SEO_CONFIG,
      ...(seoSettings || {})
    };

    const siteUrl = activeSeo.siteUrl || 'https://pplandsandplots.com';
    let title = activeSeo.defaultTitle;
    let description = activeSeo.defaultDescription;
    let canonical = `${siteUrl}${currentRoute === '/' ? '' : currentRoute}`;
    let ogImage = activeSeo.ogImage || `${siteUrl}/logo.png`;

    // 1. If a specific property is actively open
    if (selectedProperty) {
      title = `${selectedProperty.title} - ${selectedProperty.location} | PP LANDS & PLOTS`;
      description = `${selectedProperty.title} located in ${selectedProperty.location}. Size: ${selectedProperty.size}, Price: ${selectedProperty.price}, Approval: ${selectedProperty.approval || 'HMDA Approved'}. Verified plot/land with clear title deeds.`;
      if (selectedProperty.images && selectedProperty.images[0]) {
        ogImage = selectedProperty.images[0];
      }
    } else if (ROUTE_SEO_MAP[currentRoute]) {
      // 2. Route-specific SEO
      const routeData = ROUTE_SEO_MAP[currentRoute];
      title = routeData.title;
      description = routeData.description;
    }

    // Set Document Title
    document.title = title;

    // Helper to set or update meta tag by name or property
    const updateMetaTag = (attribute, name, content) => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Primary Meta Tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'title', title);
    if (activeSeo.keywords && activeSeo.keywords.length > 0) {
      updateMetaTag('name', 'keywords', activeSeo.keywords.join(', '));
    }

    // Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonical);

    // Open Graph Tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', canonical);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:site_name', activeSeo.siteName || 'PP LANDS & PLOTS');

    // Twitter Card Tags
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    // Google Search Console Verification Meta Tag
    if (activeSeo.googleSiteVerification) {
      updateMetaTag('name', 'google-site-verification', activeSeo.googleSiteVerification.trim());
    }

    // Dynamic Breadcrumb Schema for Google Search Console
    let breadcrumbScript = document.getElementById('gsc-breadcrumb-schema');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'gsc-breadcrumb-schema';
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }

    const routeName = currentRoute === '/' ? 'Home' : currentRoute.replace('/', '').charAt(0).toUpperCase() + currentRoute.slice(2);
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteUrl
        }
      ]
    };

    if (currentRoute !== '/') {
      breadcrumbData.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": routeName,
        "item": canonical
      });
    }

    breadcrumbScript.textContent = JSON.stringify(breadcrumbData);

    // Google Analytics (GA4) Dynamic Injection if ID is present
    if (activeSeo.googleAnalyticsId && activeSeo.googleAnalyticsId.startsWith('G-')) {
      const gaId = activeSeo.googleAnalyticsId.trim();
      if (!document.getElementById('ga-gtag-script')) {
        const script = document.createElement('script');
        script.id = 'ga-gtag-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.id = 'ga-inline-script';
        inlineScript.textContent = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(inlineScript);
      }
    }
  }, [currentRoute, selectedProperty, seoSettings]);

  return null;
}
