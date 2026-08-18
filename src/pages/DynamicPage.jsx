import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NotFound from './NotFound';

// Load all custom page JSON files eagerly at build time
const customPageModules = import.meta.glob('/src/content/custom-pages/*.json', { eager: true });

export default function DynamicPage() {
  const { slug } = useParams();

  // Find matching page by slug or file name
  const matchedEntry = Object.entries(customPageModules).find(([filePath, mod]) => {
    const data = mod?.default || mod;
    const fileName = filePath.split('/').pop().replace('.json', '');
    return data?.slug === slug || fileName === slug;
  });

  const page = matchedEntry ? (matchedEntry[1]?.default || matchedEntry[1]) : null;

  if (!page) {
    return <NotFound />;
  }

  // Simple, robust Markdown parser for standard headings, bold text, lists, and paragraphs
  const renderMarkdown = (content) => {
    if (!content) return null;

    const blocks = content.split('\n\n');

    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H1 (# Title)
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-3xl md:text-4xl font-bold text-primary font-headline-lg mt-8 mb-4">
            {trimmed.replace('# ', '')}
          </h1>
        );
      }

      // H2 (## Title)
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl md:text-3xl font-bold text-primary font-headline-lg mt-8 mb-4 border-b border-surface-variant/60 pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      // H3 (### Title)
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl md:text-2xl font-bold text-primary font-headline-lg mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // Unordered list (- Item or * Item)
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').map((item) => item.replace(/^[-*]\s+/, ''));
        return (
          <ul key={idx} className="list-disc list-inside space-y-2 my-4 text-on-surface-variant leading-relaxed">
            {items.map((item, i) => (
              <li key={i}>{parseInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
      }

      // Numbered list (1. Item)
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').map((item) => item.replace(/^\d+\.\s+/, ''));
        return (
          <ol key={idx} className="list-decimal list-inside space-y-2 my-4 text-on-surface-variant leading-relaxed">
            {items.map((item, i) => (
              <li key={i}>{parseInlineMarkdown(item)}</li>
            ))}
          </ol>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="text-body-md text-on-surface-variant leading-relaxed my-4">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  // Helper for inline **bold**, *italic*, and [link](url)
  const parseInlineMarkdown = (text) => {
    const parts = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold **text**
      const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
      // Link [text](url)
      const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);

      let firstMatch = null;
      let matchType = null;

      if (boldMatch && (!linkMatch || boldMatch.index < linkMatch.index)) {
        firstMatch = boldMatch;
        matchType = 'bold';
      } else if (linkMatch) {
        firstMatch = linkMatch;
        matchType = 'link';
      }

      if (!firstMatch) {
        parts.push(remaining);
        break;
      }

      const matchIndex = firstMatch.index;
      if (matchIndex > 0) {
        parts.push(remaining.substring(0, matchIndex));
      }

      if (matchType === 'bold') {
        parts.push(
          <strong key={key++} className="font-semibold text-primary">
            {firstMatch[1]}
          </strong>
        );
      } else if (matchType === 'link') {
        parts.push(
          <a
            key={key++}
            href={firstMatch[2]}
            className="text-secondary hover:underline font-medium"
            target={firstMatch[2].startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
          >
            {firstMatch[1]}
          </a>
        );
      }

      remaining = remaining.substring(matchIndex + firstMatch[0].length);
    }

    return parts;
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header Banner */}
      <section className="relative bg-surface-container-low py-16 md:py-24 border-b border-surface-variant overflow-hidden">
        {page.header_image && (
          <div className="absolute inset-0 z-0">
            <img
              src={page.header_image}
              alt={page.title}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/80 to-transparent"></div>
          </div>
        )}
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full w-fit mb-4">
            <span className="material-symbols-outlined text-sm">article</span>
            <span className="font-label-sm text-label-sm font-semibold">Official Policy & Information</span>
          </div>
          <h1 className="text-display-lg font-display-lg text-primary font-bold md:text-display-lg text-headline-lg-mobile mb-4">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              {page.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Main Content Article */}
      <main className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-16 w-full flex-grow">
        <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl border border-surface-variant shadow-sm">
          {renderMarkdown(page.body)}

          <div className="mt-12 pt-8 border-t border-surface-variant flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
            <span>Ronnie Care Foundation • Policy ID: {page.slug}</span>
            <Link to="/" className="text-secondary font-semibold hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
