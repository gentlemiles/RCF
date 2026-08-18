import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import globalSettings from '../content/settings/global.json';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const siteName = globalSettings?.site_name || 'Ronnie Care Foundation';
  const missionText = globalSettings?.footer_mission || 'Dedicated to improving healthcare access and sanitation in Nigeria. Empowering communities for a healthier future.';
  const copyrightText = globalSettings?.copyright || '© 2024 Ronnie Care Foundation. Abuja, Nigeria. All rights reserved.';
  const address = globalSettings?.address || 'Suite GF16, Anafara Plaza, Gwarinpa, Abuja, Nigeria';
  const contactEmail = globalSettings?.email || 'contact@ronniecare.org';
  const socialLinks = globalSettings?.social_links || {};

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full py-16 bg-primary dark:bg-primary-container text-white mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Col 1 & 2: Brand Info */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <img
              alt="Ronnie Care Foundation Logo"
              className="h-12 object-contain brightness-0 invert"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2GPSvIQT5Gdh1OFt8ObXlrUchuZGyZAiYIuN1ob74Lv0Oen_p_41NW_zITs1qbXrJKUcHngZQB-s1bkFka8hsiCamhjdZGie61qy70xGgPVWPehjTmeN-cj_sfjXKOpv_AG6v7Hy7l5NNIfhORnkE-MDWFzqGt7C18DAOt06JBWKrcQ0bCHw9p9qvTaoV4Z0d7UWxxoLW4SJBra-VSeTiQjjp7GUvW1O2oJZ4YFH2KjYVYnLgVihSBjVrh0guGpYYCg"
            />
            <span className="font-title-md text-title-md font-bold text-white tracking-tight">
              {siteName}
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-primary/80 max-w-sm mb-6 leading-relaxed">
            {missionText}
          </p>
          <div className="flex gap-4 items-center">
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-on-primary hover:bg-white/20 hover:text-secondary-fixed transition-all"
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-on-primary hover:bg-white/20 hover:text-secondary-fixed transition-all"
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    clipRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </a>
            )}
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-on-primary hover:bg-white/20 hover:text-secondary-fixed transition-all"
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-on-primary hover:bg-white/20 hover:text-secondary-fixed transition-all"
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Col 3: Quick Links */}
        <div>
          <h4 className="font-label-sm text-label-sm text-white uppercase tracking-wider mb-4 font-semibold">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link to="/about" className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed transition-colors duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/our-work" className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed transition-colors duration-200">
                Our Work
              </Link>
            </li>
            <li>
              <Link to="/wash" className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed transition-colors duration-200">
                WASH Initiatives
              </Link>
            </li>
            <li>
              <Link to="/stories" className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed transition-colors duration-200">
                Field Stories
              </Link>
            </li>
            <li>
              <Link to="/partner" className="font-body-md text-body-md text-on-primary/80 hover:text-secondary-fixed transition-colors duration-200">
                Partner With Us
              </Link>
            </li>
            <li>
              <Link to="/donate" className="font-body-md text-body-md text-secondary-fixed font-semibold hover:underline transition-colors duration-200">
                Donate Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter Subscription */}
        <div>
          <h4 className="font-label-sm text-label-sm text-white uppercase tracking-wider mb-4 font-semibold">
            Newsletter
          </h4>
          <p className="font-body-md text-body-md text-on-primary/80 mb-4 leading-relaxed">
            Stay updated with our latest impact reports and community dispatches.
          </p>
          {subscribed ? (
            <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-100 rounded-lg p-3 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              Thank you for subscribing to {siteName}!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-on-primary/50 focus:border-secondary-fixed focus:ring-2 focus:ring-secondary-fixed font-body-md px-3 py-2 text-sm transition-all"
              />
              <button
                type="submit"
                className="bg-secondary text-white px-4 py-2 rounded-lg font-label-sm hover:opacity-90 active:scale-95 transition-all shrink-0 font-medium"
              >
                Subscribe
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-1 text-xs text-on-primary/70">
            <span className="text-white font-medium">{address}</span>
            <div className="flex flex-wrap gap-3 mt-1 text-on-primary/60">
              <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">{contactEmail}</a>
              {globalSettings?.whatsapp && (
                <>
                  <span>•</span>
                  <a href={`https://wa.me/${globalSettings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    WhatsApp: {globalSettings.whatsapp}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Dynamic Policy Links */}
      <div className="mt-12 pt-8 border-t border-white/10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="font-body-md text-body-md text-on-primary/60 text-sm">
          {copyrightText}
        </p>
        <div className="flex gap-6 text-xs text-on-primary/60">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
