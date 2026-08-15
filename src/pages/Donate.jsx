import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Donate() {
  const [step, setStep] = useState(1);
  const [frequency, setFrequency] = useState('one-time');
  const [currency, setCurrency] = useState('USD');
  const [selectedAmount, setSelectedAmount] = useState('100');
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

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSuccess, setIsSuccess] = useState(false);

  const currencySymbols = {
    USD: '$',
    NGN: '₦',
    GBP: '£',
  };

  const presetAmounts = {
    USD: ['25', '50', '100', '250', '500'],
    NGN: ['15000', '35000', '75000', '150000', '300000'],
    GBP: ['20', '40', '80', '200', '400'],
  };

  const impactBreakdown = [
    {
      amountUSD: '$25',
      amountNGN: '₦15,000',
      title: 'Clean Water for a Child',
      desc: 'Provides water testing, sanitation supplies, and hygiene kit for one student for an entire academic year.',
    },
    {
      amountUSD: '$50',
      amountNGN: '₦35,000',
      title: 'Maternal Care Pack',
      desc: 'Funds sanitized birth delivery kits and prenatal screenings for expectant mothers at community outreach clinics.',
    },
    {
      amountUSD: '$100',
      amountNGN: '₦75,000',
      title: 'Mobile Clinic Outreach',
      desc: 'Subsidizes essential pharmaceuticals, malaria diagnostics, and cold-chain vaccines for an entire remote village.',
    },
    {
      amountUSD: '$250',
      amountNGN: '₦150,000',
      title: 'School Sanitation Station',
      desc: 'Co-sponsors a multi-tap touchless handwashing hub with sustainable greywater drainage at a public school.',
    },
  ];

  const finalAmount = customAmount || selectedAmount;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1 && !finalAmount) return;
    if (step === 2) {
      if (!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email) return;
    }
    setStep(step + 1);
  };

  const handleCompleteDonation = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

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
            Empower Vulnerable Communities
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            100% of your public donations go directly to community healthcare, WASH infrastructure, and maternal wellness across Nigeria.
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
                See exactly how every dollar or naira translates into tangible health improvements on the ground:
              </p>

              <div className="space-y-4">
                {impactBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-surface-container-low/60 border border-surface-variant/70 flex gap-4"
                  >
                    <div className="text-lg font-bold text-secondary font-headline-lg shrink-0">
                      {currency === 'NGN' ? item.amountNGN : item.amountUSD}
                    </div>
                    <div>
                      <h4 className="font-title-md text-sm font-bold text-primary">{item.title}</h4>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{item.desc}</p>
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

              <div className="pt-4 border-t border-white/20 text-xs text-on-primary/80 italic">
                "Ronnie Care’s transparency and real-time field reporting give us full confidence that our support saves lives in the most remote areas."
                <div className="font-semibold text-white mt-1.5 not-italic">— Community Partner Advisory</div>
              </div>
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
                        step >= 1 ? 'bg-secondary text-white' : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      1
                    </span>
                    <span className={`text-sm font-semibold ${step >= 1 ? 'text-primary' : 'text-on-surface-variant'}`}>
                      Amount
                    </span>
                  </div>
                  <div className="w-12 h-0.5 bg-surface-variant"></div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        step >= 2 ? 'bg-secondary text-white' : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      2
                    </span>
                    <span className={`text-sm font-semibold ${step >= 2 ? 'text-primary' : 'text-on-surface-variant'}`}>
                      Details
                    </span>
                  </div>
                  <div className="w-12 h-0.5 bg-surface-variant"></div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        step === 3 ? 'bg-secondary text-white' : 'bg-surface-variant text-on-surface-variant'
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

              {/* Step 1: Amount & Designation */}
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
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-primary">Select Currency</label>
                    <div className="flex gap-2">
                      {['USD', 'NGN', 'GBP'].map((curr) => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => {
                            setCurrency(curr);
                            setSelectedAmount(presetAmounts[curr][2]);
                            setCustomAmount('');
                          }}
                          className={`px-3 py-1 rounded-md text-xs font-bold border transition-all ${
                            currency === curr
                              ? 'bg-primary text-white border-primary'
                              : 'bg-surface text-primary border-surface-variant hover:bg-surface-variant'
                          }`}
                        >
                          {curr} ({currencySymbols[curr]})
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
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-surface-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-background text-primary font-semibold"
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

              {/* Step 2: Donor Information */}
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

              {/* Step 3: Payment Method & Confirmation */}
              {step === 3 && !isSuccess && (
                <form onSubmit={handleCompleteDonation} className="space-y-6">
                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant flex justify-between items-center text-sm">
                    <div>
                      <p className="text-on-surface-variant text-xs">Total Gift ({frequency})</p>
                      <p className="font-bold text-xl text-primary">
                        {currencySymbols[currency]}
                        {parseInt(finalAmount).toLocaleString()}
                      </p>
                      <p className="text-xs text-secondary font-medium">{designation}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-primary underline font-semibold"
                    >
                      Edit Amount
                    </button>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-3">Select Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'card', name: 'Credit / Debit Card', icon: 'credit_card' },
                        { id: 'paystack', name: 'Paystack / Flutterwave', icon: 'account_balance_wallet' },
                        { id: 'bank', name: 'Direct Bank Transfer', icon: 'account_balance' },
                        { id: 'paypal', name: 'PayPal / USD', icon: 'payments' },
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                            paymentMethod === method.id
                              ? 'border-secondary bg-secondary/5 ring-1 ring-secondary text-primary font-semibold'
                              : 'border-surface-variant hover:border-primary/50 text-on-surface'
                          }`}
                        >
                          <span className="material-symbols-outlined text-secondary">{method.icon}</span>
                          <span className="text-xs font-medium">{method.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Simulation Inputs */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-3 p-4 rounded-xl bg-surface border border-surface-variant">
                      <div>
                        <label className="block text-xs font-semibold text-on-surface-variant mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="4242 •••• •••• 4242"
                          defaultValue="4242 •••• •••• 4242"
                          className="w-full p-2.5 rounded-lg border border-surface-variant text-sm font-mono bg-background"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-on-surface-variant mb-1">Expiry</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            defaultValue="12/28"
                            className="w-full p-2.5 rounded-lg border border-surface-variant text-sm bg-background"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-on-surface-variant mb-1">CVV</label>
                          <input
                            type="text"
                            placeholder="CVC"
                            defaultValue="888"
                            className="w-full p-2.5 rounded-lg border border-surface-variant text-sm bg-background font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer Details */}
                  {paymentMethod === 'bank' && (
                    <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant text-xs space-y-2">
                      <p className="font-bold text-primary">Direct Bank Account (Nigeria):</p>
                      <p className="text-on-surface">Bank: <span className="font-semibold">Zenith Bank Plc</span></p>
                      <p className="text-on-surface">Account Name: <span className="font-semibold">Ronnie Care Foundation</span></p>
                      <p className="text-on-surface">Account Number: <span className="font-mono font-bold text-primary text-sm">1018942301</span></p>
                      <p className="text-on-surface-variant italic pt-1">
                        Use your email ({donorInfo.email || 'donor'}) as the transfer memo.
                      </p>
                    </div>
                  )}

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
                      className="w-2/3 py-3.5 rounded-xl bg-secondary text-white font-label-sm font-bold hover:opacity-90 active:scale-[0.99] transition-all text-base shadow-lg"
                    >
                      Complete Donation ({currencySymbols[currency]}
                      {parseInt(finalAmount).toLocaleString()})
                    </button>
                  </div>
                </form>
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
                      {parseInt(finalAmount).toLocaleString()}
                    </strong>{' '}
                    has been sent to <strong className="text-primary">{donorInfo.email || 'your email'}</strong>.
                  </p>
                  
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant w-full max-w-md text-left text-xs space-y-1.5 my-2">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Transaction Ref:</span>
                      <span className="font-mono font-bold text-primary">RCF-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Designation:</span>
                      <span className="font-semibold text-primary">{designation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Frequency:</span>
                      <span className="capitalize">{frequency}</span>
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
