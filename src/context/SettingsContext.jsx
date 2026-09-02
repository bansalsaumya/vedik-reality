import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    business_name: 'Vedik Reality',
    tagline: 'Luxury Estates & Thoughtfully Selected Properties',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    email: 'contact@vedikreality.com',
    address: 'Level 14, Vedik Horizon Tower, Golf Course Road, Sector 54, Gurgaon, HR - 122002',
    working_hours: 'Mon - Sat: 9:30 AM - 7:00 PM',
    facebook: 'https://facebook.com/vedikreality',
    instagram: 'https://instagram.com/vedikreality',
    youtube: 'https://youtube.com/@vedikreality',
    google_map_embed: ''
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
