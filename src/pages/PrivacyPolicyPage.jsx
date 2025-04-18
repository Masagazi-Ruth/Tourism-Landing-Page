// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PrivacyPolicyPage = () => {
//   // State for tracking if sections are visible
//   const [isVisible, setIsVisible] = useState(false);

//   // State for privacy policy content
//   const [policyData, setPolicyData] = useState({
//     title: "Privacy Policy",
//     confidentiality: "",
//     cookies: ""
//   });

//   // State for loading and error handling
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch privacy policy data
//   useEffect(() => {
//     const fetchPolicyData = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get('http://54.210.95.246:3005/api/v1/info/privacy-policy');
        
//         if (response.data && response.data.content) {
//           // Parse the content to extract sections
//           const content = response.data.content;
          
//           // Extract sections using regex
//           const confidentialityMatch = content.match(/Guarantee of Confidentiality:\s*([\s\S]*?)(?=\n\s*Cookie Usage:|$)/i);
//           const cookiesMatch = content.match(/Cookie Usage:\s*([\s\S]*?)(?=$)/i);
          
//           setPolicyData({
//             title: response.data.title || "Privacy Policy",
//             confidentiality: confidentialityMatch ? confidentialityMatch[1].trim() : "",
//             cookies: cookiesMatch ? cookiesMatch[1].trim() : ""
//           });
//         } else {
//           throw new Error('Invalid data format received from API');
//         }
//       } catch (err) {
//         console.error("Error fetching privacy policy data:", err);
//         setError("Failed to load privacy policy information. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchPolicyData();
//   }, []);

//   // Effect for checking if content is in viewport
//   useEffect(() => {
//     const handleScroll = () => {
//       const element = document.getElementById('policy-content');
//       if (element) {
//         const rect = element.getBoundingClientRect();
//         const isContentVisible = rect.top < window.innerHeight - 100;
        
//         if (isContentVisible && !isVisible) {
//           setIsVisible(true);
//         }
//       }
//     };
    
//     // Initial check
//     handleScroll();
    
//     // Add scroll listener
//     window.addEventListener('scroll', handleScroll);
    
//     // Cleanup
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [isVisible]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Hero Section */}
//       <section className="bg-orange-500 py-16 text-white p-10 pt-28">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold">{policyData.title}</h2>
//           <p className="mt-2">How we protect and use your information.</p>
//         </div>
//       </section>
      
//       {isLoading ? (
//         // Loading state
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DD501DE8]"></div>
//         </div>
//       ) : error ? (
//         // Error state
//         <div className="container mx-auto px-4 py-8">
//           <div className="bg-red-100 text-red-500 p-4 rounded-lg text-center">
//             {error}
//           </div>
//         </div>
//       ) : (
//         // Unified Policy Content Section
//         <section className="container mx-auto px-4 py-8">
//           <div id="policy-content" className={`bg-white shadow-md rounded-lg p-6 transition-opacity duration-1000 ${
//             isVisible ? 'opacity-100' : 'opacity-0'
//           }`}>
//             {/* Introduction */}
//             <div className="mb-8">
//               <p className="text-gray-600 text-left mb-4">
//                 At HiddenSafari, we value your privacy and are committed to protecting your personal information. 
//                 This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
//               </p>
//             </div>

//             {/* Confidentiality Section */}
//             <div className="text-left mb-8">
//               <h3 className="text-xl text-amber-950 text-left mb-6">Guarantee of Confidentiality</h3>
//               <p className="text-gray-700 whitespace-pre-line">{policyData.confidentiality}</p>
//             </div>
            
//             {/* Cookies Section */}
//             <div className="mb-8">
//               <h3 className="text-xl text-amber-950 text-left mb-6">Cookie Usage</h3>
//               <p className="text-gray-700 text-left whitespace-pre-line">{policyData.cookies}</p>
//             </div>

//             {/* Contact Section */}
//             <div className='mb-8 text-left'>
//               <h3 className="text-xl text-amber-950 text-left mb-6">Contact Us</h3>
//               <p className="text-gray-700">
//                 If you have any questions about our Privacy Policy or how we handle your data, please don't hesitate to contact us. 
//                 We are committed to addressing any concerns you may have about your privacy.
//               </p>
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default PrivacyPolicyPage;

import React, { useState, useEffect } from 'react';
import { fetchPrivacyPolicy } from '../services/api';

const PrivacyPolicyPage = () => {
  // State for tracking if sections are visible
  const [isVisible, setIsVisible] = useState(false);

  // State for privacy policy content
  const [policyData, setPolicyData] = useState({
    title: 'Privacy Policy',
    confidentiality: '',
    cookies: '',
  });

  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch privacy policy data
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
        // Parse the content to extract sections
        const content = data.content;

        // Extract sections using regex
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

  // Effect for checking if content is in viewport
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

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-orange-500 py-16 text-white p-10 pt-28">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold">{policyData.title}</h2>
          <p className="mt-2">How we protect and use your information.</p>
        </div>
      </section>

      {isLoading ? (
        // Loading state
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DD501DE8]"></div>
        </div>
      ) : error ? (
        // Error state
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 text-red-500 p-4 rounded-lg text-center">{error}</div>
        </div>
      ) : (
        // Unified Policy Content Section
        <section className="container mx-auto px-4 py-8">
          <div
            id="policy-content"
            className={`bg-white shadow-md rounded-lg p-6 transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-600 text-left mb-4">
                At HiddenSafari, we value your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
              </p>
            </div>

            {/* Confidentiality Section */}
            <div className="text-left mb-8">
              <h3 className="text-xl text-amber-950 text-left mb-6">Guarantee of Confidentiality</h3>
              <p className="text-gray-700 whitespace-pre-line">{policyData.confidentiality}</p>
            </div>

            {/* Cookies Section */}
            <div className="mb-8">
              <h3 className="text-xl text-amber-950 text-left mb-6">Cookie Usage</h3>
              <p className="text-gray-700 text-left whitespace-pre-line">{policyData.cookies}</p>
            </div>

            {/* Contact Section */}
            <div className="mb-8 text-left">
              <h3 className="text-xl text-amber-950 text-left mb-6">Contact Us</h3>
              <p className="text-gray-700">
                If you have any questions about our Privacy Policy or how we handle your data, please don't hesitate to contact us. 
                We are committed to addressing any concerns you may have about your privacy.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PrivacyPolicyPage;