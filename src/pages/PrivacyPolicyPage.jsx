import React from 'react';
import clsx from 'clsx';

const PrivacyPolicy = () => {
  return (
    <div className={clsx("min-h-screen flex flex-col")}>
      {/* Hero Section */}
      <section className={clsx("bg-orange-500 py-16 text-white")}>
        <div className={clsx("max-w-6xl mx-auto px-4")}>
          <h1 className={clsx("text-4xl text-left font-bold mb-2")}>Privacy policy</h1>
          <p className={clsx("text-xl text-left mb-8")}>
            Meet the heros behind our Success
          </p>
        </div>
      </section>

      <section className={clsx("max-w-6xl mx-auto px-4")}>
        <h2 className="text-xl text-amber-950 text-left mb-6">
          Guarantee of confidentiality
        </h2>
        <p className="text-gray-700 leading-relaxed text-left mb-3">
          We are committed to protecting your privacy online. Our privacy policy is designed to give you peace of mind and confidence. We may change this policy from time to time by updating this page and you should check this page to ensure that you're happy with any changes. This policy is effective from 1st of December 2021 onwards.
        </p>
        <h2 className="text-xl text-amber-950 text-left mb-6">
          Cookie Usage
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3 text-left">
          We use cookies on our website for a variety of reasons. Cookies help us identify the device you are using and how you use our website, but not you personally. Cookies record anonymous information about visits and clicks on each webpage. Cookies are small files which are stored on your computer when you visit a website. However, they cannot be used to identify you personally and they are not harmful to your computer. They are essential for several features of our website to work, they help us to identify which pages are being used, and to analyse data and improve our site. We use this information for statistical analysis purposes only and they in no way give us any information about you. If you choose, you can opt out by turning off cookies in the preferences settings in your web browser.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;