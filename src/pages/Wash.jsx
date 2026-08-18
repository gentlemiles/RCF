import React from 'react';
import { Link } from 'react-router-dom';
import washData from '../content/pages/wash.json';

export default function Wash() {
  const data = washData || {};

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-surface-container-lowest border-b border-surface-variant overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 z-10">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full w-fit">
              <span className="material-symbols-outlined text-sm">water_full</span>
              <span className="font-label-sm text-label-sm font-semibold">
                {data.hero_badge || 'Sustainable WASH Infrastructure'}
              </span>
            </div>
            <h1 className="text-display-lg font-display-lg text-primary leading-tight md:text-display-lg text-headline-lg-mobile font-bold">
              {data.hero_title || 'Clean Water. Dignified Sanitation. Healthier Generations.'}
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed max-w-lg">
              {data.hero_description || data.hero_subtitle || 'Access to safe water and sanitation is foundational to reducing child mortality, advancing girls\' education, and unlocking economic vitality in Nigerian communities.'}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                to="/donate"
                className="font-label-sm text-label-sm px-6 py-3 rounded-lg bg-secondary text-white hover:opacity-90 transition-all font-medium shadow-sm"
              >
                Sponsor a Water Station
              </Link>
              <Link
                to="/partner"
                className="font-label-sm text-label-sm px-6 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary/5 transition-all font-medium"
              >
                Institutional WASH Grants
              </Link>
            </div>
          </div>

          <div className="relative h-[380px] lg:h-[520px] w-full rounded-xl overflow-hidden shadow-md border border-surface-variant">
            <img
              alt="Solar-powered clean water pump in village"
              className="w-full h-full object-cover"
              src={data.hero_bg_image || data.hero_image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3mK85tr6YNdzrZ0Ch0Xk7n7bEXjWR_FfrpSyiq-8RSlxLI-kyHmtjrOHBeU1DmM5y6HnYen2SwQRtDMLP5FxeStdTIK_JYLrW5iMd0hyJ_jKI20rl4fSYoBiD6Bl_VxLOpBFyOykb2Iy9nNwb_VqDErF9dPyvrbDJhqO9CzLptZHJdalRmQERnhw1AxmdQF3CcSbleIQ7O4NkfOLGO_OJtiMWdwnab7XMf7BpjGXCUCBCanbmC8qo'}
            />
            <div className="absolute bottom-6 left-6 glass-panel p-4 rounded-xl shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">verified</span>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium">
                  {data.cert_title || 'Water Quality'}
                </p>
                <p className="text-sm font-bold text-primary">
                  {data.cert_subtitle || 'WHO Standard Certified'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Metrics Banner */}
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

      {/* Strategic Pillars Grid */}
      <section className="py-24 bg-surface max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit mb-4">
            <span className="font-label-sm text-label-sm font-semibold">Comprehensive Framework</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4 font-bold md:text-headline-lg text-headline-lg-mobile">
            Our 4-Pillar WASH Model
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            We don't just dig wells; we establish permanent, community-owned infrastructure with maintenance systems and health education.
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
                      {pillar.icon || 'water_drop'}
                    </span>
                  </div>
                  {pillar.stat && (
                    <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-xs px-3 py-1 rounded-full font-semibold">
                      {pillar.stat}
                    </span>
                  )}
                </div>
                <h3 className="text-title-md font-title-md text-primary font-bold mb-3">{pillar.title}</h3>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-variant/60 flex items-center text-secondary font-label-sm font-semibold text-sm">
                <span>Active Field Protocol</span>
                <span className="material-symbols-outlined text-base ml-1">check_circle</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured WASH Case Study */}
      <section className="py-16 bg-surface-container-lowest border-y border-surface-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-surface rounded-2xl border border-surface-variant p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit">
                <span className="font-label-sm text-label-sm font-semibold">Spotlight Impact</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Global Handwashing Day & School Hygiene Overhaul
              </h2>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                In 2023, Ronnie Care Foundation deployed touch-free handwashing stations across schools in Abuja, providing soap, safe drainage, and interactive hygiene training. Teacher reports recorded an immediate 40% decline in stomach illnesses and improved regular school attendance.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/stories"
                  className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1.5 hover:underline"
                >
                  Read the Full Field Story <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 h-72 rounded-xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Students learning hygiene practices"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOTJ1ZQ7Gr0-A_TUgsWE1NHdbn6KZ0j9HR9-mlqIJtTqSYtbXTEXDrwsoiNEkC_yFPWC0ytmQ1_aS-9l3jI69_ma0o8VxAW6SoT1VEqN6pnY0l-BEsO2Gc0EgQVA7WaHPPUOy-B-vVI_D_VqM4aTZic1Zv4OQo5ayRKtg_7Tt6H8kApJNWJcuThMyTJ3pO4MKDBLMgknypXw7EmkR9gLR3MXlEZl3FtNTo1n44-eP6x_uGB7pOHagt"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Action Banner */}
      <section className="py-20 bg-surface text-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <h2 className="text-3xl font-bold text-primary mb-4">Transform a Community’s Water Supply Today</h2>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
          Your sponsorship directly funds borehole construction, filtration systems, and community caretaker training.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/donate"
            className="px-8 py-3.5 rounded-lg bg-secondary text-white font-label-sm text-label-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
          >
            Donate to WASH Projects
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
