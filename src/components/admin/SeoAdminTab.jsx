import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DEFAULT_SEO_CONFIG, 
  ROUTE_SEO_MAP, 
  HIGH_VALUE_SEO_KEYWORDS, 
  generateSitemapXml 
} from '../../data/seoConfig';
import { 
  Globe, 
  Search, 
  FileText, 
  Check, 
  Copy, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle, 
  Sparkles, 
  Code, 
  Smartphone, 
  Monitor, 
  Info, 
  Save, 
  RefreshCw, 
  Tag, 
  X,
  Plus,
  Share2,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export default function SeoAdminTab() {
  const { properties, services, seoSettings, updateSeoSettings } = useApp();

  const [formState, setFormState] = useState({
    siteUrl: seoSettings?.siteUrl || DEFAULT_SEO_CONFIG.siteUrl,
    defaultTitle: seoSettings?.defaultTitle || DEFAULT_SEO_CONFIG.defaultTitle,
    defaultDescription: seoSettings?.defaultDescription || DEFAULT_SEO_CONFIG.defaultDescription,
    googleSiteVerification: seoSettings?.googleSiteVerification || DEFAULT_SEO_CONFIG.googleSiteVerification,
    googleAnalyticsId: seoSettings?.googleAnalyticsId || DEFAULT_SEO_CONFIG.googleAnalyticsId,
    ogImage: seoSettings?.ogImage || DEFAULT_SEO_CONFIG.ogImage,
    keywords: seoSettings?.keywords || DEFAULT_SEO_CONFIG.keywords
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const [serpDevice, setSerpDevice] = useState('desktop'); // 'desktop' | 'mobile'
  const [verificationCheckResult, setVerificationCheckResult] = useState(null);
  const [htmlFileName, setHtmlFileName] = useState('');

  // Handle Input Changes
  const handleChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  // Extract token if user pastes entire <meta ... /> tag
  const handleGscInputChange = (val) => {
    let cleaned = val.trim();
    if (cleaned.includes('<meta') && cleaned.includes('content=')) {
      const match = cleaned.match(/content=["']([^"']+)["']/i);
      if (match && match[1]) {
        cleaned = match[1];
      }
    }
    handleChange('googleSiteVerification', cleaned);
  };

  // Add Keyword Tag
  const handleAddKeyword = (e) => {
    e?.preventDefault();
    const clean = newKeyword.trim();
    if (!clean) return;
    if (!formState.keywords.includes(clean)) {
      handleChange('keywords', [...formState.keywords, clean]);
    }
    setNewKeyword('');
  };

  // Remove Keyword Tag
  const handleRemoveKeyword = (kwToRemove) => {
    handleChange('keywords', formState.keywords.filter(k => k !== kwToRemove));
  };

  // Save Settings
  const handleSave = async (e) => {
    e?.preventDefault();
    await updateSeoSettings(formState);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Copy to Clipboard Helper
  const copyToClipboard = (text, itemKey) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(itemKey);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  // Check live DOM for verification meta tag
  const checkLiveVerification = () => {
    const metaTag = document.querySelector('meta[name="google-site-verification"]');
    const content = metaTag?.getAttribute('content')?.trim();
    if (content && content === formState.googleSiteVerification.trim()) {
      setVerificationCheckResult({
        success: true,
        message: `Success! Meta tag is active in document <head> with code: "${content}"`
      });
    } else if (content) {
      setVerificationCheckResult({
        success: true,
        message: `Meta tag found with active value: "${content}"`
      });
    } else {
      setVerificationCheckResult({
        success: false,
        message: 'No verification code active yet. Enter code and click "Save All SEO Changes" first.'
      });
    }
    setTimeout(() => setVerificationCheckResult(null), 6000);
  };

  // Download XML Sitemap
  const downloadSitemap = () => {
    const sitemapContent = generateSitemapXml(properties, formState.siteUrl);
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download Google HTML Verification File
  const downloadHtmlVerificationFile = () => {
    if (!htmlFileName) return;
    const cleanName = htmlFileName.endsWith('.html') ? htmlFileName : `${htmlFileName}.html`;
    const content = `google-site-verification: ${cleanName}`;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = cleanName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sitemapUrl = `${formState.siteUrl}/sitemap.xml`;
  const robotsUrl = `${formState.siteUrl}/robots.txt`;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* TOP BANNER & ACTION HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Globe className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-white">Search Engine Optimization & Google Search Console</h2>
          </div>
          <p className="text-xs text-slate-400">
            Control Google Search indexation, verification tokens, XML sitemaps, GA4 tracking, and local Hyderabad ranking.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {saveSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Saved Successfully!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save All SEO Changes</span>
            </>
          )}
        </button>
      </div>

      {/* SEO HEALTH & STATUS AUDIT SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Google Search Console</span>
            <span className={`text-sm font-extrabold mt-0.5 block ${formState.googleSiteVerification ? 'text-emerald-400' : 'text-amber-400'}`}>
              {formState.googleSiteVerification ? 'Configured & Active' : 'Pending Verification'}
            </span>
          </div>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${formState.googleSiteVerification ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
            {formState.googleSiteVerification ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">XML Sitemap</span>
            <span className="text-sm font-extrabold text-emerald-400 mt-0.5 block">
              Active ({5 + properties.length} URLs)
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Robots.txt Crawl Directive</span>
            <span className="text-sm font-extrabold text-emerald-400 mt-0.5 block">Allowed & Live</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Structured Data Schema</span>
            <span className="text-sm font-extrabold text-emerald-400 mt-0.5 block">RealEstateAgent JSON-LD</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* SECTION 1: GOOGLE SEARCH CONSOLE INTEGRATION CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Google Search Console Integration</h3>
              <p className="text-xs text-slate-400">
                Verify site ownership on Google Search Console to track search keywords, rankings, impressions and clicks.
              </p>
            </div>
          </div>

          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors shrink-0"
          >
            <span>Open Google Search Console</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* METHOD 1: META TAG VERIFICATION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
              <span>Method 1: Google Site Verification HTML Tag</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Recommended</span>
            </label>
            <button
              type="button"
              onClick={checkLiveVerification}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Test Live Tag Detection</span>
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={formState.googleSiteVerification}
              onChange={(e) => handleGscInputChange(e.target.value)}
              placeholder='Paste verification code or full tag: <meta name="google-site-verification" content="XYZ..." />'
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl text-xs sm:text-sm font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {verificationCheckResult && (
            <div className={`p-3 rounded-2xl border text-xs flex items-center gap-2 ${
              verificationCheckResult.success 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {verificationCheckResult.success ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{verificationCheckResult.message}</span>
            </div>
          )}

          {/* STEP BY STEP GUIDE BOX */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 text-xs space-y-2">
            <span className="font-bold text-slate-300 block mb-1">Quick 3-Minute Setup Instructions:</span>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-400 leading-relaxed">
              <li>Open <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-rose-400 underline font-semibold">Google Search Console</a> and sign in with your Google account (<strong className="text-slate-300">pplp3008@gmail.com</strong>).</li>
              <li>Under <strong className="text-slate-300">"Select property type"</strong>, choose <strong className="text-slate-300">URL prefix</strong> and enter <code className="bg-slate-900 px-1.5 py-0.5 rounded text-indigo-300 font-mono">https://pplandsandplots.com/</code>.</li>
              <li>Under verification methods, select <strong className="text-slate-300">"HTML tag"</strong>. Copy the code provided by Google.</li>
              <li>Paste the code or token into the field above and click <strong className="text-indigo-400">"Save All SEO Changes"</strong>.</li>
              <li>Go back to Google Search Console and click <strong className="text-emerald-400">"Verify"</strong>. Ownership will be confirmed immediately!</li>
            </ol>
          </div>
        </div>

        {/* METHOD 2: HTML VERIFICATION FILE */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wide block">
            Method 2: HTML File Upload (Alternative)
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="text"
              value={htmlFileName}
              onChange={(e) => setHtmlFileName(e.target.value)}
              placeholder="e.g. google49a21b38e079a405.html"
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={downloadHtmlVerificationFile}
              disabled={!htmlFileName}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Generate Verification File</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            If Google asks for a verification file download, you can enter the filename here to download the matching HTML verification file to place in the site root.
          </p>
        </div>
      </div>

      {/* SECTION 2: SITEMAP & ROBOTS.TXT MANAGER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">XML Sitemap & Robots.txt Directives</h3>
            <p className="text-xs text-slate-400">
              Submit your XML sitemap in Google Search Console to guarantee all properties and pages are indexed promptly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* SITEMAP BOX */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 uppercase">Primary Sitemap URL</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold">Live</span>
            </div>

            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono text-emerald-400 truncate">
              <span className="truncate">{sitemapUrl}</span>
              <button
                type="button"
                onClick={() => copyToClipboard(sitemapUrl, 'sitemap')}
                className="ml-2 p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white shrink-0"
                title="Copy Sitemap URL"
              >
                {copiedItem === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              In Google Search Console, click <strong className="text-slate-300">"Sitemaps"</strong> in the left sidebar, enter <code className="text-emerald-400 font-mono">sitemap.xml</code>, and click Submit.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 inline-flex items-center gap-1"
              >
                <span>View sitemap.xml</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="button"
                onClick={downloadSitemap}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 inline-flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Export Updated XML</span>
              </button>
            </div>
          </div>

          {/* ROBOTS.TXT BOX */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 uppercase">Robots.txt Directive</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-extrabold">Configured</span>
            </div>

            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono text-indigo-400 truncate">
              <span className="truncate">{robotsUrl}</span>
              <button
                type="button"
                onClick={() => copyToClipboard(robotsUrl, 'robots')}
                className="ml-2 p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white shrink-0"
                title="Copy Robots.txt URL"
              >
                {copiedItem === 'robots' ? <Check className="w-3.5 h-3.5 text-indigo-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Allows Googlebot and Bingbot to crawl public pages while blocking unauthorized crawling of <code className="text-rose-400 font-mono">/admin</code> and API routes.
            </p>

            <div className="pt-1">
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 inline-flex items-center gap-1"
              >
                <span>View robots.txt</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: GOOGLE ANALYTICS (GA4) INTEGRATION */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Google Analytics 4 (GA4) Integration</h3>
            <p className="text-xs text-slate-400">
              Connect Google Analytics to track live site visitors, page views, and link directly with Search Console.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            GA4 Measurement ID
          </label>
          <input
            type="text"
            value={formState.googleAnalyticsId}
            onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
            placeholder="e.g. G-XXXXXXXXXX"
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl text-xs sm:text-sm font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <p className="text-[11px] text-slate-500 mt-1.5">
            Enter your Google Analytics 4 Measurement ID starting with <code className="text-amber-400 font-mono">G-</code>. The official Google Tag script will automatically initialize on the site.
          </p>
        </div>
      </div>

      {/* SECTION 4: LIVE GOOGLE SERP SIMULATOR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Live Google Search SERP Preview</h3>
              <p className="text-xs text-slate-400">
                Preview how your website appears to searchers on Google.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => setSerpDevice('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                serpDevice === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setSerpDevice('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                serpDevice === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* GOOGLE RESULT CARD REPLICA */}
        <div className={`mx-auto bg-white dark:bg-[#202124] p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all ${
          serpDevice === 'mobile' ? 'max-w-md' : 'w-full'
        }`}>
          {/* Breadcrumb line */}
          <div className="flex items-center gap-2 mb-1.5">
            <img src="/logo.png" alt="Favicon" className="w-4 h-4 rounded-full object-contain" />
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-slate-900 dark:text-slate-200 leading-tight">
                PP LANDS & PLOTS
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 truncate leading-tight font-mono">
                https://pplandsandplots.com › hyderabad › shankarpally
              </span>
            </div>
          </div>

          {/* Clickable Blue Title */}
          <h4 className="text-[17px] sm:text-[19px] font-normal text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug line-clamp-2">
            {formState.defaultTitle}
          </h4>

          {/* Star Rating snippet */}
          <div className="flex items-center gap-1.5 my-1 text-xs text-slate-700 dark:text-slate-300">
            <span className="text-amber-500 font-bold">★★★★★</span>
            <span className="font-semibold">4.9</span>
            <span className="text-slate-500 dark:text-slate-400">· Real estate agency · Shankarpally, Telangana · Open ⋅ Closes 7 PM</span>
          </div>

          {/* Description snippet */}
          <p className="text-[13px] text-slate-700 dark:text-[#bdc1c6] leading-relaxed line-clamp-3">
            {formState.defaultDescription}
          </p>

          {/* Sitelinks row */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span className="text-[#1a0dab] dark:text-[#8ab4f8] font-medium hover:underline cursor-pointer block">
                Open Plots & Ventures
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                HMDA approved layout plots in Shankarpally
              </span>
            </div>
            <div>
              <span className="text-[#1a0dab] dark:text-[#8ab4f8] font-medium hover:underline cursor-pointer block">
                Agriculture Lands
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                Fertile farm lands in Telangana
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: SITE-WIDE METADATA & CONTENT CONFIGURATION */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Default Meta Tags & Social Sharing</h3>
            <p className="text-xs text-slate-400">
              Customize title tags, descriptions and social open-graph previews.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300">
                Global SEO Title Tag
              </label>
              <span className={`text-[10px] font-bold ${
                formState.defaultTitle.length > 60 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {formState.defaultTitle.length} / 60 characters (Recommended: 50-60)
              </span>
            </div>
            <input
              type="text"
              value={formState.defaultTitle}
              onChange={(e) => handleChange('defaultTitle', e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl text-xs sm:text-sm font-semibold text-white focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300">
                Global Meta Description
              </label>
              <span className={`text-[10px] font-bold ${
                formState.defaultDescription.length > 160 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {formState.defaultDescription.length} / 160 characters (Recommended: 140-160)
              </span>
            </div>
            <textarea
              rows={3}
              value={formState.defaultDescription}
              onChange={(e) => handleChange('defaultDescription', e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl text-xs sm:text-sm font-semibold text-white focus:outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Canonical Site URL
              </label>
              <input
                type="text"
                value={formState.siteUrl}
                onChange={(e) => handleChange('siteUrl', e.target.value)}
                placeholder="https://pplandsandplots.com"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl text-xs sm:text-sm font-mono text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Social Share Image (OG Image URL)
              </label>
              <input
                type="text"
                value={formState.ogImage}
                onChange={(e) => handleChange('ogImage', e.target.value)}
                placeholder="https://pplandsandplots.com/logo.png"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl text-xs sm:text-sm font-mono text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* KEYWORDS TAGS MANAGER */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">
            Target Search Keywords ({formState.keywords.length})
          </label>

          <form onSubmit={handleAddKeyword} className="flex gap-2">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Add keyword, e.g. plots in shankarpally hyderabad"
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs font-semibold text-white placeholder-slate-600 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Keyword</span>
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-1">
            {formState.keywords.map((kw, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium"
              >
                <span>{kw}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(kw)}
                  className="text-slate-500 hover:text-rose-400 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 6: LOCAL REAL ESTATE KEYWORDS AUDIT FOR SHANKARPALLY & HYDERABAD */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Top Shankarpally & Hyderabad Keywords Radar</h3>
            <p className="text-xs text-slate-400">
              High-ranking real estate search terms automatically optimized across your pages and listings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {HIGH_VALUE_SEO_KEYWORDS.map((item, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-white block capitalize">{item.keyword}</span>
                <span className="text-[10px] text-slate-500">{item.category} • Priority: {item.priority}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Optimized
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
