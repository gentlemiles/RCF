import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Partner() {
  const [formData, setFormData] = useState({
    orgName: '',
    orgType: 'Corporate CSR',
    contactName: '',
    jobTitle: '',
    email: '',
    phone: '',
    region: 'Abuja & Northern Nigeria',
    proposalType: 'Grant Proposal',
    budgetRange: '$50,000 - $200,000',
    timeline: '3 - 6 Months',
    message: '',
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const partnershipPillars = [
    {
      title: 'Corporate CSR Alignment',
      icon: 'corporate_fare',
      desc: 'Tailored ESG and CSR impact programs delivering measurable water and healthcare indicators for corporate stakeholders.',
    },
    {
      title: 'Institutional Grants & INGOs',
      icon: 'account_balance',
      desc: 'Proven financial stewardship and field implementation capacity for USAID, EU, and foundation-backed public health grants.',
    },
    {
      title: 'WASH Infrastructure Co-Funding',
      icon: 'water_drop',
      desc: 'Capital co-investment for community-scale solar boreholes, school hygiene facilities, and municipal sanitation nodes.',
    },
    {
      title: 'Pharmaceutical & Medical Supply',
      icon: 'medical_services',
      desc: 'Direct logistical channels to distribute cold-chain vaccines, diagnostic tools, and essential medicine to frontline clinics.',
    },
  ];

  const operationalNodes = [
    { name: 'Abuja Headquarters', country: 'Nigeria', role: 'Executive Secretariat & Central Clinic Coordination' },
    { name: 'Tamale Regional Hub', country: 'Ghana', role: 'Cross-Border WASH Technical & Training Node' },
    { name: 'Middle Belt Field Offices', country: 'Nigeria', role: 'Mobile Clinic Deployment & Rapid Response' },
    { name: 'Northern Sahel Corridor', country: 'West Africa', role: 'Solar Water Infrastructure & Pastoral Outreach' },
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-surface-container-low py-16 md:py-24 border-b border-surface-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1 rounded-full w-fit mb-4">
            <span className="material-symbols-outlined text-sm">handshake</span>
            <span className="font-label-sm text-label-sm font-semibold">Institutional & Strategic Alliances</span>
          </div>
          <h1 className="text-display-lg font-display-lg text-primary font-bold md:text-display-lg text-headline-lg-mobile mb-4">
            Partner With Ronnie Care
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            We collaborate with institutional grantmakers, corporate CSR initiatives, INGOs, and government ministries to scale clinical outreach and sustainable WASH systems across West Africa.
          </p>
        </div>
      </section>

      {/* Operational Footprint & Pillars */}
      <section className="py-16 bg-surface max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partnershipPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
              </div>
              <h3 className="font-title-md text-base font-bold text-primary mb-2">{pillar.title}</h3>
              <p className="text-body-md text-xs text-on-surface-variant leading-relaxed flex-grow">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Operational Reach Ribbon */}
        <div className="bg-primary text-white rounded-2xl p-8 md:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="max-w-md">
              <span className="text-xs uppercase tracking-widest text-primary-fixed-dim font-bold">Regional Reach</span>
              <h3 className="text-2xl font-bold mt-1 mb-2">Cross-Border Operational Footprint</h3>
              <p className="text-sm text-on-primary/80 leading-relaxed">
                Strategic presence spanning Nigeria to Ghana, ensuring compliance, local community buy-in, and real-time monitoring.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              {operationalNodes.map((node, idx) => (
                <div key={idx} className="bg-white/10 p-4 rounded-xl border border-white/15">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary-fixed text-sm">location_on</span>
                    <span className="font-bold text-sm text-white">{node.name}</span>
                  </div>
                  <p className="text-xs text-on-primary/70 mt-1">{node.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Intake Form Section */}
      <section className="py-16 bg-surface-container-low/50 border-t border-surface-variant w-full">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl border border-surface-variant shadow-md">
            
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Institutional Proposal & Grant Intake</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Submit a funding proposal, CSR collaboration request, or in-kind technical partnership. Our executive operations board reviews institutional submissions within 48 business hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center gap-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">verified</span>
                </div>
                <h3 className="text-2xl font-bold text-primary">Proposal Received Successfully</h3>
                <p className="text-on-surface-variant max-w-lg text-sm leading-relaxed">
                  Thank you, <strong className="text-primary">{formData.contactName}</strong> from{' '}
                  <strong className="text-primary">{formData.orgName}</strong>. Our partnerships team has logged your{' '}
                  <strong className="text-secondary">{formData.proposalType}</strong> and will contact you at{' '}
                  <strong className="text-primary">{formData.email}</strong>.
                </p>
                <div className="p-4 bg-surface-container-low rounded-xl border border-surface-variant text-xs text-on-surface-variant">
                  Proposal Tracking ID: <span className="font-mono font-bold text-primary">PROP-RCF-2024-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-lg border border-primary text-primary font-label-sm hover:bg-primary/5 text-sm"
                >
                  Submit Another Proposal
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Org Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">Organization / Entity Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Global Health Fund / Acme Corp CSR"
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">Organization Type *</label>
                    <select
                      value={formData.orgType}
                      onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    >
                      <option value="Corporate CSR">Corporate CSR / ESG Division</option>
                      <option value="Philanthropic Foundation">Philanthropic Foundation / Family Office</option>
                      <option value="INGO / Multilateral">INGO / Bilateral Development Agency</option>
                      <option value="Government Ministry">Government Health / Water Ministry</option>
                      <option value="Academic Institution">Academic / Clinical Research Partner</option>
                    </select>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">Lead Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">Title / Designation *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Director of Partnerships"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">Official Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@organization.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    />
                  </div>
                </div>

                {/* Scope & Parameters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">Target Geographic Region</label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    >
                      <option value="Abuja & Northern Nigeria">Abuja & Northern Nigeria</option>
                      <option value="Middle Belt States">Middle Belt States (Nigeria)</option>
                      <option value="Tamale & Northern Ghana">Tamale & Northern Ghana</option>
                      <option value="Pan-West Africa Corridor">Pan-West Africa Regional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">Proposal / Engagement Type</label>
                    <select
                      value={formData.proposalType}
                      onChange={(e) => setFormData({ ...formData, proposalType: e.target.value })}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    >
                      <option value="Grant Proposal">Institutional Grant Proposal</option>
                      <option value="Corporate CSR Sponsorship">Corporate CSR Sponsorship</option>
                      <option value="WASH Station Construction">Dedicated WASH Infrastructure</option>
                      <option value="In-Kind Medical Consumables">In-Kind Equipment & Pharmaceuticals</option>
                      <option value="Co-Funding Consortium">Co-Funding Consortium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">Estimated Grant / Budget</label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    >
                      <option value="<$25,000">&lt; $25,000 USD (Pilot / Local)</option>
                      <option value="$25,000 - $100,000">$25,000 - $100,000 USD</option>
                      <option value="$100,000 - $500,000">$100,000 - $500,000 USD</option>
                      <option value="$500,000+">$500,000+ USD (Multi-Year Program)</option>
                    </select>
                  </div>
                </div>

                {/* File Upload Attachment */}
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">
                    Attach Proposal / Concept Note / Deck (PDF or DOCX, max 25MB)
                  </label>
                  <div className="border-2 border-dashed border-surface-variant rounded-xl p-6 text-center hover:border-secondary/60 transition-colors bg-background">
                    <input
                      type="file"
                      id="proposalFile"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="proposalFile" className="cursor-pointer flex flex-col items-center">
                      <span className="material-symbols-outlined text-3xl text-secondary mb-2">upload_file</span>
                      {uploadedFile ? (
                        <div className="text-sm font-semibold text-primary flex items-center gap-2">
                          <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                          {uploadedFile.name} ({(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB)
                        </div>
                      ) : (
                        <div>
                          <span className="text-sm font-semibold text-primary hover:underline">Click to upload file</span>
                          <span className="text-xs text-on-surface-variant block mt-1">or drag and drop your proposal package</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Scope of Work */}
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Executive Summary / Scope of Work *</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Briefly describe the program goals, expected KPIs, and intended target populations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-secondary text-white font-label-sm font-bold text-base hover:opacity-90 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing Submission...</span>
                  ) : (
                    <>
                      <span>Submit Strategic Proposal</span>
                      <span className="material-symbols-outlined text-sm">send</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
