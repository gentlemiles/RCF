import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import storiesData from '../content/pages/stories.json';

export default function Stories() {
  const data = storiesData || {};
  const [activeCategory, setActiveCategory] = useState('All Stories');
  const [selectedStory, setSelectedStory] = useState(null);

  const categories = [
    'All Stories',
    'Success Story',
    'Field Report',
    'WASH Update',
    'Medical Care',
  ];

  const featuredStory = data?.featured_story;
  const storiesList = data?.stories || [];

  // Combine featured story with standard list for filtering if needed
  const allStories = featuredStory ? [featuredStory, ...storiesList] : storiesList;

  const filteredStories =
    activeCategory === 'All Stories'
      ? allStories
      : allStories.filter((s) => (s.category || '').toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-surface-container-low py-16 md:py-24 border-b border-surface-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full w-fit mb-4">
            <span className="font-label-sm text-label-sm font-semibold">Voices from the Field</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-primary mb-4 font-bold md:text-display-lg text-headline-lg-mobile">
            {data.header_title || 'Field Stories'}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {data.header_subtitle || 'Real stories from the communities we serve. Discover the impact of our healthcare and WASH initiatives across the region.'}
          </p>
        </div>
      </section>

      {/* Main Content Canvas */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 w-full">
        {/* Filter / Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-lg font-label-sm text-label-sm transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-sm font-semibold'
                  : 'bg-surface text-primary border-2 border-primary hover:bg-primary/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid / Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[minmax(220px,_auto)]">
          {/* Featured Story (Hero card) */}
          {filteredStories.length > 0 && (
            <article
              onClick={() => setSelectedStory(filteredStories[0])}
              className="md:col-span-8 md:row-span-2 group cursor-pointer relative overflow-hidden rounded-xl border border-surface-variant bg-surface flex flex-col justify-end min-h-[420px] md:min-h-full shadow-sm hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 z-0">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={filteredStories[0].title}
                  src={filteredStories[0].image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/95 via-inverse-surface/50 to-transparent"></div>
              </div>
              <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-primary-container text-white px-3.5 py-1 rounded-full font-label-sm text-xs font-semibold">
                    {filteredStories[0].category}
                  </span>
                  {filteredStories[0].date && (
                    <time className="text-surface-variant font-label-sm text-xs">{filteredStories[0].date}</time>
                  )}
                  {filteredStories[0].location && (
                    <span className="text-surface-variant font-label-sm text-xs">• {filteredStories[0].location}</span>
                  )}
                </div>
                <h2 className="font-headline-lg text-headline-lg text-white mb-3 group-hover:text-primary-fixed-dim transition-colors font-bold text-2xl md:text-3xl">
                  {filteredStories[0].title}
                </h2>
                <p className="font-body-md text-body-md text-surface-variant line-clamp-2 mb-4 max-w-3xl leading-relaxed">
                  {filteredStories[0].summary}
                </p>
                <div className="flex items-center text-primary-fixed-dim font-label-sm text-sm font-semibold group-hover:underline">
                  Read full dispatch <span className="material-symbols-outlined ml-1 text-base">arrow_forward</span>
                </div>
              </div>
            </article>
          )}

          {/* Secondary Cards */}
          {filteredStories.slice(1).map((story, idx) => (
            <article
              key={idx}
              onClick={() => setSelectedStory(story)}
              className="md:col-span-4 group cursor-pointer rounded-xl border border-surface-variant bg-surface-container-lowest overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-1 transition-all"
            >
              {story.image ? (
                <div className="h-48 overflow-hidden relative bg-surface-dim">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={story.title}
                    src={story.image}
                  />
                </div>
              ) : (
                <div className="h-24 bg-surface-container-low flex items-center px-6">
                  <span className="material-symbols-outlined text-3xl text-secondary">feed</span>
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-label-sm text-xs font-semibold">
                      {story.category}
                    </span>
                  </div>
                  <h3 className="font-title-md text-title-md text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-2 font-bold">
                    {story.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4 text-sm leading-relaxed">
                    {story.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-surface-variant text-xs text-on-surface-variant">
                  <time className="font-label-sm">{story.date}</time>
                  <span className="material-symbols-outlined text-secondary text-base group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-surface-variant shadow-2xl p-6 md:p-8 relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-surface-variant/40 hover:bg-surface-variant text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {selectedStory.image && (
              <div className="h-64 rounded-xl overflow-hidden mb-6 bg-surface-dim">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-label-sm text-xs font-semibold">
                {selectedStory.category}
              </span>
              {selectedStory.date && (
                <span className="text-on-surface-variant font-label-sm text-xs">{selectedStory.date}</span>
              )}
              {selectedStory.location && (
                <span className="text-on-surface-variant font-label-sm text-xs">• {selectedStory.location}</span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-primary mb-4">{selectedStory.title}</h2>
            <p className="text-body-md text-on-surface-variant font-medium mb-4 italic leading-relaxed">
              "{selectedStory.summary}"
            </p>
            <div className="text-body-md text-on-surface leading-relaxed space-y-4 pt-4 border-t border-surface-variant">
              <p>{selectedStory.fullText || selectedStory.summary}</p>
              <p>
                Every field outcome is made possible through generous donors and committed on-ground partners. Together, we continue expanding our reach to vulnerable families across the region.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-surface-variant flex justify-end gap-4">
              <button
                onClick={() => setSelectedStory(null)}
                className="px-5 py-2.5 rounded-lg border border-primary text-primary font-label-sm font-medium hover:bg-primary/5"
              >
                Close
              </button>
              <Link
                to="/donate"
                className="px-5 py-2.5 rounded-lg bg-secondary text-white font-label-sm font-medium hover:opacity-90"
              >
                Support Similar Work
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
