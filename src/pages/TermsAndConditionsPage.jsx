import React from 'react';


const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Terms and Conditions
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-orange-600">
            Booking Terms and Conditions
          </h2>
          <p className="text-gray-700 leading-relaxed">
            After a brief explanation to familiarize you with our website, we provide several terms and conditions for booking with HiddenSafari. These terms and conditions form an essential part of your booking agreement and outline the responsibilities and rights of both the customer and the company.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-orange-600">
            Payments and Pricing
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Payments can be made by bank wire/transfer, direct in control cash as well as after direct bank guarantee. The prices for services are calculated based on the current market rates and may vary. Additional charges might apply for special requests or customized services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-orange-600">
            Detailed Provisions
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>All bookings are subject to availability and confirmation</li>
            <li>Prices are valid at the time of booking and may change without notice</li>
            <li>Additional terms may apply to specific services or packages</li>
            <li>Cancellation and refund policies vary by service type</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-orange-600">
            Legal Considerations
          </h2>
          <p className="text-gray-700 leading-relaxed">
            HiddenSafari reserves the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes. Users are responsible for reviewing the most current version of these terms.
          </p>
        </section>

        <div className="text-sm text-gray-500 pt-4 border-t">
          <p>Last Updated: March 2025</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;