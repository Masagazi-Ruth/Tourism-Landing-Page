import axios from 'axios';

// Base URL from environment variable with fallback
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sample-project-api.chordifyed.com/api/v1';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10-second timeout
});

// Helper function to handle API errors
const handleApiError = (error, endpoint) => {
  console.error(`Error fetching data from ${endpoint}:`, error);
  return {
    error: error.response?.data?.message || `Failed to load data from ${endpoint}. Please try again later.`,
    data: null,
  };
};

// API functions for specific endpoints
export const fetchPrivacyPolicy = async () => {
  try {
    const response = await api.get('/info/privacy-policy');
    return { data: response.data, error: null };
  } catch (error) {
    return handleApiError(error, '/info/privacy-policy');
  }
};

export const fetchEvents = async (category = 'all') => {
  const endpoints = {
    all: 'all-events',
    SnowTreks: 'snow-treks-events',
    SummerEvents: 'summer-events',
    MonsoonEvents: 'monsoon-events',
    EpicAdventures: 'epic-adventure-events',
    SpecialEvents: 'special-events',
  };
  const endpoint = endpoints[category] || 'all-events';
  try {
    const response = await api.get(`/events/${endpoint}`);
    return { data: response.data, error: null };
  } catch (error) {
    return handleApiError(error, `/events/${endpoint}`);
  }
};

export const fetchAbout = async () => {
  try {
    const response = await api.get('/info/about-us');
    return { data: response.data, error: null };
  } catch (error) {
    return handleApiError(error, '/info/about-us');
  }
};

export const fetchTeam = async () => {
  try {
    const response = await api.get('/team');
    return { data: response.data, error: null };
  } catch (error) {
    return handleApiError(error, '/team');
  }
};

export const fetchTermsAndConditions = async () => {
  try {
    const response = await api.get('/info/terms-conditions');
    return { data: response.data, error: null };
  } catch (error) {
    return handleApiError(error, '/info/terms-conditions');
  }
};

export const fetchContact = async () => {
  try {
    const response = await api.get('/info/contact-us');
    return { data: response.data, error: null };
  } catch (error) {
    return handleApiError(error, '/info/contact-us');
  }
};

export const fetchTestimonial = async () => {
  try {
    const response = await api.get('/info/testimonials');
    return { data: response.data, error: null };
  } catch (error) {
    return handleApiError(error, '/info/testimonials');
  }
};
