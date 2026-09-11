import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import donateData from '../content/pages/donate.json';

export default function Donate() {
  const data = donateData || {};
  const [step, setStep] = useState(1);
  const [frequency, setFrequency] = useState('one-time');
  const [currency, setCurrency] = useState('NGN');
  const [selectedAmount, setSelectedAmount] = useState('75000');
  const [customAmount, setCustomAmount] = useState('');
  const [designation, setDesignation] = useState('Where Needed Most');

  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isAnonymous: false,
    isDedication: false,
    dedicationName: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [receiptFile, setReceiptFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Stanbic IBTC Account Registry
  const stanbicAccounts = {
    NGN: { name: 'Ronnie Care Foundation', bank: 'Stanbic IBTC', number: '0047270463', label: 'Naira Account' },
    USD: { name: 'Ronnie Care Foundation', bank: 'Stanbic IBTC', number: '0047270487', label: 'USD Cash Inflow' },
    GBP: { name: 'Ronnie Care Foundation', bank: 'Stanbic IBTC', number: '0047270535', label: 'GBP Cash Inflow' },
    EUR: { name: 'Ronnie Care Foundation', bank: 'Stanbic IBTC', number: '0047270470', label: 'EUR Cash Inflow' }
  };

  const currencySymbols = {
    USD: '$',
    NGN: '₦',
    GBP: '£',
    EUR: '€',
  };

  const presetAmounts = {
    USD: ['25', '50', '100', '250', '500'],
    NGN: ['15000', '35000', '75000', '150000', '300000'],
    GBP: ['20', '40', '80', '200', '400'],
    EUR: ['25', '50', '100', '250', '500'],
  };

  const impactBreakdown = data?.impact_tiers || [
    {
      amount: '$25',
      amountNGN: '₦15,000',
      amountGBP: '£20',
      amountEUR: '€25',
      title: 'Clean Water for a Child',
      impact: 'Provides water testing, sanitation supplies, and hygiene kit for one student for an entire academic year.',
    },
    {
      amount: '$50',
      amountNGN: '₦35,000',
      amountGBP: '£40',
      amountEUR: '€50',
      title: 'Maternal Care Pack',
      impact: 'Funds sanitized birth delivery kits and prenatal screenings for expectant mothers at community outreach clinics.',
    },
    {
      amount: '$100',
      amountNGN: '₦75,000',
      amountGBP: '£80',
      amountEUR: '€100',
      title: 'Mobile Clinic Outreach',
      impact: 'Subsidizes essential pharmaceuticals, malaria diagnostics, and cold-chain vaccines for an entire remote village.',
    },
    {
      amount: '$250',
      amountNGN: '₦150,000',
      amountGBP: '£200',
      amountEUR: '€250',
      title: 'School Sanitation Station',
      impact: 'Co-sponsors a multi-tap touchless handwashing hub with sustainable greywater drainage at a public school.',
    },
  ];

  const finalAmount = customAmount || selectedAmount;

  // Paystack Hook Integration
  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: donorInfo.email || 'donor@ronniecare.org',
    amount: Math.round(parseFloat(finalAmount || 1000) * 100), // converted to kobo/cents
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_89ac33f2869d0bf57be9391a3b6ccd4f0c0b22a6',
    currency: currency,
    metadata: {
      custom_fields: [
        { display_name: "Donor Name", variable_name: "donor_name", value: `${donorInfo.firstName} ${donorInfo.lastName}`.trim() || 'Anonymous Donor' },
        { display_name: "Designation", variable_name: "designation", value: designation }
      ]
    }
  };

  const initializePaystack = usePaystackPayment(paystackConfig);

  const handlePaystackPayment = () => {
    initializePaystack(
      (reference) => {
        setIsSuccess(true);
      },
      () => {
        // Modal closed by user
      }
    );
  };

  // Manual Transfer Receipt Submission Handler
  const handleManualReceiptSubmit = async (e) => {
    e.preventDefault();
    if (!receiptFile) {
      setUploadError('Please attach your payment receipt or transfer screenshot.');
      return;
    }
    setIsUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('donorName', `${donorInfo.firstName} ${donorInfo.lastName}`);
      formData.append('donorEmail', donorInfo.email);
      formData.append('amount', finalAmount);
      formData.append('currency', currency);
      formData.append('designation', designation);
      formData.append('receipt', receiptFile);

      const res = await fetch('https://netlify-cms-github-oauth-provider-rho.vercel.app/api/send-receipt', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setIsSuccess(true);
      } else {
        setUploadError('Failed to route receipt. Please email it directly to info@ronniecarefoundation.com.');
      }
    } catch (err) {
      setUploadError('Network error. Please email your receipt to info@ronniecarefoundation.com.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyAccount = (number) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(number);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCurrencyChange = (curr) => {
    setCurrency(curr);
    setSelectedAmount(presetAmounts[curr][2]);
    setCustomAmount('');
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1 && !finalAmount) return;
    if (step === 2) {
      if (!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email) return;
    }
    setStep(step + 1);
  };

  const formatTierAmount = (item) => {
    if (currency === 'NGN') return item.amountNGN || '₦15,000';
    if (currency === 'GBP') return item.amountGBP || item.amount?.replace('$', '£') || '£20';
    if (currency === 'EUR') return item.amountEUR || item.amount?.replace('$', '€') || '€25';
    return item.amount || '$25';
  };

  const currentStanbicAccount = stanbicAccounts[currency] || stanbicAccounts.NGN;

  return (
    <div className="flex flex-col min-h-full">
      {/* Top Banner */}
      <section className="bg-surface-container-low py-12 md:py-16 border-b border-surface-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1 rounded-full w-fit mb-3">
            <span className="material-symbols-outlined text-sm">favorite</span>
            <span className="font-label-sm text-label-sm font-semibold">Direct Impact Portal</span>
          </div>
          <h1 className="text-display-lg font-display-lg text-primary font-bold md:text-display-lg text-headline-lg-mobile mb-3">
            {data.title || 'Empower Vulnerable Communities'}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {data.subtitle || '100% of your public donations go directly to community healthcare, WASH infrastructure, and maternal wellness across Nigeria.'}
          </p>
        </div>
      </section>

      {/* Main Split Layout */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Impact & Trust Metrics */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-variant shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
                Your Generosity in Action
              </h2>
              <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
                See exactly how every gift translates into tangible health improvements on the ground:
              </p>

              <div className="space-y-4">
                {impactBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-surface-container-low/60 border border-surface-variant/70 flex gap-4 transition-all duration-200 hover:border-secondary/30"
                  >
                    <div className="text-lg font-bold text-secondary font-headline-lg shrink-0">
                      {formatTierAmount(item)}
                    </div>
                    <div>
                      {item.title && <h4 className="font-title-md text-sm font-bold text-primary">{item.title}</h4>}
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{item.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-primary text-white p-8 rounded-2xl shadow-sm space-y-6">
              <h3 className="font-bold text-lg text-white">Trust & Accountability Guarantee</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span>
                  <span>Registered Non-Profit (CAC/IT/Nigeria)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span>
                  <span>Bank-Grade 256-Bit SSL Security</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span>
                  <span>Quarterly Audited Financial Disclosures</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span>
                  <span>Tax-Deductible Receipt Issued Instantly</span>
                </div>
              </div>

              {data.tax_notice && (
                <div className="pt-4 border-t border-white/20 text-xs text-on-primary/80">
                  {data.tax_notice}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Multi-Step Donation Wizard */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl border border-surface-variant shadow-md">
              
              {/* Stepper Header */}
              {!isSuccess && (
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-variant">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        step >= 1 ? 'bg-secondary text-white shadow-sm' : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      1
                    </span>
                    <span className={`text-sm font-semibold ${step >= 1 ? 'text-primary' : 'text-on-surface-variant'}`}>
                      Amount
                    </span>
                  </div>
                  <div className={`flex-1 h-0.5 mx-3 ${step >= 2 ? 'bg-secondary' : 'bg-surface-variant'}`}></div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        step >= 2 ? 'bg-secondary text-white shadow-sm' : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      2
                    </span>
                    <span className={`text-sm font-semibold ${step >= 2 ? 'text-primary' : 'text-on-surface-variant'}`}>
                      Details
                    </span>
                  </div>
                  <div className={`flex-1 h-0.5 mx-3 ${step >= 3 ? 'bg-secondary' : 'bg-surface-variant'}`}></div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        step === 3 ? 'bg-secondary text-white shadow-sm' : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      3
                    </span>
                    <span className={`text-sm font-semibold ${step === 3 ? 'text-primary' : 'text-on-surface-variant'}`}>
                      Payment
                    </span>
                  </div>
                </div>
              )}

              {/* Step 1: Amount & Currency */}
              {step === 1 && !isSuccess && (
                <form onSubmit={handleNextStep} className="space-y-6">
                  {/* Frequency Toggle */}
                  <div className="flex rounded-xl bg-surface-container-low p-1.5 border border-surface-variant">
                    <button
                      type="button"
                      onClick={() => setFrequency('one-time')}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        frequency === 'one-time'
                          ? 'bg-secondary text-white shadow-sm'
                          : 'text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      One-Time Donation
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        frequency === 'monthly'
                          ? 'bg-secondary text-white shadow-sm'
                          : 'text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      Monthly Sustainer (❤️ 2x Impact)
                    </button>
                  </div>

                  {/* Currency Selector */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-primary">Select Currency</label>
                      <span className="text-xs text-on-surface-variant">Available in 4 global currencies</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {['NGN', 'USD', 'GBP', 'EUR'].map((curr) => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => handleCurrencyChange(curr)}
                          className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all flex flex-col items-center justify-center gap-0.5 ${
                            currency === curr
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-surface text-primary border-surface-variant hover:bg-surface-variant'
                          }`}
                        >
                          <span className="text-base">{currencySymbols[curr]}</span>
                          <span className="text-[10px] sm:text-xs opacity-90">{curr}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preset Amount Grid */}
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-3">Choose Amount</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                      {presetAmounts[currency].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amt);
                            setCustomAmount('');
                          }}
                          className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                            selectedAmount === amt && !customAmount
                              ? 'bg-secondary text-white border-secondary shadow-sm'
                              : 'bg-surface-container-low text-primary border-surface-variant hover:border-secondary'
                          }`}
                        >
                          {currencySymbols[currency]}
                          {parseInt(amt).toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount Input */}
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Or Enter Custom Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">
                        {currencySymbols[currency]}
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Other amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount('');
                        }}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-primary font-semibold"
                      />
                    </div>
                  </div>

                  {/* Designation Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Direct My Support To</label>
                    <select
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-primary"
                    >
                      <option value="Where Needed Most">Where Needed Most (Highest Priority)</option>
                      <option value="WASH Infrastructure">Clean Water & Solar Boreholes (WASH)</option>
                      <option value="Community Health Outreach">Mobile Medical & Pediatric Outreach</option>
                      <option value="Girls Dignity & MHM">Girls' Education & Menstrual Hygiene</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-secondary text-white font-label-sm font-bold text-base hover:opacity-90 active:scale-[0.99] transition-all shadow-md mt-4"
                  >
                    Continue to Donor Details ({currencySymbols[currency]}
                    {parseInt(finalAmount || 0).toLocaleString()})
                  </button>
                </form>
              )}

              {/* Step 2: Donor Details */}
              {step === 2 && !isSuccess && (
                <form onSubmit={handleNextStep} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        value={donorInfo.firstName}
                        onChange={(e) => setDonorInfo({ ...donorInfo, firstName: e.target.value })}
                        placeholder="e.g. Adeola"
                        className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={donorInfo.lastName}
                        onChange={(e) => setDonorInfo({ ...donorInfo, lastName: e.target.value })}
                        placeholder="e.g. Bello"
                        className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">Email Address * (For Receipt)</label>
                    <input
                      type="email"
                      required
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      placeholder="donor@example.com"
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                      placeholder="+234..."
                      className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-primary"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-2.5 cursor-pointer text-sm text-on-surface">
                      <input
                        type="checkbox"
                        checked={donorInfo.isAnonymous}
                        onChange={(e) => setDonorInfo({ ...donorInfo, isAnonymous: e.target.checked })}
                        className="rounded text-secondary focus:ring-secondary"
                      />
                      Make this an anonymous donation
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer text-sm text-on-surface">
                      <input
                        type="checkbox"
                        checked={donorInfo.isDedication}
                        onChange={(e) => setDonorInfo({ ...donorInfo, isDedication: e.target.checked })}
                        className="rounded text-secondary focus:ring-secondary"
                      />
                      Dedicate this donation in honor or memory of someone
                    </label>

                    {donorInfo.isDedication && (
                      <input
                        type="text"
                        placeholder="Honoree / Dedication Name"
                        value={donorInfo.dedicationName}
                        onChange={(e) => setDonorInfo({ ...donorInfo, dedicationName: e.target.value })}
                        className="w-full p-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-primary mt-2"
                      />
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3.5 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/5 transition-all text-sm"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3.5 rounded-xl bg-secondary text-white font-label-sm font-bold hover:opacity-90 transition-all text-sm shadow-md"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Payment Method Selection */}
              {step === 3 && !isSuccess && (
                <div className="space-y-6">
                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant flex justify-between items-center text-sm">
                    <div>
                      <p className="text-on-surface-variant text-xs">Total Gift ({frequency})</p>
                      <p className="font-bold text-xl text-primary">
                        {currencySymbols[currency]}
                        {parseInt(finalAmount || 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-secondary font-medium">{designation}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-primary underline font-semibold hover:opacity-80"
                    >
                      Edit Amount
                    </button>
                  </div>

                  {/* Payment Method Tabs */}
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-3">Choose Payment Method</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paystack')}
                        className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                          paymentMethod === 'paystack'
                            ? 'border-secondary bg-secondary/5 ring-1 ring-secondary shadow-sm'
                            : 'border-surface-variant hover:border-primary/50 text-on-surface'
                        }`}
                      >
                        <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">credit_card</span>
                        <div>
                          <div className="font-bold text-sm text-primary flex items-center gap-1.5">
                            Paystack Checkout
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">Instant</span>
                          </div>
                          <p className="text-xs text-on-surface-variant mt-0.5">
                            Card, Bank Transfer, USSD, Apple Pay
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bank')}
                        className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                          paymentMethod === 'bank'
                            ? 'border-secondary bg-secondary/5 ring-1 ring-secondary shadow-sm'
                            : 'border-surface-variant hover:border-primary/50 text-on-surface'
                        }`}
                      >
                        <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">account_balance</span>
                        <div>
                          <div className="font-bold text-sm text-primary flex items-center gap-1.5">
                            Direct Bank Transfer
                            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-semibold">Stanbic IBTC</span>
                          </div>
                          <p className="text-xs text-on-surface-variant mt-0.5">
                            Manual transfer + receipt verification
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Option A: Paystack Checkout */}
                  {paymentMethod === 'paystack' && (
                    <div className="space-y-4 p-5 rounded-2xl bg-surface border border-surface-variant">
                      <div className="flex items-center gap-3 pb-3 border-b border-surface-variant">
                        <span className="material-symbols-outlined text-emerald-600 text-2xl">lock</span>
                        <div>
                          <p className="text-xs font-semibold text-primary">Automated Electronic Checkout</p>
                          <p className="text-[11px] text-on-surface-variant">
                            Clicking below launches the secure Paystack checkout overlay for immediate confirmation.
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-on-surface-variant space-y-1.5 bg-surface-container-low p-3.5 rounded-xl border border-surface-variant/60">
                        <div className="flex justify-between">
                          <span>Donor:</span>
                          <span className="font-semibold text-primary">{donorInfo.firstName} {donorInfo.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email for Receipt:</span>
                          <span className="font-semibold text-primary">{donorInfo.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span className="font-bold text-primary">{currencySymbols[currency]}{parseInt(finalAmount || 0).toLocaleString()} ({currency})</span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-1/3 py-3.5 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/5 transition-all text-sm"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handlePaystackPayment}
                          className="w-2/3 py-3.5 rounded-xl bg-secondary text-white font-label-sm font-bold hover:opacity-90 active:scale-[0.99] transition-all text-sm shadow-md flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-sm">lock</span>
                          Pay with Paystack ({currencySymbols[currency]}{parseInt(finalAmount || 0).toLocaleString()})
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Option B: Direct Bank Transfer (Stanbic IBTC) */}
                  {paymentMethod === 'bank' && (
                    <form onSubmit={handleManualReceiptSubmit} className="space-y-4">
                      {/* Stanbic Account Details Card */}
                      <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-3">
                        <div className="flex items-center justify-between pb-3 border-b border-surface-variant/80">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">account_balance</span>
                            <span className="font-bold text-sm text-primary">
                              {currentStanbicAccount.bank} Bank ({currentStanbicAccount.label})
                            </span>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                            {currency} Account
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-on-surface-variant block">Account Name:</span>
                            <span className="font-semibold text-primary">{currentStanbicAccount.name}</span>
                          </div>
                          <div>
                            <span className="text-on-surface-variant block">Account Purpose:</span>
                            <span className="font-semibold text-primary">{currentStanbicAccount.label}</span>
                          </div>
                        </div>

                        <div className="pt-2">
                          <span className="text-on-surface-variant text-xs block mb-1">Account Number:</span>
                          <div className="flex items-center justify-between bg-surface p-3 rounded-xl border border-surface-variant">
                            <span className="font-mono font-bold text-lg text-primary tracking-wider">
                              {currentStanbicAccount.number}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyAccount(currentStanbicAccount.number)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-all active:scale-95"
                            >
                              <span className="material-symbols-outlined text-xs">
                                {copied ? 'check' : 'content_copy'}
                              </span>
                              {copied ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </div>

                        <p className="text-[11px] text-on-surface-variant italic pt-1">
                          Transfer Memo / Reference: Please use your name ({donorInfo.firstName || 'Donor'}) or email for easy reconciliation.
                        </p>
                      </div>

                      {/* Manual Receipt Uploader */}
                      <div className="p-5 rounded-2xl bg-surface border border-surface-variant space-y-3">
                        <label className="block text-xs font-semibold text-primary">
                          Attach Transfer Proof / Receipt *
                        </label>
                        
                        <div className="relative border-2 border-dashed border-surface-variant hover:border-secondary/60 rounded-xl p-4 text-center transition-all bg-surface-container-lowest">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setReceiptFile(e.target.files[0]);
                                setUploadError('');
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                            <span className="material-symbols-outlined text-secondary text-3xl">cloud_upload</span>
                            {receiptFile ? (
                              <div className="text-xs font-semibold text-primary flex items-center gap-1">
                                <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                                {receiptFile.name} ({(receiptFile.size / 1024).toFixed(1)} KB)
                              </div>
                            ) : (
                              <>
                                <p className="text-xs font-semibold text-primary">
                                  Click or drag & drop transfer receipt / screenshot here
                                </p>
                                <p className="text-[11px] text-on-surface-variant">
                                  Supports JPG, PNG, WEBP, or PDF (Max 10MB)
                                </p>
                              </>
                            )}
                          </div>
                        </div>

                        {receiptFile && (
                          <div className="flex items-center justify-between text-xs pt-1">
                            <span className="text-emerald-700 font-medium">Receipt ready for submission</span>
                            <button
                              type="button"
                              onClick={() => setReceiptFile(null)}
                              className="text-secondary hover:underline text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        )}

                        {uploadError && (
                          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                            <span className="material-symbols-outlined text-sm shrink-0">error</span>
                            <span>{uploadError}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-1/3 py-3.5 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/5 transition-all text-sm"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isUploading}
                          className="w-2/3 py-3.5 rounded-xl bg-secondary text-white font-label-sm font-bold hover:opacity-90 active:scale-[0.99] transition-all text-sm shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isUploading ? (
                            <>
                              <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                              Uploading Receipt...
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-sm">send</span>
                              I've sent it - Upload Receipt
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Success Screen */}
              {isSuccess && (
                <div className="py-8 text-center flex flex-col items-center gap-4 animate-fadeIn">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-4xl">favorite</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Thank You for Your Life-Saving Gift!</h3>
                  <p className="text-body-md text-on-surface-variant max-w-md leading-relaxed">
                    A confirmation and tax receipt for{' '}
                    <strong className="text-primary font-bold">
                      {currencySymbols[currency]}
                      {parseInt(finalAmount || 0).toLocaleString()}
                    </strong>{' '}
                    has been recorded for <strong className="text-primary">{donorInfo.email || 'your email'}</strong>.
                  </p>
                  
                  <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant w-full max-w-md text-left text-xs space-y-2 my-2">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Method:</span>
                      <span className="font-semibold text-primary">
                        {paymentMethod === 'paystack' ? 'Paystack Automated Checkout' : 'Direct Bank Transfer (Stanbic IBTC)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Currency & Gift:</span>
                      <span className="font-bold text-primary">
                        {currency} {currencySymbols[currency]}{parseInt(finalAmount || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Designation:</span>
                      <span className="font-semibold text-primary">{designation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Frequency:</span>
                      <span className="capitalize">{frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Reference / Status:</span>
                      <span className="font-mono font-bold text-emerald-700">
                        {paymentMethod === 'paystack' ? `PAY-${paystackConfig.reference.slice(-8)}` : 'Receipt Submitted for Verification'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    <Link
                      to="/stories"
                      className="px-6 py-2.5 rounded-lg border border-primary text-primary font-label-sm font-semibold hover:bg-primary/5"
                    >
                      Explore Field Stories
                    </Link>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setReceiptFile(null);
                        setUploadError('');
                        setStep(1);
                      }}
                      className="px-6 py-2.5 rounded-lg bg-secondary text-white font-label-sm font-semibold hover:opacity-90"
                    >
                      Make Another Gift
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
