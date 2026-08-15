import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
      <ScrollToTop />
      <Header />
      <main className="flex-grow pt-20 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
