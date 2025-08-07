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
    // Initialize with loading state
    this.isLoading = true;
    this.notifyListeners();
    // Check for existing token on initialization
    this.checkAuthStatus();
  }
//why notify listeners?

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

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      }, {
        withCredentials: true // Important for cookies
      });

      this.user = response.data.user;
      this.isAuthenticated = true;
      this.notifyListeners();
      
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Sign in failed' 
      };
    }
  }

  async signUp(firstname: string, lastname: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        firstname,
        lastname,
        email,
        password
      }, {
        withCredentials: true
      });

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
      this.notifyListeners();
    }
  }

  async checkAuthStatus(): Promise<void> {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        withCredentials: true
      });
      
      this.user = response.data.user;
      this.isAuthenticated = true;
    } catch (error) {
      this.user = null;
      this.isAuthenticated = false;
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
