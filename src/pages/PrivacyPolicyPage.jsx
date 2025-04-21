import React, { useState, useEffect } from 'react';
import { fetchPrivacyPolicy } from '../services/api';

const PrivacyPolicyPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [policyData, setPolicyData] = useState({
    title: 'Privacy Policy',
    confidentiality: '',
    cookies: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPolicyData = async () => {
      setIsLoading(true);
      setError(null);

      const { data, error } = await fetchPrivacyPolicy();

      if (error) {
        setError(error);
        setIsLoading(false);
        return;
      }

      if (data && data.content) {
        const content = data.content;
        const confidentialityMatch = content.match(/Guarantee of Confidentiality:\s*([\s\S]*?)(?=\n\s*Cookie Usage:|$)/i);
        const cookiesMatch = content.match(/Cookie Usage:\s*([\s\S]*?)(?=$)/i);

        setPolicyData({
          title: data.title || 'Privacy Policy',
          confidentiality: confidentialityMatch ? confidentialityMatch[1].trim() : '',
          cookies: cookiesMatch ? cookiesMatch[1].trim() : '',
        });
      } else {
        setError('Invalid data format received from API');
      }

      setIsLoading(false);
    };

    getPolicyData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('policy-content');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isContentVisible = rect.top < window.innerHeight - 100;

        if (isContentVisible && !isVisible) {
          setIsVisible(true);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-orange-500 py-16 text-white p-10 pt-28">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold">{policyData.title}</h2>
          <p className="mt-2">How we protect and use your information.</p>
        </div>
      </section>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DD501DE8]"></div>
        </div>
      ) : error ? (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 text-red-500 p-4 rounded-lg text-center">{error}</div>
        </div>
      ) : (
        // <section className="container mx-auto px-4 py-8">
          <div
            id="policy-content"
            className={`bg-white shadow-md rounded-lg p-6 transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
      
            <div className="text-left mb-8">
              <h3 className="text-xl font-semibold text-amber-800">Guarantee of Confidentiality</h3>
              <p className="text-gray-700 mt-2 whitespace-pre-line">{policyData.confidentiality}</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-amber-800">Cookie Usage</h3>
              <p className="text-gray-700 text-left whitespace-pre-line">{policyData.cookies}</p>
            </div>
          </div>
        // </section>
      )}
    </div>
  );
};

export default PrivacyPolicyPage;