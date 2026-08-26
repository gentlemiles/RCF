import React from 'react';
import { Link } from 'react-router-dom';
import healthData from '../content/pages/health.json';

export default function HealthInitiatives() {
  const data = healthData || {};

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-surface-container-lowest border-b border-surface-variant overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 z-10">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full w-fit">
              <span className="material-symbols-outlined text-sm">health_and_safety</span>
              <span className="font-label-sm text-label-sm font-semibold">
                {data.hero_tag || 'Medical Interventions & Universal Health Coverage'}
              </span>
            </div>
            <h1 className="text-display-lg font-display-lg text-primary leading-tight md:text-display-lg text-headline-lg-mobile font-bold">
              {data.hero_title || 'Equitable Healthcare. Early Detection. Healthier Communities.'}
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed max-w-lg">
              {data.hero_subtitle || 'Delivering free diagnostic screenings, subsidized reproductive & maternal care, and emergency infectious disease outreaches to underserved populations across Abuja and Nigerian communities.'}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                to="/donate"
                className="font-label-sm text-label-sm px-6 py-3 rounded-lg bg-secondary text-white hover:opacity-90 transition-all font-medium shadow-sm"
              >
                Support Clinical Outreaches
              </Link>
              <Link
                to="/partner"
                className="font-label-sm text-label-sm px-6 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary/5 transition-all font-medium"
              >
                Institutional Healthcare Grants
              </Link>
            </div>
          </div>

          <div className="relative h-[380px] lg:h-[520px] w-full rounded-xl overflow-hidden shadow-md border border-surface-variant">
            <img
              alt="Medical screening and healthcare outreach in Nigeria"
              className="w-full h-full object-cover"
              src={data.hero_image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKc7SJg8OpeyMbZpS57ZhQvpi0BU5xiK06f_RNYaHROgRg8kYc1CbEUxvMHiFjUu0qhKQfYLN1C0jDgAcgVZUQr6nN4QBgemtrxrDGv78usHcrp4W6b4QkTumI9ZyhBWIZZQ8Ue1Z3M5ok2ABtL1av3AFB1pgttyhPctVbjHOwhWpod9xFOXRETs2EAfxU6x7BhCgJqlSx9uoZbUlNwxZPxEkn4jnneLWFLU7dkPutGxD1Wnj2Y4gb'}
            />
            <div className="absolute bottom-6 left-6 glass-panel p-4 rounded-xl shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">verified</span>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium">
                  Clinical Standards
                </p>
                <p className="text-sm font-bold text-primary">
                  Precision Diagnostic Care
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Health Metrics Banner */}
      <section className="bg-primary px-margin-mobile md:px-margin-desktop py-12 text-white">
        <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          {data?.stats?.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1 pt-4 md:pt-0">
              <span className="font-display-lg text-display-lg text-white font-extrabold">{stat.value}</span>
              <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Intervention Pillars Grid */}
      <section className="py-24 bg-surface max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit mb-4">
            <span className="font-label-sm text-label-sm font-semibold">Core Healthcare Programs</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4 font-bold md:text-headline-lg text-headline-lg-mobile">
            Strategic Health Interventions
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Targeting the most critical healthcare gaps through proactive screening, specialized fertility and maternal care, and rapid disease prevention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data?.pillars?.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-8 rounded-xl border border-surface-variant shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {pillar.icon || 'medical_services'}
                    </span>
                  </div>
                </div>
                <h3 className="text-title-md font-title-md text-primary font-bold mb-3">{pillar.title}</h3>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-variant/60 flex items-center text-secondary font-label-sm font-semibold text-sm">
                <span>Active Medical Outreach Protocol</span>
                <span className="material-symbols-outlined text-base ml-1">check_circle</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clinical Affiliation Banner (Ronnie Diagnostic Center) */}
      {data?.affiliate_banner && (
        <section className="py-16 bg-surface-container-lowest border-y border-surface-variant">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="bg-surface rounded-2xl border border-surface-variant p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit">
                  <span className="material-symbols-outlined text-sm">biotech</span>
                  <span className="font-label-sm text-label-sm font-semibold">
                    {data.affiliate_banner.badge || 'Diagnostic Center Partner'}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                  {data.affiliate_banner.title || 'In Clinical Affiliation with Ronnie Diagnostic Center, Abuja'}
                </h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  {data.affiliate_banner.description || 'Leveraging state-of-the-art laboratory analysis, ultrasound imaging, and diagnostic equipment to ensure precision clinical standards in every community outreach.'}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to={data.affiliate_banner.link_url || '/partner'}
                    className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1.5 hover:underline"
                  >
                    {data.affiliate_banner.link_text || 'Explore Partnership Opportunities'}{' '}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 flex items-center justify-center p-6 bg-surface-container-low rounded-xl border border-surface-variant text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-3xl">biotech</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-base">Ronnie Diagnostic Center</h4>
                    <p className="text-xs text-on-surface-variant mt-1">Abuja, Nigeria</p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                      Certified Diagnostic Lab
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Action Banner */}
      <section className="py-20 bg-surface text-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <h2 className="text-3xl font-bold text-primary mb-4">Partner with Us to Expand Free Healthcare</h2>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
          Your sponsorship directly funds oncology screenings, fertility grants, diagnostic equipment, and life-saving malaria treatments.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/donate"
            className="px-8 py-3.5 rounded-lg bg-secondary text-white font-label-sm text-label-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
          >
            Donate to Health Initiatives
          </Link>
          <Link
            to="/partner"
            className="px-8 py-3.5 rounded-lg border-2 border-primary text-primary font-label-sm text-label-sm font-semibold hover:bg-primary/5 transition-colors"
          >
            Partner as an Institution
          </Link>
        </div>
      </section>
    </div>
  );
}
