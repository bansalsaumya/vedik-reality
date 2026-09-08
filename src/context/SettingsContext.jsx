import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    business_name: 'Vedik Realty',
    owners: 'Manish, Deepak Lamba',
    tagline: 'Luxury Estates & Thoughtfully Selected Properties',
    phone: '+91 90538 48222',
    alt_phone: '+91 97282 95353',
    whatsapp: '919053848222',
    email: 'info.vedikrealty@gmail.com',
    address: 'First Floor, Anandam Awaas, SCO-02, Sector 19, Dharuhera, Haryana – 123106',
    working_hours: 'Mon - Sat: 9:30 AM - 7:00 PM',
    facebook: 'https://www.facebook.com/VedikRealty/',
    instagram: 'https://www.instagram.com/vedikrealty/',
    google_map_link: 'https://maps.app.goo.gl/bpCUi761odoyA34B7'
  });

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.settings) {
        setSettings(prev => ({ ...prev, ...data.settings }));
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
