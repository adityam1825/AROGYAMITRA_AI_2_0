'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

export type City = 'Mumbai' | 'Delhi' | 'Bangalore' | 'Kolkata' | 'Chennai';

interface CityContextType {
  city: City;
  setCity: (city: City) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [city, setCity] = useState<City>('Mumbai');

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};
