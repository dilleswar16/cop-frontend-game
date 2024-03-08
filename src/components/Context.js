import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [testCities, setTestCities] = useState([]);
  const [testVehicles, setTestVehicles] = useState([]);
  const [copChoices, setCopChoices] = useState([
    { cop: 1, city: '', vehicle: '' },
    { cop: 2, city: '', vehicle: '' },
    { cop: 3, city: '', vehicle: '' }
  ]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cities`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setTestCities(data); 
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });

    
    fetch(`${process.env.REACT_APP_BACKEND_URL}/vehicles`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setTestVehicles(data); 
      })
      .catch(error => {
        console.error('Error fetching vehicles:', error);
      });
  }, []); 

  return (
    <AppContext.Provider value={{ testCities, setTestCities, testVehicles, setTestVehicles, copChoices, setCopChoices }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
