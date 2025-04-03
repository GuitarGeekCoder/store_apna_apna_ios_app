import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Custom hook to manage async state
function useAsyncState(initialValue = [true, null]) {
  return useReducer(
    (state, action = null) => [false, action],
    initialValue
  );
}

// Helper to handle storage (web and mobile)
async function setStorageItemAsync(key, value) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

// Hook to manage storage state
export function useStorageState(key) {
  const [state, setState] = useAsyncState();

  // Fetch value from storage when the component mounts
  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then(value => {
        setState(value);
      });
    }
  }, [key]);

  // Update the storage and state
  const setValue = useCallback(
    (value) => {
      setState(value); // Update local state
      setStorageItemAsync(key, value); // Update storage
    },
    [key]
  );

  return [state, setValue];
}
