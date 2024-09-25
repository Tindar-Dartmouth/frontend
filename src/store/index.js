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
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      console.log('Cookies in the browser:', document.cookie);

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

  register: async (
    email,
    password,
    major,
    minor,
    sex,
    prefSex,
    gpa,
    ricePurity,
    skill1,
    skill2,
    skill3,
    interest1,
    interest2,
    interest3,
    noun1,
    noun2,
    noun3,
    adj1,
    adj2,
    adj3,
    verb1,
    verb2,
    verb3,
  ) => {
    set((draft) => {
      draft.isLoading = true;
      draft.error = null;
    });

    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, password, major, minor, sex, prefSex, gpa, ricePurity, skill1, skill2, skill3, interest1, interest2, interest3, noun1, noun2, noun3, adj1, adj2, adj3, verb1, verb2, verb3,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        set((draft) => {
          draft.isLoading = false;
        });
        console.log(data);
        return data;
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      set((draft) => {
        draft.isLoading = false;
        draft.error = error.message;
      });

      return { error: error.message };
    }
  },

  verifyEmail1: async (
    email,
  ) => {
    set((draft) => {
      draft.isLoading = true;
      draft.error = null;
    });

    try {
      const response = await fetch('http://127.0.0.1:5000/api/verifyEmail-1', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        set((draft) => {
          draft.isLoading = false;
        });
        console.log(data);
        return data;
      } else {
        throw new Error(data.error || 'Email Verification Failed');
      }
    } catch (error) {
      set((draft) => {
        draft.isLoading = false;
        draft.error = error.message;
      });

      return { error: error.message };
    }
  },

  endorse: async (email, msg) => {
    set((draft) => {
      draft.isLoading = true;
      draft.error = null;
    });
    try {
      const response = await fetch('http://127.0.0.1:5000/api/endorse', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, msg }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Email verification failed.');
      }
      set((draft) => {
        draft.isLoading = false;
      });
      console.log(data);
      return data;
    } catch (error) {
      set((draft) => {
        draft.isLoading = false;
        draft.error = error.message;
      });
      return { error: error.message };
    }
  },

  sendMessage: async (msg, bUserID) => {
    set((draft) => {
      draft.isLoading = true;
      draft.error = null;
    });
    try {
      const response = await fetch('http://127.0.0.1:5000/api/sendMessage', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ msg, bUserID }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Email verification failed.');
      }
      set((draft) => {
        draft.isLoading = false;
      });
      console.log(data);
      return data;
    } catch (error) {
      set((draft) => {
        draft.isLoading = false;
        draft.error = error.message;
      });
      return { error: error.message };
    }
  },

  refer: async (email1, email2) => {
    set((draft) => {
      draft.isLoading = true;
      draft.error = null;
    });
    try {
      const response = await fetch('http://127.0.0.1:5000/api/refer', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email1, email2 }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Referral failed.');
      }
      set((draft) => {
        draft.isLoading = false;
      });
      console.log(data);
      return data;
    } catch (error) {
      set((draft) => {
        draft.isLoading = false;
        draft.error = error.message;
      });
      return { error: error.message };
    }
  },

  blacklist: async (email) => {
    set((draft) => {
      draft.isLoading = true;
      draft.error = null;
    });
    try {
      console.log('attempting response fetch');
      const response = await fetch('http://127.0.0.1:5000/api/blacklist', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Blacklist failed.');
      }
      set((draft) => {
        draft.isLoading = false;
      });
      console.log(data);
      return data;
    } catch (error) {
      set((draft) => {
        draft.isLoading = false;
        draft.error = error.message;
      });
      return { error: error.message };
    }
  },

  verifyEmail2: async (
    emailKey,
  ) => {
    set((draft) => {
      draft.isLoading = true;
      draft.error = null;
    });

    try {
      const response = await fetch('http://127.0.0.1:5000/api/verifyEmail-2', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailKey,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        set((draft) => {
          draft.isLoading = false;
        });
        console.log(data);
        return data;
      } else {
        throw new Error(data.error || 'Email Verification Failed');
      }
    } catch (error) {
      set((draft) => {
        draft.isLoading = false;
        draft.error = error.message;
      });

      return { error: error.message };
    }
  },

  getProfile: async () => {
    console.log('inside of getprofile');
    set((draft) => {
      draft.isLoading = true;
      draft.error = null;
    });

    try {
      const response = await fetch('http://127.0.0.1:5000/api/userProfile', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('data: ', data);

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

  getOtherProfile: async (userID) => {
    console.log('inside of getOtherProfile');
    console.log(userID);
    set((draft) => {
      draft.isLoading = true;
      draft.error = null;
    });

    try {
      const response = await fetch('http://127.0.0.1:5000/api/othprf', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID }),
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

  getMessages: async (selfUserID, bUserID) => {
    console.log('inside of getMessages');
    set((draft) => {
      draft.isLoading = true;
      draft.error = null;
    });

    try {
      console.log('trying');
      const response = await fetch('http://127.0.0.1:5000/api/messaging', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selfUserID, bUserID }),
      });
      console.log('data: ');
      const data = await response.json();
      console.log('data: ', data);

      if (response.ok) {
        set((draft) => {
          draft.user = data.user;
          draft.isLoading = false;
        });

        return data;
      } else {
        throw new Error(data.error || 'Failed to fetch messages');
      }
    } catch (error) {
      set((draft) => {
        draft.isLoading = false;
        draft.error = error.message;
      });

      return { error: error.message };
    }
  },

}))));

export default useStore;
