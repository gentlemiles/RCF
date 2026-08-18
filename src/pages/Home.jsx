import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import homeData from '../content/pages/home.json';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const data = homeData || {};

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-margin-mobile md:px-margin-desktop py-16 md:py-24 max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full w-fit">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span className="font-label-sm text-label-sm font-semibold">
                {data.location_badge || 'Abuja, Nigeria'}
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary leading-tight md:text-display-lg text-headline-lg-mobile whitespace-pre-line">
              {data.hero_title || 'Breaking Barriers.\nEmpowering Families.\nBuilding Futures.'}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
              {data.hero_subtitle || 'Dedicated to advancing healthcare access and WASH initiatives across Nigerian communities. Bridging the gap between clinical excellence and grassroots needs.'}
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link
                to="/our-work"
                className="font-label-sm text-label-sm px-6 py-3 rounded-lg border-2 border-secondary text-secondary hover:bg-secondary/5 transition-all text-center inline-block"
              >
                Our Impact
              </Link>
              <Link
                to="/donate"
                className="font-label-sm text-label-sm px-6 py-3 rounded-lg bg-secondary text-white hover:opacity-90 hover:shadow-lg transition-all text-center inline-block font-medium"
              >
                Donate Now
              </Link>
            </div>
          </div>

          {/* Hero Image with Floating Badge */}
          <div className="relative h-[400px] lg:h-[600px] w-full rounded-xl overflow-hidden shadow-md border border-surface-variant/50">
            <img
              className="w-full h-full object-cover"
              alt="Healthcare worker interacting with family"
              src={data.hero_image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGo_rgld05nN4TxJaiGeCYCZ60hic0BASx7Rh8v58Pk1WONzNarNhPCoBIwX1SXOawJADdznxgOyr6FCv9sxqScmQgI5MXNlGuEJaTWxYlwSYs05viiioOlbllyY4KFUHqOwfAcVOjoVzTq-ruB-QvK4dmPuaxMQ5lYSxoZR5j3xj_N1XkB4Vso8dZF6EBk3EeYFsSdEfj7y175wASz6dUpcVzvoevhzJXl5-UQx0fXMBOX69sgqFK'}
            />
            <div className="absolute bottom-6 left-6 glass-panel p-4 rounded-xl shadow-lg border border-white/40 flex items-center gap-4 animate-bounce-short">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined text-2xl">group</span>
              </div>
              <div>
                <div className="font-title-md text-title-md font-bold text-primary">
                  {data.hero_badge_stat || data.hero_stat_value || '10k+'}
                </div>
                <div className="font-label-sm text-label-sm text-secondary font-semibold">
                  {data.hero_badge_label || data.hero_stat_label || 'Lives Touched'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Bar */}
      <section className="bg-primary px-margin-mobile md:px-margin-desktop py-12 w-full text-white">
        <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          {data?.metrics?.map((metric, idx) => (
            <div key={idx} className="flex flex-col gap-2 pt-4 md:pt-0">
              <span className="font-display-lg text-display-lg text-white font-extrabold tracking-tight">
                {metric.stat || metric.value}
              </span>
              <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Focus Areas */}
      <section className="px-margin-mobile md:px-margin-desktop py-24 bg-surface max-w-container-max mx-auto w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit mb-4">
            <span className="font-label-sm text-label-sm font-semibold">Our Methodology</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4 md:text-headline-lg text-headline-lg-mobile">
            Our Strategic Focus Areas
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Targeted interventions designed to create sustainable health and hygiene improvements in vulnerable communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.focus_areas?.map((area, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-8 rounded-lg shadow-sm border border-surface-variant hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {area.icon || 'medical_services'}
                </span>
              </div>
              <h3 className="font-title-md text-title-md text-primary mb-3 font-semibold">{area.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Campaign */}
      {data?.featured_campaign && (
        <section className="px-margin-mobile md:px-margin-desktop py-16 bg-surface-container-lowest w-full border-y border-surface-variant/60">
          <div className="max-w-container-max mx-auto bg-surface rounded-xl border border-surface-variant shadow-sm overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit mb-6">
                <span className="font-label-sm text-label-sm font-semibold">
                  {data.featured_campaign.tag || data.featured_campaign.badge || 'WASH Project'}
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-4 md:text-headline-lg text-headline-lg-mobile">
                {data.featured_campaign.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
                {data.featured_campaign.description}
              </p>
              <div>
                <Link
                  to={data.featured_campaign.link_url || '/stories'}
                  className="font-label-sm text-label-sm text-secondary inline-flex items-center gap-2 hover:opacity-80 transition-opacity font-semibold"
                >
                  Read Full Story <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 h-64 lg:h-auto min-h-[400px] overflow-hidden">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="School children at clean water station"
                src={data.featured_campaign.image}
              />
            </div>
          </div>
        </section>
      )}

      {/* Contact & Intake Section */}
      <section id="contact" className="px-margin-mobile md:px-margin-desktop py-24 bg-surface max-w-container-max mx-auto w-full scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit mb-4">
              <span className="font-label-sm text-label-sm font-semibold">Connect With Us</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6 md:text-headline-lg text-headline-lg-mobile">
              Get in Touch
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-12 leading-relaxed">
              Whether you're looking to partner, volunteer, or learn more about our initiatives, our team is ready to connect and build impactful solutions together.
            </p>
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-surface-container-lowest rounded-full flex items-center justify-center text-primary shadow-sm border border-surface-variant shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-primary mb-1 font-semibold">Headquarters</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Suite GF16, Anafara Plaza,<br />
                    Gwarinpa, Abuja, Nigeria
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-surface-container-lowest rounded-full flex items-center justify-center text-primary shadow-sm border border-surface-variant shrink-0">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-primary mb-1 font-semibold">Email Us</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">contact@ronniecare.org</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-surface-container-lowest rounded-full flex items-center justify-center text-primary shadow-sm border border-surface-variant shrink-0">
                  <span className="material-symbols-outlined">handshake</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-primary mb-1 font-semibold">Institutional & Grants</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    For institutional partnerships, explore our{' '}
                    <Link to="/partner" className="text-secondary font-semibold hover:underline">
                      Partnership Portal
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-surface-variant">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h3 className="text-xl font-bold text-primary">Message Sent Successfully!</h3>
                <p className="text-on-surface-variant max-w-sm">
                  Thank you for reaching out to the Ronnie Care Foundation. Our operations team will respond within 24–48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 font-label-sm text-label-sm px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary/5"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-label-sm text-label-sm text-primary font-medium" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="rounded-lg border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 font-body-md text-on-background h-12 px-4 transition-all bg-background"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-sm text-label-sm text-primary font-medium" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="rounded-lg border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 font-body-md text-on-background h-12 px-4 transition-all bg-background"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-sm text-label-sm text-primary font-medium" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="rounded-lg border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 font-body-md text-on-background h-12 px-4 transition-all bg-background"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    type="email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-sm text-label-sm text-primary font-medium" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="rounded-lg border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 font-body-md text-on-background p-4 transition-all bg-background"
                    id="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button
                  className="font-label-sm text-label-sm w-full py-4 rounded-lg bg-secondary text-white hover:opacity-90 active:scale-[0.99] transition-all mt-2 font-medium"
                  type="submit"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
