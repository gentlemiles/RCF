import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import partnerData from '../content/pages/partner.json';

export default function Partner() {
  const data = partnerData || {};

  // Controlled Component States
  const [organizationName, setOrganizationName] = useState('');
  const [organizationType, setOrganizationType] = useState('Corporate CSR / ESG Division');
  const [contactName, setContactName] = useState('');
  const [designation, setDesignation] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [targetRegion, setTargetRegion] = useState('Abuja & Northern Nigeria');
  const [engagementType, setEngagementType] = useState('Institutional Grant Proposal');
  const [estimatedBudget, setEstimatedBudget] = useState('< $25,000 USD (Pilot / Local)');
  const [attachment, setAttachment] = useState(null);
  const [executiveSummary, setExecutiveSummary] = useState('');

  // UI & Interaction States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (FormSubmit free tier limit)

  const partnershipPillars = data?.pillars || [
    {
      title: 'Corporate CSR Alignment',
      icon: 'corporate_fare',
      description: 'Tailored ESG and CSR impact programs delivering measurable water and healthcare indicators for corporate stakeholders.',
    },
    {
      title: 'Institutional Grants & INGOs',
      icon: 'account_balance',
      description: 'Proven financial stewardship and field implementation capacity for USAID, EU, and foundation-backed public health grants.',
    },
    {
      title: 'Healthcare & Screening Infrastructure',
      icon: 'medical_services',
      description: 'Co-investment for community diagnostic hubs, mobile oncology clinics, and maternal health equipment in underserved areas.',
    },
    {
      title: 'Pharmaceutical & Medical Supply',
      icon: 'sanitizer',
      description: 'Direct logistical channels to distribute cold-chain vaccines, diagnostic tools, and essential medicine to frontline clinics.',
    },
  ];

  const operationalNodes = [
    { name: 'Abuja Headquarters', country: 'Nigeria', role: 'Executive Secretariat & Central Clinic Coordination' },
    { name: 'Ronnie Diagnostic Center', country: 'Abuja', role: 'Clinical Laboratory & Screening Node' },
    { name: 'Middle Belt Field Offices', country: 'Nigeria', role: 'Mobile Clinic Deployment & Rapid Response' },
    { name: 'Northern Rural Corridors', country: 'West Africa', role: 'Community Outreach & Primary Healthcare' },
  ];

  // File Handling
  const handleValidateAndSetFile = (file) => {
    setErrorMessage('');
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('File size exceeds 5MB limit. Please upload a smaller document.');
      return;
    }

    const validExtensions = ['.pdf', '.docx', '.doc'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExtensions.includes(fileExt)) {
      setErrorMessage('Unsupported format. Please attach a PDF or Word document (.pdf, .docx, .doc).');
      return;
    }

    setAttachment(file);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleValidateAndSetFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleValidateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setAttachment(null);
  };

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!organizationName.trim() || !contactName.trim() || !workEmail.trim() || !executiveSummary.trim()) {
      setErrorMessage('Please complete all required fields marked with an asterisk (*).');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // FormSubmit System Controls
      formData.append('_replyto', workEmail);
      formData.append('email', workEmail);
      formData.append('_subject', `[Partnership Proposal] ${organizationName} - ${engagementType}`);
      formData.append('_template', 'table');

      // Document Attachment (Must be named 'attachment')
      if (attachment) {
        formData.append('attachment', attachment);
      }

      // Partner Details
      formData.append('Organization Name', organizationName);
      formData.append('Organization Type', organizationType);
      formData.append('Lead Contact Name', contactName);
      formData.append('Title / Designation', designation);
      formData.append('Official Work Email', workEmail);
      formData.append('Target Geographic Region', targetRegion);
      formData.append('Proposal Type', engagementType);
      formData.append('Estimated Budget / Grant', estimatedBudget);
      formData.append('Executive Summary', executiveSummary);

      const response = await fetch('https://formsubmit.co/ajax/info@ronniecarefoundation.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        // Reset form
        setOrganizationName('');
        setOrganizationType('Corporate CSR / ESG Division');
        setContactName('');
        setDesignation('');
        setWorkEmail('');
        setTargetRegion('Abuja & Northern Nigeria');
        setEngagementType('Institutional Grant Proposal');
        setEstimatedBudget('< $25,000 USD (Pilot / Local)');
        setAttachment(null);
        setExecutiveSummary('');
      } else {
        setErrorMessage('Failed to submit proposal. Please verify your connection or email info@ronniecarefoundation.com directly.');
      }
    } catch (err) {
      setErrorMessage('Failed to submit proposal. Please verify your connection or email info@ronniecarefoundation.com directly.');
    } finally {
      setIsSubmitting(false);
    }
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
            {data.title || 'Partner With Ronnie Care'}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            {data.subtitle || 'We collaborate with institutional grantmakers, corporate CSR initiatives, INGOs, and government ministries to scale clinical outreach, cancer screenings, and sustainable healthcare across Nigeria.'}
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
                <span className="material-symbols-outlined text-2xl">{pillar.icon || 'corporate_fare'}</span>
              </div>
              <h3 className="font-title-md text-base font-bold text-primary mb-2">{pillar.title}</h3>
              <p className="text-body-md text-xs text-on-surface-variant leading-relaxed flex-grow">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Operational Reach Ribbon */}
        <div className="bg-primary text-white rounded-2xl p-8 md:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="max-w-md">
              <span className="text-xs uppercase tracking-widest text-primary-fixed-dim font-bold">Regional Reach</span>
              <h3 className="text-2xl font-bold mt-1 mb-2">Operational Footprint & Clinical Network</h3>
              <p className="text-sm text-on-primary/80 leading-relaxed">
                Strategic presence across Nigeria with certified laboratory affiliation via Ronnie Diagnostic Center, ensuring clinical precision and verified community impact.
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

            {isSuccess ? (
              <div className="py-12 text-center flex flex-col items-center gap-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-3xl">verified</span>
                </div>
                <h3 className="text-2xl font-bold text-primary">Proposal Received Successfully</h3>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 max-w-lg text-emerald-800 text-sm leading-relaxed text-left">
                  <p className="font-semibold mb-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                    Thank you for reaching out!
                  </p>
                  <p>
                    Our executive operations board has received your institutional submission and will review the package within 48 business hours. A confirmation has been routed to <strong>info@ronniecarefoundation.com</strong>.
                  </p>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl border border-surface-variant text-xs text-on-surface-variant mt-2">
                  Proposal Tracking ID: <span className="font-mono font-bold text-primary">PROP-RCF-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-6 py-2.5 rounded-lg border border-primary text-primary font-label-sm hover:bg-primary/5 text-sm font-medium transition-colors cursor-pointer"
                >
                  Submit Another Proposal
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-3 animate-fadeIn">
                    <span className="material-symbols-outlined text-red-600">error</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Organization Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Organization / Entity Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Global Health Fund / Acme Corp CSR"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Organization Type *
                    </label>
                    <select
                      value={organizationType}
                      onChange={(e) => setOrganizationType(e.target.value)}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    >
                      <option value="Corporate CSR / ESG Division">Corporate CSR / ESG Division</option>
                      <option value="Philanthropic Foundation / Family Office">Philanthropic Foundation / Family Office</option>
                      <option value="INGO / Bilateral Development Agency">INGO / Bilateral Development Agency</option>
                      <option value="Government Health Ministry">Government Health Ministry</option>
                      <option value="Academic / Clinical Research Partner">Academic / Clinical Research Partner</option>
                    </select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Lead Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Title / Designation *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Director of Partnerships"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Official Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@organization.org"
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    />
                  </div>
                </div>

                {/* Scope & Parameters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Target Geographic Region
                    </label>
                    <select
                      value={targetRegion}
                      onChange={(e) => setTargetRegion(e.target.value)}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    >
                      <option value="Abuja & Northern Nigeria">Abuja & Northern Nigeria</option>
                      <option value="Middle Belt States (Nigeria)">Middle Belt States (Nigeria)</option>
                      <option value="Southern Nigeria Communities">Southern Nigeria Communities</option>
                      <option value="Pan-Nigeria National Outreach">Pan-Nigeria National Outreach</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Proposal / Engagement Type
                    </label>
                    <select
                      value={engagementType}
                      onChange={(e) => setEngagementType(e.target.value)}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    >
                      <option value="Institutional Grant Proposal">Institutional Grant Proposal</option>
                      <option value="Corporate CSR Sponsorship">Corporate CSR Sponsorship</option>
                      <option value="Oncology & Tumor Screening Campaign">Oncology & Tumor Screening Campaign</option>
                      <option value="Maternal & Fertility Subsidy Fund">Maternal & Fertility Subsidy Fund</option>
                      <option value="In-Kind Diagnostic Equipment & Pharma">In-Kind Diagnostic Equipment & Pharma</option>
                      <option value="Co-Funding Consortium">Co-Funding Consortium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">
                      Estimated Budget / Grant
                    </label>
                    <select
                      value={estimatedBudget}
                      onChange={(e) => setEstimatedBudget(e.target.value)}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                    >
                      <option value="< $25,000 USD (Pilot / Local)">&lt; $25,000 USD (Pilot / Local)</option>
                      <option value="$25,000 - $100,000 USD">$25,000 - $100,000 USD</option>
                      <option value="$100,000 - $500,000 USD">$100,000 - $500,000 USD</option>
                      <option value="$500,000+ USD (Multi-Year Program)">$500,000+ USD (Multi-Year Program)</option>
                    </select>
                  </div>
                </div>

                {/* Drag and Drop File Upload Attachment */}
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">
                    Attach Proposal / Concept Note / Deck (PDF or DOCX, max 5MB)
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all bg-background cursor-pointer ${
                      isDragging
                        ? 'border-secondary bg-secondary/5 ring-2 ring-secondary/20'
                        : 'border-surface-variant hover:border-secondary/60'
                    }`}
                  >
                    <input
                      type="file"
                      id="proposalFile"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="proposalFile" className="cursor-pointer flex flex-col items-center">
                      <span className="material-symbols-outlined text-3xl text-secondary mb-2">upload_file</span>
                      {attachment ? (
                        <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-lg border border-surface-variant">
                          <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                          <div className="text-left text-xs">
                            <p className="font-semibold text-primary">{attachment.name}</p>
                            <p className="text-on-surface-variant">{(attachment.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="p-1 rounded hover:bg-surface-variant text-red-600 ml-2 cursor-pointer"
                            title="Remove attachment"
                          >
                            <span className="material-symbols-outlined text-base">close</span>
                          </button>
                        </div>
                      ) : (
                        <div>
                          <span className="text-sm font-semibold text-primary hover:underline">
                            Click to upload document
                          </span>
                          <span className="text-xs text-on-surface-variant block mt-1">
                            or drag and drop proposal package here (.pdf, .docx, .doc)
                          </span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Scope of Work */}
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">
                    Executive Summary / Scope of Work *
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Briefly describe the program objectives, intended health indicators, target demographic, and timeline..."
                    value={executiveSummary}
                    onChange={(e) => setExecutiveSummary(e.target.value)}
                    className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-sm text-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-secondary text-white font-label-sm font-bold text-base hover:opacity-90 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                      <span>Submitting Proposal...</span>
                    </>
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
