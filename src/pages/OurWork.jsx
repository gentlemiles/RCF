import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ourWorkData from '../content/pages/our-work.json';

export default function OurWork() {
  const data = ourWorkData || {};
  const categories = data?.categories?.length
    ? data.categories
    : ['All Projects', 'Health', 'Education', 'WASH', 'Community'];
    
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const projects = data?.projects || [];

  const filteredProjects =
    activeFilter === 'All Projects'
      ? projects
      : projects.filter((p) => (p.category || '').toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="flex flex-col items-center w-full px-margin-mobile md:px-margin-desktop py-12 md:py-20 gap-16">
      {/* Page Header */}
      <header className="max-w-container-max w-full flex flex-col items-center text-center gap-4">
        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit">
          <span className="font-label-sm text-label-sm font-semibold">Initiatives & Impact</span>
        </div>
        <h1 className="text-display-lg font-display-lg text-primary md:text-display-lg text-headline-lg-mobile font-bold">
          {data.header_title || 'Our Work'}
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          {data.header_subtitle || 'Discover the impact of our programs worldwide. We are dedicated to improving health, education, and living conditions in underserved communities through sustainable initiatives.'}
        </p>
      </header>

      {/* Filters / Navigation */}
      <div className="max-w-container-max w-full flex flex-wrap justify-center gap-3">
        {categories.map((cat, idx) => {
          const catName = typeof cat === 'string' ? cat : cat?.name || '';
          return (
            <button
              key={idx}
              onClick={() => setActiveFilter(catName)}
              className={`px-6 py-2.5 rounded-lg text-label-sm font-label-sm transition-all ${
                activeFilter === catName
                  ? 'bg-primary text-white shadow-sm font-semibold'
                  : 'border-2 border-primary text-primary bg-surface hover:bg-primary/5'
              }`}
            >
              {catName}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="max-w-container-max w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filteredProjects.map((project, idx) => (
          <article
            key={idx}
            className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-surface-variant hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4 bg-surface-dim">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={project.title}
                src={project.image}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-label-sm font-label-sm backdrop-blur-md shadow-sm font-semibold">
                  {project.category}
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-grow gap-4">
              <h3 className="text-title-md font-title-md text-primary font-bold group-hover:text-secondary transition-colors">
                {project.title}
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant flex-grow leading-relaxed">
                {project.description}
              </p>
              <div className="mt-auto pt-4 border-t border-surface-variant">
                <Link
                  to={project.link_url || '/our-work'}
                  className="text-secondary font-label-sm text-label-sm flex items-center gap-2 hover:opacity-80 transition-opacity font-semibold"
                >
                  Learn More{' '}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Impact CTA Banner */}
      <section className="max-w-container-max w-full bg-surface-container-low rounded-2xl p-8 md:p-12 border border-surface-variant flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">Partner With Us on Future Interventions</h2>
          <p className="text-body-md text-on-surface-variant">
            We collaborate with institutional donors, NGOs, and corporate partners to scale our healthcare and WASH solutions across Africa.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 shrink-0">
          <Link
            to="/partner"
            className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-label-sm text-label-sm hover:bg-primary/5 transition-colors font-medium"
          >
            Institutional Inquiries
          </Link>
          <Link
            to="/donate"
            className="px-6 py-3 rounded-lg bg-secondary text-white font-label-sm text-label-sm hover:opacity-90 transition-opacity font-medium"
          >
            Support Directly
          </Link>
        </div>
      </section>
    </div>
  );
}
