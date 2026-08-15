import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OurWork() {
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const categories = ['All Projects', 'Health', 'Education', 'WASH', 'Community'];

  const projects = [
    {
      id: 1,
      title: 'Community Health Outreach',
      category: 'Health',
      description:
        'Providing essential medical screenings, vaccinations, and maternal care to remote villages lacking access to formal healthcare facilities.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBdqSHfpcswRGBh3Lasy6AAeSCy6kCgcV_IYbp6Su5V_5YZQC7t7Hk-sG0pHxSw-4_g8HHINz4ojVyHHxyZ5Mvn-3-TsIcC2selUUQXT5tjVlZprkKI_5f6IRBnWvInKmOnjjdw5ae9zd2IqN8Q3RCc9dkjpP6hUJhjqlCQVXFOGQb3lSenrCbzvPgKvdv2xzUlRTMANIoIQsN4_odEJSDZ2XbjjDaKayopGjk8m6v9HOpD28iSpnHT',
      link: '/stories',
    },
    {
      id: 2,
      title: 'Rural WASH Infrastructure',
      category: 'WASH',
      description:
        'Building sustainable water, sanitation, and hygiene facilities, including solar-powered wells and latrines, to reduce waterborne diseases.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA3mK85tr6YNdzrZ0Ch0Xk7n7bEXjWR_FfrpSyiq-8RSlxLI-kyHmtjrOHBeU1DmM5y6HnYen2SwQRtDMLP5FxeStdTIK_JYLrW5iMd0hyJ_jKI20rl4fSYoBiD6Bl_VxLOpBFyOykb2Iy9nNwb_VqDErF9dPyvrbDJhqO9CzLptZHJdalRmQERnhw1AxmdQF3CcSbleIQ7O4NkfOLGO_OJtiMWdwnab7XMf7BpjGXCUCBCanbmC8qo',
      link: '/wash',
    },
    {
      id: 3,
      title: 'Vocational Training Centers',
      category: 'Education',
      description:
        'Empowering youth and young adults with practical skills in trades and technology to foster economic independence and community resilience.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD0klL0Ni4Gv_9KUwGObjJfCxgteuFOxTsGVKbNebV49NIC3oQhzaZGwrfVwN9tzNuLTn6C8emcknyOGHgx412VOjE6TB8DRLTvfZOm8SdMXnPGZQKvlBHRBeKsHhFqvFBHD_kdzBaJkpTu-6aOLjW_mKtbMmqiqV9TY2PUPb19llp4y3J5Et7QTNfU4dzHvb9aejQXcc9PErBxl_x8Hfx0sqdhgluAIOGqpD5kmwlK0ybEb3P9E5-n',
      link: '/stories',
    },
    {
      id: 4,
      title: 'Maternal & Child Wellness Clinics',
      category: 'Health',
      description:
        'Dedicated prenatal health checkups, safe delivery kits, and newborn immunization programs across primary health centers.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDKc7SJg8OpeyMbZpS57ZhQvpi0BU5xiK06f_RNYaHROgRg8kYc1CbEUxvMHiFjUu0qhKQfYLN1C0jDgAcgVZUQr6nN4QBgemtrxrDGv78usHcrp4W6b4QkTumI9ZyhBWIZZQ8Ue1Z3M5ok2ABtL1av3AFB1pgttyhPctVbjHOwhWpod9xFOXRETs2EAfxU6x7BhCgJqlSx9uoZbUlNwxZPxEkn4jnneLWFLU7dkPutGxD1Wnj2Y4gb',
      link: '/stories',
    },
    {
      id: 5,
      title: 'School Sanitation & Hygiene Hubs',
      category: 'WASH',
      description:
        'Modern handwashing stations, clean water filtration, and hygiene training curricula empowering over 15 school districts.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCOTJ1ZQ7Gr0-A_TUgsWE1NHdbn6KZ0j9HR9-mlqIJtTqSYtbXTEXDrwsoiNEkC_yFPWC0ytmQ1_aS-9l3jI69_ma0o8VxAW6SoT1VEqN6pnY0l-BEsO2Gc0EgQVA7WaHPPUOy-B-vVI_D_VqM4aTZic1Zv4OQo5ayRKtg_7Tt6H8kApJNWJcuThMyTJ3pO4MKDBLMgknypXw7EmkR9gLR3MXlEZl3FtNTo1n44-eP6x_uGB7pOHagt',
      link: '/wash',
    },
    {
      id: 6,
      title: 'Emergency Relief & Nutrition Support',
      category: 'Community',
      description:
        'Deploying rapid nutrition packages and emergency aid to families displaced or affected by environmental and economic shocks.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCvUKIX2rxg9GVXOLokJq0L9sACbeiugv7esVfEmf7AuBIjYX2RY435tv4er3RqFFWBAwONnKyOSsJrh2bHkpnwaQVpu5yVS-G4HGmujE5pnsAHMKAynyefnJyAumAOyaepXPnjpFZ0noaK-G3THvKWDGe4qRBPGbUWdjgOhZxnU78ijBD9eVNzoUkMKK6zrK7oejNh12AM6y8z0kN2IsoRCAEYnbw4RXIVxJR9LCggWlx0E6Locx-f',
      link: '/stories',
    },
  ];

  const filteredProjects =
    activeFilter === 'All Projects'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="flex flex-col items-center w-full px-margin-mobile md:px-margin-desktop py-12 md:py-20 gap-16">
      {/* Page Header */}
      <header className="max-w-container-max w-full flex flex-col items-center text-center gap-4">
        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit">
          <span className="font-label-sm text-label-sm font-semibold">Initiatives & Impact</span>
        </div>
        <h1 className="text-display-lg font-display-lg text-primary md:text-display-lg text-headline-lg-mobile font-bold">
          Our Work
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Discover the impact of our programs worldwide. We are dedicated to improving health, education, and living conditions in underserved communities through sustainable initiatives.
        </p>
      </header>

      {/* Filters / Navigation */}
      <div className="max-w-container-max w-full flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2.5 rounded-lg text-label-sm font-label-sm transition-all ${
              activeFilter === cat
                ? 'bg-primary text-white shadow-sm font-semibold'
                : 'border-2 border-primary text-primary bg-surface hover:bg-primary/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="max-w-container-max w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
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
                  to={project.link}
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
