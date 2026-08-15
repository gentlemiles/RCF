import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex-grow flex items-center justify-center py-20 px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-lg w-full text-center bg-surface-container-lowest p-8 md:p-12 rounded-2xl border border-surface-variant shadow-sm">
        <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl">search_off</span>
        </div>
        <span className="font-display-lg text-6xl font-extrabold text-primary block mb-2">404</span>
        <h1 className="text-2xl font-bold text-primary mb-3">Page Not Found</h1>
        <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let's get you back to empowering communities.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-lg bg-secondary text-white font-label-sm font-semibold hover:opacity-90 transition-opacity text-center shadow-sm"
          >
            Return to Homepage
          </Link>
          <Link
            to="/our-work"
            className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-label-sm font-semibold hover:bg-primary/5 transition-colors text-center"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </div>
  );
}
