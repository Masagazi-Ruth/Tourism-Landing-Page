import React, { useState, useEffect } from 'react';
import { fetchTermsAndConditions } from '../services/api';
import clsx from 'clsx';

const TermsAndConditions = () => {
  const [termsData, setTermsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetchTermsAndConditions();
      if (error) {
        setError(error);
        setTermsData(null);
      } else {
        setTermsData(data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Parse the content into sections
  const parseTermsContent = (content) => {
    if (!content) return [];

    const sections = content.split('\n\n').filter(section => section.trim());
    const parsedSections = [];
    let currentSection = null;

    sections.forEach((section) => {
      const titleMatch = section.match(/^\d+\.\s*([^\n]+)/);
      if (titleMatch) {
        if (currentSection) {
          parsedSections.push(currentSection);
        }
        currentSection = {
          title: titleMatch[1].trim(),
          content: section.slice(titleMatch[0].length).trim(),
        };
      } else if (currentSection) {
        currentSection.content += '\n\n' + section.trim();
      }
    });

    if (currentSection) {
      parsedSections.push(currentSection);
    }

    return parsedSections;
  };

  // Map API titles to UI titles
  const titleMapping = {
    'Booking confirmation': 'Booking Terms and Conditions',
    'Payment': 'Payments and Pricing',
    'Cancellations and/or refunds': 'Detailed Provisions',
  };

  // Parse the sections
  const sections = termsData ? parseTermsContent(termsData.content) : [];

  // Map sections to UI titles
  const uiSections = [
    { uiTitle: 'Booking Terms and Conditions', content: '' },
    { uiTitle: 'Payments and Pricing', content: '' },
    { uiTitle: 'Detailed Provisions', content: '' },
    { uiTitle: 'Legal', content: 'No legal provisions available at this time.' }, // Placeholder
  ];

  sections.forEach((section) => {
    const uiTitle = titleMapping[section.title];
    if (uiTitle) {
      const uiSection = uiSections.find(s => s.uiTitle === uiTitle);
      if (uiSection) {
        uiSection.content = section.content;
      }
    }
  });

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className=" text-red terms-and-conditions-page">
      <section className={clsx("text-left bg-orange-500 py-16 text-white")}>
        <div className={clsx("max-w-6xl mx-auto px-4")}>
        <h1 className="align-left text-3xl font-bold mb-6 text-white">{termsData?.title}</h1>
          <p className={clsx("text-xl mb-8")}>
            Life is either a daring adventure or nothing.
          </p>
        </div>
      </section>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {uiSections.map((section, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-semibold">{section.uiTitle}</h2>
            {section.content ? (
              <p className="text-gray-700 mt-2 whitespace-pre-line">{section.content}</p>
            ) : (
              <p className="text-gray-500 mt-2 italic">No content available for this section.</p>
            )}
          </div>
        ))}
        <p className="text-gray-600 mt-6">Last Updated: March 2025</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;