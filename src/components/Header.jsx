import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Work', path: '/our-work' },
    { name: 'WASH Initiatives', path: '/wash' },
    { name: 'Field Stories', path: '/stories' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        // Will navigate to home with hash
      } else {
        const id = path.replace('/#', '');
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md dark:bg-surface-container/90 shadow-sm shadow-primary/5 border-b border-surface-variant/40 transition-all duration-200">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group focus:outline-none">
          <img
            alt="Ronnie Care Foundation Logo"
            className="h-10 object-contain group-hover:scale-105 transition-transform"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2GPSvIQT5Gdh1OFt8ObXlrUchuZGyZAiYIuN1ob74Lv0Oen_p_41NW_zITs1qbXrJKUcHngZQB-s1bkFka8hsiCamhjdZGie61qy70xGgPVWPehjTmeN-cj_sfjXKOpv_AG6v7Hy7l5NNIfhORnkE-MDWFzqGt7C18DAOt06JBWKrcQ0bCHw9p9qvTaoV4Z0d7UWxxoLW4SJBra-VSeTiQjjp7GUvW1O2oJZ4YFH2KjYVYnLgVihSBjVrh0guGpYYCg"
          />
          <span className="font-title-md text-title-md font-bold text-primary tracking-tight hidden sm:block">
            Ronnie Care Foundation
          </span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-gutter">
          {navLinks.map((link) => {
            const isHash = link.path.startsWith('/#');
            if (isHash) {
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      handleNavClick(link.path);
                    }
                  }}
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-150 py-1"
                >
                  {link.name}
                </a>
              );
            }
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-label-sm text-label-sm transition-all duration-150 pb-1 ${
                    isActive
                      ? 'text-secondary border-b-2 border-secondary font-semibold'
                      : 'text-on-surface-variant hover:text-primary'
                  }`
                }
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/partner"
            className="font-label-sm text-label-sm px-6 py-2.5 rounded-lg border-2 border-primary text-primary hover:bg-primary/5 active:scale-95 transition-all text-center"
          >
            Partner With Us
          </Link>
          <Link
            to="/donate"
            className="font-label-sm text-label-sm px-6 py-2.5 rounded-lg bg-secondary text-white hover:opacity-90 hover:shadow-md active:scale-95 transition-all text-center font-medium"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden p-2 text-primary rounded-lg hover:bg-surface-variant/50 focus:outline-none transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-surface-variant px-margin-mobile py-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => {
              const isHash = link.path.startsWith('/#');
              if (isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => {
                      if (location.pathname === '/') {
                        e.preventDefault();
                      }
                      handleNavClick(link.path);
                    }}
                    className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary py-2 px-3 rounded-lg hover:bg-surface-container-low transition-colors"
                  >
                    {link.name}
                  </a>
                );
              }
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-label-sm text-label-sm py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-secondary/10 text-secondary font-semibold border-l-4 border-secondary'
                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-surface-variant">
            <Link
              to="/partner"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center font-label-sm text-label-sm px-5 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary/5 transition-colors"
            >
              Partner With Us
            </Link>
            <Link
              to="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center font-label-sm text-label-sm px-5 py-3 rounded-lg bg-secondary text-white hover:opacity-90 transition-opacity font-medium"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
