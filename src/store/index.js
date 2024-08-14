import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useStore = create(devtools(immer((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setLoading: (loading) => set((draft) => {
    draft.isLoading = loading;
  }),

  setError: (error) => set((draft) => {
    draft.error = error;
  }),

  login: async (email, password) => {
    set((draft) => {
      draft.isLoading = true;
      draft.error = null;
    });

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        set((draft) => {
          draft.user = data.user;// Adjust if necessary based on backend response
          draft.isAuthenticated = true;
          draft.isLoading = false;
        });

        return data;// Return the response data to handle it in the frontend
      } else {
        throw new Error(data.error || 'Login failed');// Use error message from backend
      }
    } catch (error) {
      set((draft) => {
        draft.isLoading = false;
        draft.error = error.message;
      });

      return { error: error.message };// Return the error message to handle it in the frontend
    }
  },

  logout: () => set((draft) => {
    draft.user = null;
    draft.isAuthenticated = false;
  }),

  getProfile: async () => {
    set((draft) => {
      draft.isLoading = true;
      draft.error = null;
    });

    try {
      const response = await fetch('http://127.0.0.1:5000/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent
      });

      const data = await response.json();

      if (response.ok) {
        set((draft) => {
          draft.user = data.user;
          draft.isLoading = false;
        });

        return data; // Return the response data to handle it in the frontend
      } else {
        throw new Error(data.error || 'Failed to fetch profile');
      }
    } catch (error) {
      set((draft) => {
        draft.isLoading = false;
        draft.error = error.message;
      });

      return { error: error.message }; // Return the error message to handle it in the frontend
    }
  },
}))));

export default useStore;
