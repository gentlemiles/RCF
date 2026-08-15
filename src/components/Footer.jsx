import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
              Ronnie Care
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-primary/80 max-w-sm mb-6 leading-relaxed">
            Dedicated to improving healthcare access and sanitation in Nigeria. Empowering communities for a healthier future.
          </p>
          <div className="flex gap-4 items-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-on-primary hover:bg-white/20 hover:text-secondary-fixed transition-all"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
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
              Thank you for subscribing to Ronnie Care!
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

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs text-on-primary/60">
            <Link to="/#contact" className="hover:text-white transition-colors">HQ: Abuja, Nigeria</Link>
            <span>•</span>
            <a href="mailto:contact@ronniecare.org" className="hover:text-white transition-colors">contact@ronniecare.org</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-8 border-t border-white/10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="font-body-md text-body-md text-on-primary/60 text-sm">
          © 2024 Ronnie Care Foundation. Abuja, Nigeria. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-on-primary/60">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-white cursor-pointer transition-colors">Annual Reports</span>
        </div>
      </div>
    </footer>
  );
}
