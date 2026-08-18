import React from 'react';
import { Link } from 'react-router-dom';
import aboutData from '../content/pages/about.json';

export default function About() {
  const data = aboutData || {};

  const storyParagraphs = data?.story_paragraphs || [
    'The Ronnie Care Foundation was born out of a profound need to address the systemic disparities in healthcare and sanitation access within underserved regions. What began as a localized effort to provide essential medical supplies has rapidly evolved into a comprehensive network of care, reaching numerous communities across Nigeria and West Africa.',
    'Our journey has been defined by collaborative partnerships with local leaders, international health organizations, and a dedicated team of medical professionals. Together, we are building resilient health infrastructure and pioneering sustainable Water, Sanitation, and Hygiene (WASH) programs that save lives and foster long-term community well-being.'
  ];

  const leadershipTeam = [
    {
      name: 'Dr. Amina Bello',
      title: 'Executive Director',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbsHUJoRth0RD5EptE7Btk2n0TARJIku8P6dBeuNa_g7jHevIz-ZoY_ueUQH2oPvZSN4TUULBK-cB4NPIrhBdUz1NEwl8KSTe-RSSq2hr0Ypq8JV1h6KTuJEAwUONYLiLF-GfuPeXgBpms0rm1hwYirxfSnRdtvVwpfCLryELpR8bK7KvIZE77RT_wbc3amH3SPmv3MrHAdcDLAqCl-nIEBg9NqOlI7S__libhW0odoAuIz7Et8e7t',
      bio: 'With over 15 years in public health, Dr. Bello leads our strategic initiatives across West Africa.',
    },
    {
      name: 'Samuel Ojo',
      title: 'Director of Operations',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvFjMPiEslAjfCSVLg4B3jaL7yHoHKsnZi2pEzBJsnIp1bu0eUC3ZqJuJ8xiMaaA99dIyevY92f72rG95IXWeqgXI0QO1FSuY7tncHPhPLc9-Ljv6_4Z5Nonh5vkir9YOdB2b3RvWO6wuf6aQvLHSpj46u0V2ROjweElBMH9IyevSZTr1KKyKrkt1X59XpwXiKqMyUn42uGveec3h-2Gsie62d-gxwRyJu5WQSIPcQ-ceeEcHfI6e-',
      bio: 'Samuel oversees the logistics and on-ground implementation of our WASH and clinic programs.',
    },
    {
      name: 'Dr. Chioma Nnadi',
      title: 'Chief Medical Officer',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ90VRYxZvnvm-uesgYTFGW0wxdqpYpIjLHMbKpwPq6HJxObvV1nCKArM1SAiaABCoQMMzAMygZAkIhIKMdYtLlkeyoPobzjSM5GtMxY-LCf-8-1uaTNiwc00N4pjCzwL0L9BDb-PPCrMK9iPYfn6j2roh7_m-FE3O8LIj-2R4iiRbRCxGx4CztAtsGuLuLVDKGLYY15RFiv9-GONO_-5NB3VDr4rfPcRspVJtqHTEdyKbC93aQ_0O',
      bio: 'Dr. Nnadi coordinates all clinical outreach and ensures standard-of-care protocols are met.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-surface-container-lowest overflow-hidden border-b border-surface-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="z-10 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit">
              <span className="font-label-sm text-label-sm font-semibold">
                {data.hero_badge || 'About Our Foundation'}
              </span>
            </div>
            <h1 className="text-display-lg font-display-lg text-primary md:text-display-lg md:font-display-lg text-headline-lg-mobile font-headline-lg-mobile leading-tight">
              {data.hero_title || 'Dedicated to advancing healthcare and WASH initiatives across Nigerian communities.'}
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg leading-relaxed">
              {data.hero_subtitle || 'We believe that access to basic healthcare and clean water is a fundamental human right. Our mission is to bridge the gap and deliver sustainable solutions to those who need them most.'}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="#our-story"
                className="font-label-sm text-label-sm px-6 py-3 rounded-lg border-2 border-secondary text-secondary hover:bg-secondary/5 transition-all text-center inline-block"
              >
                Learn More
              </a>
              <Link
                to="/donate"
                className="font-label-sm text-label-sm px-6 py-3 rounded-lg bg-secondary text-white hover:opacity-90 transition-opacity font-medium"
              >
                Support Our Mission
              </Link>
            </div>
          </div>
          <div className="relative h-[380px] lg:h-[550px] w-full rounded-xl overflow-hidden shadow-sm border border-surface-variant">
            <img
              alt="Healthcare workers in community"
              className="absolute inset-0 w-full h-full object-cover"
              src={data.hero_image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKc7SJg8OpeyMbZpS57ZhQvpi0BU5xiK06f_RNYaHROgRg8kYc1CbEUxvMHiFjUu0qhKQfYLN1C0jDgAcgVZUQr6nN4QBgemtrxrDGv78usHcrp4W6b4QkTumI9ZyhBWIZZQ8Ue1Z3M5ok2ABtL1av3AFB1pgttyhPctVbjHOwhWpod9xFOXRETs2EAfxU6x7BhCgJqlSx9uoZbUlNwxZPxEkn4jnneLWFLU7dkPutGxD1Wnj2Y4gb'}
            />
          </div>
        </div>
        {/* Skewed decorative background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-fixed opacity-10 transform skew-x-12 -z-0 pointer-events-none"></div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-24 bg-surface max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit mb-6">
            <span className="font-label-sm text-label-sm font-semibold">
              {data.story_badge || 'Our History'}
            </span>
          </div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-8 md:text-headline-lg text-headline-lg-mobile font-bold">
            {data.story_title || 'Our Story'}
          </h2>
          <div className="text-body-md font-body-md text-on-surface-variant space-y-6 text-left leading-relaxed">
            {storyParagraphs.map((p, idx) => {
              const text = typeof p === 'string' ? p : p?.paragraph || '';
              return <p key={idx}>{text}</p>;
            })}
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-24 bg-surface-container-low/40 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop border-t border-surface-variant w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision Card */}
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-lg shadow-sm border border-surface-variant hover:shadow-md transition-shadow group flex flex-col items-start">
            <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                visibility
              </span>
            </div>
            <h3 className="text-title-md font-title-md text-primary mb-4 font-bold">
              {data.vision_title || 'Our Vision'}
            </h3>
            <p className="text-body-md font-body-md text-on-surface-variant flex-grow leading-relaxed">
              {data.vision || data.vision_text || 'To create a future where equitable access to quality healthcare and clean water is universally guaranteed, empowering communities to thrive and reach their full potential without the burden of preventable diseases.'}
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-lg shadow-sm border border-surface-variant hover:shadow-md transition-shadow group flex flex-col items-start">
            <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                flag
              </span>
            </div>
            <h3 className="text-title-md font-title-md text-primary mb-4 font-bold">
              {data.mission_title || 'Our Mission'}
            </h3>
            <p className="text-body-md font-body-md text-on-surface-variant flex-grow leading-relaxed">
              {data.mission || data.mission_text || 'To design and implement innovative, sustainable healthcare and WASH interventions. We strive to strengthen local health systems, provide immediate relief, and deliver continuous education to foster resilient, self-sufficient communities.'}
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team Grid */}
      <section className="py-24 bg-surface max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop border-t border-surface-variant w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit mb-4">
            <span className="font-label-sm text-label-sm font-semibold">Governance & Care</span>
          </div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4 md:text-headline-lg text-headline-lg-mobile font-bold">
            Our Leadership
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Guided by experienced professionals dedicated to transformative impact, high clinical standards, and transparent governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadershipTeam.map((member, idx) => (
            <div
              key={idx}
              className="group relative bg-surface-container-lowest rounded-lg border border-surface-variant shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-64 bg-surface-dim overflow-hidden relative">
                <img
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={member.image}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-title-md font-title-md text-primary mb-1 font-bold">{member.name}</h4>
                <p className="text-label-sm font-label-sm text-secondary font-semibold mb-3">{member.title}</p>
                <p className="text-body-md font-body-md text-on-surface-variant line-clamp-3 leading-relaxed flex-grow">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
