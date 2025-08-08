import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface User {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  profilePicture?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AuthService {
  private user: User | null = null;
  private isAuthenticated = false;
  private isLoading = true;
  private listeners: ((state: AuthState) => void)[] = [];

  constructor() {
    this.isLoading = true;
    this.notifyListeners();
    this.checkAuthStatus();
  }

  private notifyListeners() {
    const state: AuthState = {
      user: this.user,
      isAuthenticated: this.isAuthenticated,
      isLoading: this.isLoading
    };
    this.listeners.forEach(listener => listener(state));
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Store token in localStorage
  private setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  // Get token from localStorage
  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Remove token from localStorage
  private removeToken() {
    localStorage.removeItem('auth_token');
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      }, {
        withCredentials: true
      });

      this.user = response.data.user;
      this.isAuthenticated = true;
      
      // Store token in localStorage
      // if (response.data.token) {
      //   this.setToken(response.data.token);
      // }
      
      this.notifyListeners();
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Sign in failed' 
      };
    }
  }

  async signUp(firstname: string, lastname: string, email: string, password: string,confirmpassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        firstname,
        lastname,
        email,
        password,
        confirmpassword
      }, {
        withCredentials: true
      });

      // Store token if provided
      if (response.data.token) {
        this.setToken(response.data.token);
      }

      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Sign up failed' 
      };
    }
  }

  async signOut(): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.user = null;
      this.isAuthenticated = false;
      this.removeToken(); // Remove token from localStorage
      this.notifyListeners();
    }
  }

  async checkAuthStatus(): Promise<void> {
    try {
      // First try to get user from server using HTTP-only cookie
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        withCredentials: true
      });
      
      this.user = response.data.user;
      this.isAuthenticated = true;
    } catch (error) {
      // If server request fails, try using localStorage token
      const token = this.getToken();
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          this.user = response.data.user;
          this.isAuthenticated = true;
        } catch (tokenError) {
          // Token is invalid, remove it
          this.removeToken();
          this.user = null;
          this.isAuthenticated = false;
        }
      } else {
        this.user = null;
        this.isAuthenticated = false;
      }
    } finally {
      this.isLoading = false;
      this.notifyListeners();
    }
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}

export const authService = new AuthService();

// Configure axios to automatically include token in requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      // You can trigger a logout here if needed
    }
    return Promise.reject(error);
  }
);
