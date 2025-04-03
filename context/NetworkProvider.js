import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Network from 'expo-network';
import { useDispatch } from 'react-redux';

// Create the context
const NetworkContext = createContext(null);

export const NetworkProvider = ({ children }) => {
  const [isInternetReachable, setIsInternetReachable] = useState(null);
  useEffect(() => {
    let subscription = null;

    // Fetch initial network status
    const fetchNetworkStatus = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        setIsInternetReachable(networkState.isInternetReachable);
      } catch (error) {
        console.error('Error fetching network status:', error);
      }
    };

    // Subscribe to network changes
    const subscribeToNetworkChanges = () => {
      subscription = Network.addNetworkStateListener((networkState) => {
        setIsInternetReachable(networkState.isInternetReachable);
      });
    };

    // Initialize on mount
    fetchNetworkStatus();
    subscribeToNetworkChanges();

    // Cleanup on unmount
    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isInternetReachable }}>
      {children}
    </NetworkContext.Provider>
  );
};

// Create a custom hook to use the context
export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};
